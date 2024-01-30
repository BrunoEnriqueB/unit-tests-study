import { randomUUID } from 'node:crypto';

import { transport } from './mail/transport.js';

export async function createOrder(data, orderRepository) {
  const { customerId, amount } = data;

  const orderId = randomUUID();
  const isPriority = amount >= 3000;

  const order = await orderRepository.create({
    orderId,
    customerId,
    amount,
    isPriority
  });

  const amountFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);

  await transport.sendMail({
    from: {
      name: 'Bruno Enrique',
      address: 'brunoenriquedev@gmail.com'
    },
    to: {
      name: 'Bruno Enrique',
      address: 'brunobaronenrique@gmail.com'
    },
    subject: `New order #${order.id}`,
    html: `<strong>New order:</strong> ${order.id} with amount of ${amountFormatted}`
  });

  return order;
}
