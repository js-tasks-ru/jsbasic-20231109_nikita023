import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.elem = createElement(`<div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>`);
    this.body = this.elem.querySelector(".modal__body");
    this.title = this.elem.querySelector(".modal__title");
    this.buttonClose = this.elem.querySelector(".modal__close");
  }

  closeByEsc(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }

  open() {
    document.body.appendChild(this.elem);
    document.body.classList.add("is-modal-open");
    this.buttonClose.addEventListener("click", this.close.bind(this));
    document.body.addEventListener("keydown", this.closeByEsc.bind(this));
  }

  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
    document.body.removeEventListener("keydown", this.closeByEsc);
  }

  setTitle(title) {
    this.title.innerText = title;
  }

  setBody(node) {
    this.body.appendChild(node);
  }
}
