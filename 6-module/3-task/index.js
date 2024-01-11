import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    this.arrowRight = this.elem.querySelector(".carousel__arrow_right");
    this.arrowLeft = this.elem.querySelector(".carousel__arrow_left");
    this.carousel = this.elem.querySelector(".carousel__inner");

    for (let slide of slides) {
      this.addSlide(slide);
    }

    this.currentI = 0;

    this.checkButtonVisibility();

    this.arrowRight.onclick = () => {
      this.currentI++;
      this.checkButtonVisibility();
      this.carousel.style.transform = `translateX(-${
        this.elem.offsetWidth * this.currentI
      }px)`;
    };

    this.arrowLeft.onclick = () => {
      this.currentI--;
      this.checkButtonVisibility();
      this.carousel.style.transform = `translateX(-${
        this.elem.offsetWidth * this.currentI
      }px)`;
    };
  }

  addSlide(slide) {
    const slideEl =
      createElement(`<div class="carousel__slide" data-id="${slide.id}">
      <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
      <div class="carousel__caption">
        <span class="carousel__price">€${slide.price}</span>
        <div class="carousel__title">${slide.name}</div>
        <button type="button" class="carousel__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
        </div>
      </div>`);
    this.carousel.appendChild(slideEl);

    const button = slideEl.querySelector(".carousel__button");
    button.addEventListener("click", () => {
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slide.id,
          bubbles: true,
        })
      );
    });
  }

  checkButtonVisibility() {
    if (this.currentI >= this.slides.length - 1) {
      this.arrowRight.style.display = "none";
    } else {
      this.arrowRight.style.display = "";
    }

    if (this.currentI === 0) {
      this.arrowLeft.style.display = "none";
    } else {
      this.arrowLeft.style.display = "";
    }
  }
}
