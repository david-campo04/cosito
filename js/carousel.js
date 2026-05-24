const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");
const counterCurrent = document.getElementById("slide-current");
const counterTotal = document.getElementById("slide-total");

let current = 0;
let timer;

if (counterTotal) counterTotal.textContent = slides.length;

slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("dot");
  if (index === 0) dot.classList.add("active");

  dot.addEventListener("click", () => {
    current = index;
    showSlide(current);
    resetTimer();
  });

  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  slides[index].classList.add("active");
  dots[index].classList.add("active");
  if (counterCurrent) counterCurrent.textContent = index + 1;
}

function nextSlide() {
  current = (current + 1) % slides.length;
  showSlide(current);
}

function prevSlide() {
  current = (current - 1 + slides.length) % slides.length;
  showSlide(current);
}

function btnNext() { nextSlide(); resetTimer(); }
function btnPrev() { prevSlide(); resetTimer(); }

function startTimer() {
  timer = setInterval(nextSlide, 7000);
}

function resetTimer() {
  clearInterval(timer);
  startTimer();
}

startTimer();
