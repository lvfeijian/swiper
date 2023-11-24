let carousel = document.querySelector('.carousel')
let container = document.querySelector('.container')
let arrow = document.querySelector(".arrow");
let indicators = document.querySelectorAll(".indicator span");
let currentIndex = 0;
let imgs = carousel.querySelectorAll('img')
let timerId = null
function init(){
  arrow.style.display = 'none'
  container.addEventListener('mouseenter',(e) => {
    timerId && clearInterval(timerId)
    arrow.style.display = 'block'
  })
  container.addEventListener('mouseleave',(e) => {
    arrow.style.display = 'none'
    autoPlay()
  })
  arrow.querySelector('.left').onclick = (e)=>{
    currentIndex = (--currentIndex + imgs.length) % imgs.length
    moveTo(currentIndex)
  }
  arrow.querySelector('.right').onclick = (e)=>{
    console.log(currentIndex);
    currentIndex = ++currentIndex % imgs.length
    moveTo(currentIndex)
  }
}
function moveTo(index){
  carousel.style.transform = `translateX(${index * -100}%)`;
  let activeClass = document.querySelector('.indicator span.active')
  activeClass.classList.remove('active')
  indicators[index].classList.add('active')
}
indicators.forEach((item, i) => {
  item.onclick = function () {
    moveTo(i);
    currentIndex = i
  };
})
function autoPlay(){
  timerId = setInterval(() => {
    currentIndex = ++currentIndex % imgs.length;
    moveTo(currentIndex);
  }, 2000);
}
init()
autoPlay()
