import { client } from '../database/client.js';

export default class OrderRepository {
  async create(data) {
    const { orderId, customerId, isPriority, amount } = data;

    const command = await client.query(
      /* SQL */ `
        INSERT INTO "orders" (id, customer_id, priority, amount)
        VALUES ($1, $2, $3, $4)
        RETURNING *
      `,
      [orderId, customerId, isPriority, amount]
    );

    return command.rows[0];
  }
}
