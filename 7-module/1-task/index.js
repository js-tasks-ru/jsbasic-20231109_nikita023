import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`);
    this.inner = this.elem.querySelector(".ribbon__inner");
    this.arrowLeft = this.elem.querySelector(".ribbon__arrow_left");
    this.arrowRight = this.elem.querySelector(".ribbon__arrow_right");
    this.inner.scrollBy(0, 0);

    for (let category of categories) {
      this.addMenuItem(category);
    }

    this.selectedMenuItem = null;

    this.arrowLeft.addEventListener("click", () => {
      this.inner.scrollBy(-350, 0);
    });

    this.arrowRight.addEventListener("click", () => {
      this.inner.scrollBy(350, 0);
    });

    this.inner.addEventListener("scroll", () => {
      let scrollWidth = this.inner.scrollWidth;
      let scrollLeft = this.inner.scrollLeft;
      let clientWidth = this.inner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      if (scrollLeft < 1) {
        this.arrowLeft.classList.remove("ribbon__arrow_visible");
      } else {
        this.arrowLeft.classList.add("ribbon__arrow_visible");
      }

      if (scrollRight < 1) {
        this.arrowRight.classList.remove("ribbon__arrow_visible");
      } else {
        this.arrowRight.classList.add("ribbon__arrow_visible");
      }
    });
  }

  addMenuItem(data) {
    const menuItem = createElement(`
      <a href="#" class="ribbon__item" data-id="${data.id}">${data.name}</a>
    `);
    this.inner.appendChild(menuItem);
    menuItem.addEventListener("click", (e) => {
      e.preventDefault();

      if (this.selectedMenuItem) {
        this.selectedMenuItem.classList.remove("ribbon__item_active");
      }

      this.selectedMenuItem = menuItem;
      this.selectedMenuItem.classList.add("ribbon__item_active");

      this.elem.dispatchEvent(
        new CustomEvent("ribbon-select", {
          detail: menuItem.dataset["id"],
          bubbles: true,
        })
      );
    });
  }
}
