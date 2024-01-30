export default class OrderRepository {
  orders = [];

  async create(data) {
    const { orderId, customerId, isPriority, amount } = data;

    const order = {
      id: orderId,
      priority: isPriority,
      customer_id: customerId,
      amount
    };

    this.orders.push(order);

    return order;
  }
}
