import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modal = new Modal();
    this.modal.setTitle("Your order");
    let modalBody = document.createElement("div");
    for (let cartItem of this.cartItems) {
      const productEl = this.renderProduct(cartItem.product, cartItem.count);
      modalBody.appendChild(productEl);
    }
    modalBody.addEventListener("click", (event) => {
      const button = event.target.closest(".cart-counter__button");
      if (button) {
        const productId =
          event.target.closest(".cart-product")?.dataset.productId;
        this.updateProductCount(
          productId,
          button.classList.contains("cart-counter__button_minus") ? -1 : 1
        );
      }
    });

    const orderForm = this.renderOrderForm();
    modalBody.appendChild(orderForm);
    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });

    this.modal.setBody(modalBody);

    this.modal.open();
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (this.cartItems.length === 0) {
      this.modal.close();
      return;
    }

    if (document.body.classList.contains("is-modal-open")) {
      const productId = cartItem.product.id;
      const modalBody = this.modal.elem;
      const productCount = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      const productPrice = modalBody.querySelector(
        `[data-product-id="${productId}"] .cart-product__price`
      );
      const infoPrice = modalBody.querySelector(`.cart-buttons__info-price`);

      productCount.innerText = cartItem.count;
      productPrice.innerText = `€${(
        cartItem.product.price * cartItem.count
      ).toFixed(2)}`;
      infoPrice.innerText = `€${this.getTotalPrice().toFixed(2)}`;
    }
  }

  async onSubmit(event) {
    const button = event.target.querySelector('[type="submit"]');
    button.classList.add("is-loading");

    const response = await fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(event.target),
    });

    if (response.ok) {
      this.modal.setTitle("Success!");
      this.modal.setBody(
        createElement(`<div class="modal__body-inner">
      <p>
        Order successful! Your order is being cooked :) <br>
        We’ll notify you about delivery time shortly.<br>
        <img src="/assets/images/delivery.gif">
      </p>
    </div>`)
      );
      this.cartItems = [];
    }
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
