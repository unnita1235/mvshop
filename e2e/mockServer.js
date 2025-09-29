import { setupServer } from 'msw/node';
import { rest } from 'msw';

const API_BASE = 'https://api.mvshop.com';

const handlers = [
  rest.get(`${API_BASE}/products`, (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'Product 1', price: 10 },
        { id: '2', name: 'Product 2', price: 20 },
      ])
    );
  }),

  rest.get(`${API_BASE}/products/:id`, (req, res, ctx) => {
    const { id } = req.params;
    return res(
      ctx.json({ id, name: `Product ${id}`, price: id === '1' ? 10 : 20, description: 'Sample product description' })
    );
  }),

  rest.post(`${API_BASE}/cart`, (req, res, ctx) => {
    return res(ctx.json({ success: true }));
  }),

  rest.post(`${API_BASE}/checkout`, (req, res, ctx) => {
    return res(ctx.json({ paymentIntentClientSecret: 'pi_test_secret' }));
  }),

  rest.get(`${API_BASE}/order/:id`, (req, res, ctx) => {
    return res(ctx.json({ id: req.params.id, status: 'confirmed', items: [], total: 30 }));
  }),

  rest.post('https://api.stripe.com/v1/payment_intents/:id/confirm', (req, res, ctx) => {
    return res(ctx.json({ status: 'succeeded' }));
  }),
];

const server = setupServer(...handlers);

module.exports = {
  server,
  setup: () => server.listen(),
  teardown: () => server.close(),
  resetHandlers: () => server.resetHandlers(),
};
