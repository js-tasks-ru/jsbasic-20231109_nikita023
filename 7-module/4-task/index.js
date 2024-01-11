export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement("div");
    this.elem.className = "slider";

    this.thumbEl = document.createElement("div");
    this.thumbEl.className = "slider__thumb";
    this.thumbEl.style.left = 0;
    this.elem.appendChild(this.thumbEl);
    this.thumbEl.ondragstart = () => false;

    this.valueEl = document.createElement("span");
    this.valueEl.innerText = this.value;
    this.valueEl.className = "slider__value";
    this.thumbEl.appendChild(this.valueEl);

    this.progressEl = document.createElement("div");
    this.progressEl.style.width = 0;
    this.progressEl.className = "slider__progress";
    this.elem.appendChild(this.progressEl);

    this.stepsEl = document.createElement("div");
    this.stepsEl.className = "slider__steps";
    this.elem.appendChild(this.stepsEl);

    for (let i = 0; i < this.steps; i++) {
      const stepEl = document.createElement("span");
      if (i === 0) {
        stepEl.className = "slider__step-active";
      }
      this.stepsEl.appendChild(stepEl);
    }

    const move = (event) => {
      this.handle(event, true);
    };

    const moveEnd = (event) => {
      this.handle(event);

      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", moveEnd);

      this.elem.classList.remove("slider_dragging");

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    };

    this.thumbEl.addEventListener("pointerdown", (event) => {
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", moveEnd);
      this.elem.classList.add("slider_dragging");
    });

    this.elem.addEventListener("click", (event) => {
      this.handle(event);

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });
    this.draw((this.value * 100) / (this.steps - 1));
  }

  draw(valuePercents) {
    this.thumbEl.style.left = valuePercents + "%";
    this.valueEl.innerText = this.value;
    this.progressEl.style.width = valuePercents + "%";
    this.stepsEl.querySelectorAll("span").forEach((item, i) => {
      if (i === this.value) {
        item.classList.add("slider__step-active");
      } else {
        item.classList.remove("slider__step-active");
      }
    });
  }

  handle(event, isMove = false) {
    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = (value / segments) * 100;

    this.value = value;

    this.draw(isMove ? leftRelative * 100 : valuePercents);
  }
}
