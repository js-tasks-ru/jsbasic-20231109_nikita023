function initCarousel() {

  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const carousel = document.querySelector('.carousel__inner');
  const width = document.querySelector('.carousel__slide').offsetWidth;
  
  const count = document.querySelectorAll('.carousel__slide').length;
  let currentI = 0;
  
  function checkButtonVisibility() {
    if (currentI >= count-1) {
      arrowRight.style.display = 'none';
    } else {
      arrowRight.style.display = '';
    }
  
    if (currentI === 0) {
      arrowLeft.style.display = 'none';
    } else {
      arrowLeft.style.display = '';
    }
  }
  
  checkButtonVisibility();
  
  arrowRight.onclick = () => {
    currentI++;
    checkButtonVisibility();
    carousel.style.transform = `translateX(-${width * currentI}px)`;
  };
  
  arrowLeft.onclick = () => {
    currentI--;  
    checkButtonVisibility();
    carousel.style.transform = `translateX(-${width * currentI}px)`;  
  };
}
