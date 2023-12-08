let carousel = document.querySelector('.carousel')
let container = document.querySelector('.container')
let arrow = document.querySelector(".arrow");
let indicators = document.querySelectorAll(".indicator span");
let currentIndex = 0;
let imgs = carousel.querySelectorAll('img')
let timerId = null
function init(){
  var first = carousel.firstElementChild.cloneNode(true)
  var last = carousel.lastElementChild.cloneNode(true)
  last.style.marginLeft = '-100%'
  carousel.appendChild(first)
  carousel.insertBefore(last, carousel.firstElementChild)
  arrow.style.display = 'none'
  container.addEventListener('mouseenter',(e) => {
    timerId && clearInterval(timerId)
    arrow.style.display = 'block'
  })
  container.addEventListener('mouseleave',(e) => {
    arrow.style.display = 'none'
    autoPlay()
  })
  arrow.querySelector('.left').onclick = leftClick
  arrow.querySelector('.right').onclick = rightClick
}
function moveTo(index){
  carousel.style.transition = "0.6s"
  carousel.style.transform = `translateX(${index * -100}%)`;
  let activeClass = document.querySelector('.indicator span.active')
  activeClass.classList.remove('active')
  indicators[index].classList.add('active')
  currentIndex = index
}
function rightClick(){
  if(currentIndex == imgs.length-1){
    carousel.style.transform = "translateX(100%)"
    carousel.style.transition = 'none'
    carousel.getBoundingClientRect()
    moveTo(0)
  } else {
    moveTo(currentIndex+1)
  }
}
function leftClick(){
  if(currentIndex == 0){
    carousel.style.transform = `translateX(-${imgs.length}00%)`
    carousel.style.transition = 'none'
    carousel.getBoundingClientRect()
    moveTo(imgs.length-1)
  } else {
    moveTo(currentIndex-1)
  }
}
indicators.forEach((item, i) => {
  item.onclick = function () {
    moveTo(i);
    currentIndex = i
  };
})
function autoPlay(){
  timerId = setInterval(() => {
    rightClick()
  }, 2000);
}
init()
autoPlay()
