import { test, mock } from 'node:test';
import { createOrder } from './create-order.js';
import assert from 'node:assert';
import { transport } from './mail/transport.js';
import OrdersRepository from './tests/in-memory-repositories/in-memory-orders-repository.js';

mock.method(transport, 'sendMail', () => {
  console.log('Email enviado');
});

test('create a new order with amount greather or equal than 3000 with priority', async () => {
  const newOrder = {
    customerId: 'fake-customer-id',
    amount: 3000
  };

  const inMemoryOrdersRepository = new OrdersRepository();

  const order = await createOrder(newOrder, inMemoryOrdersRepository);

  assert.ok(order.id);
  assert.ok(order.priority);
  assert.equal(newOrder.amount, order.amount);
  assert.equal(newOrder.customerId, order.customer_id);
});

test('create a new order with amount lower than 3000 without priority', async () => {
  const newOrder = {
    customerId: 'fake-customer-id',
    amount: 2000
  };

  const inMemoryOrdersRepository = new OrdersRepository();

  const order = await createOrder(newOrder, inMemoryOrdersRepository);

  assert.ok(order.id);
  assert.ok(!order.priority);
  assert.equal(newOrder.amount, order.amount);
  assert.equal(newOrder.customerId, order.customer_id);
});
