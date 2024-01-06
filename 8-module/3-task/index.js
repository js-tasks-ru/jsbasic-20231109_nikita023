export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }
    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );
    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        product,
        count: 1,
      };
      this.cartItems.push(cartItem);
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItemIndex = this.cartItems.findIndex(
      (item) => item.product.id === productId
    );
    const cartItem = this.cartItems[cartItemIndex];
    const newCount = cartItem.count + amount;
    if (newCount === 0) {
      this.cartItems.splice(cartItemIndex, 1);
    } else {
      cartItem.count = newCount;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return this.cartItems.length === 0;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, current) => sum + current.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (sum, current) => sum + current.product.price * current.count,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
