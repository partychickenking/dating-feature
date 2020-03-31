const register1 = document.querySelector('.register-1');
const register2 = document.querySelector('.register-2');
const register3 = document.querySelector('.register-3');
const register4 = document.querySelector('.register-4');
const register5 = document.querySelector('.register-5');
const form = document.querySelector('form-register');

const btn = document.querySelector('.next-btn');


//-----------------------------------STYLES-----------------------------------
register1.style.height = "100%";
register2.style.height = "100%";
register3.style.height = "100%";
register4.style.height = "100%";
register5.style.height = "100%";
form.style.maxHeight = '100vh';
form.style.display = 'flex';


btn.style.width = "10rem";
btn.style.height = "3rem";
btn.style.backgroundColor = "#8A2BE2";
btn.style.position = "fixed";
btn.style.top = "0";
btn.style.content = "Next";
btn.style.cursor = "pointer";


//-----------------------------------BUTTON FUNCTION-----------------------------------
btn.addEventListener("click", function () {
    register2.classList.toggle("toggle");
});


console.log('Check');