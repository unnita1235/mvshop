describe('MVShop E2E', () => {
  beforeAll(async () => {
    await device.launchApp({ delete: true });
  });

  it('should navigate product list, add product to cart, checkout and display order', async () => {
    await element(by.id('product-list-item-0')).tap();
    await element(by.id('add-to-cart-button')).tap();
    await element(by.id('cart-button')).tap();
    await element(by.id('checkout-button')).tap();

    // Mock Stripe success happens here in mock server

    await element(by.id('confirm-payment-button')).tap();

    await expect(element(by.id('order-screen'))).toBeVisible();
    await expect(element(by.text(/order id/i))).toBeVisible();
  });
});
