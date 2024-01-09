import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    const carousel = new Carousel(slides);
    const dataCarouselHolder = document.querySelector("[data-carousel-holder]");
    dataCarouselHolder.appendChild(carousel.elem);

    const ribbonMenu = new RibbonMenu(categories);
    const dataRibbonHolder = document.querySelector("[data-ribbon-holder]");
    dataRibbonHolder.appendChild(ribbonMenu.elem);

    const stepSlider = new StepSlider({ steps: 5, value: 3 });
    const dataSliderHolder = document.querySelector("[data-slider-holder]");
    dataSliderHolder.appendChild(stepSlider.elem);

    const cartIcon = new CartIcon();
    const dataCartIconHolder = document.querySelector(
      "[data-cart-icon-holder]"
    );
    dataCartIconHolder.appendChild(cartIcon.elem);

    const cart = new Cart(cartIcon);

    return new Promise((resolve, reject) => {
      fetch("products.json")
        .then((response) => response.json())
        .then((products) => {
          const productsGrid = new ProductsGrid(products);
          const rootEl = document.querySelector("[data-products-grid-holder]");
          rootEl.innerHTML = "";
          rootEl.appendChild(productsGrid.elem);

          document.body.addEventListener("product-add", (event) => {
            const currentProduct = products.find((product) => {
              return (product.id = event.detail);
            });
            cart.addProduct(currentProduct);
          });

          stepSlider.elem.addEventListener("slider-change", (event) => {
            productsGrid.updateFilter({
              maxSpiciness: event.detail,
            });
          });

          ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
            console.log(event);
            productsGrid.updateFilter({
              category: event.detail,
            });
          });

          const nutsCheckbox = document.getElementById("nuts-checkbox");
          const vegeterianOnly = document.getElementById("vegeterian-checkbox");

          productsGrid.updateFilter({
            noNuts: nutsCheckbox.checked,
            vegeterianOnly: vegeterianOnly.checked,
            maxSpiciness: stepSlider.value,
            category: ribbonMenu.value,
          });

          nutsCheckbox.addEventListener("change", (event) => {
            productsGrid.updateFilter({
              noNuts: nutsCheckbox.checked,
            });
          });

          vegeterianOnly.addEventListener("change", (event) => {
            productsGrid.updateFilter({
              vegeterianOnly: vegeterianOnly.checked,
            });
          });

          resolve();
        });
    });
  }
}
