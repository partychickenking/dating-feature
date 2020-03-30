const register1 = document.querySelector('.register-1');
const register2 = document.querySelector('.register-2');
const register3 = document.querySelector('.register-3');
const register4 = document.querySelector('.register-4');
const register5 = document.querySelector('.register-5');

const btn = document.querySelector('.next-btn');

register1.style.width = "100%";
register1.style.height = "100%";

register2.style.width = "100%";
register2.style.height = "100%";
register2.style.transform = "translate(100%, -100%)";

register3.style.width = "100%";
register3.style.height = "100%";
register3.style.transform = "translate(100%, -200%)";

register4.style.width = "100%";
register4.style.height = "100%";
register4.style.transform = "translate(100%, -300%)";

register5.style.width = "100%";
register5.style.height = "100%";
register5.style.transform = "translate(100%, -400%)";



btn.style.width = "10rem";
btn.style.height = "3rem";
btn.style.backgroundColor = "#8A2BE2";
btn.style.position = "fixed";
btn.style.transform = "translate(-50%)"
btn.style.content = "Next";
btn.style.cursor = "pointer";



btn.addEventListener("click", function () {
    register1.classList.toggle("toggle");
})


console.log('Check');