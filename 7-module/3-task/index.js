export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;

    this.elem = document.createElement("div");
    this.elem.className = "slider";

    this.thumbEl = document.createElement("div");
    this.thumbEl.className = "slider__thumb";
    this.elem.appendChild(this.thumbEl);

    this.valueEl = document.createElement("span");
    this.valueEl.innerText = "0";
    this.valueEl.className = "slider__value";
    this.thumbEl.appendChild(this.valueEl);

    this.progressEl = document.createElement("div");
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

    this.elem.addEventListener("click", (event) => {
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let leftRelative = left / this.elem.offsetWidth;
      let segments = steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = (value / segments) * 100;

      this.value = value;
      this.thumbEl.style.left = valuePercents + "%";
      this.valueEl.innerText = value;
      this.progressEl.style.width = valuePercents + "%";
      this.stepsEl.querySelectorAll("span").forEach((item, i) => {
        if (i === value) {
          item.classList.add("slider__step-active");
        } else {
          item.classList.remove("slider__step-active");
        }
      });

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: this.value,
          bubbles: true,
        })
      );
    });
  }
}
