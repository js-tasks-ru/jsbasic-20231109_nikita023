import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};

    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner"></div>
    </div>`);
    this.inner = this.elem.querySelector(".products-grid__inner");
    this.render(products);
  }

  render(products) {
    this.inner.innerHTML = "";

    for (let product of products) {
      this.inner.appendChild(new ProductCard(product).elem);
    }
  }

  updateFilter(filters) {
    this.filters = { ...this.filters, ...filters };
    const filteredProducts = this.products.filter((product) => {
      const isNoNutsCheked = this.filters.noNuts ? !product.nuts : true;
      const isVegetarianCheked = this.filters.vegeterianOnly
        ? !!product.vegeterian
        : true;
      const isMaxSpicinessCheked =
        this.filters.maxSpiciness !== undefined
          ? product.spiciness
            ? product.spiciness <= this.filters.maxSpiciness
            : true
          : true;
      const isCategoryCheked = this.filters.category
        ? product.category === this.filters.category
        : true;

      return (
        isNoNutsCheked &&
        isVegetarianCheked &&
        isMaxSpicinessCheked &&
        isCategoryCheked
      );
    });
    this.render(filteredProducts);
  }
}
