// import { Product } from './product';

// describe('Product', () => {
//   it('should create an instance', () => {
//     expect(new Product(
//       'SKU123',
//       'Test Product',
//       'This is a test description',
//       100, // unit price
//       'http://example.com/image.jpg',
//       true, // active status
//       20, // units in stock
//       new Date(), // date created
//       new Date() // last updated
//     )).toBeTruthy();
//   });
// });









import { Product } from './product';

describe('Product', () => {
  it('should create an instance', () => {
    expect(new Product()).toBeTruthy();
  });
});
