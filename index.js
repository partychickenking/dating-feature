/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

console.log("check");

var register2 = document.querySelector(".next-btn");



var next = function() {
    register2.classList.toggle("nextregister2");
};

register2.addEventListener("click", next);

