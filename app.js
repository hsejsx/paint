'use strict';
const canvas = document.querySelector('#canvas');
const canvasSize = canvas.getBoundingClientRect();
const ctx = canvas.getContext('2d');
const claerBtn = document.querySelector('.clear-btn');
const colorBtns = document.querySelector('.color-btns');
const brush = document.querySelector('#brush');
let mode = false;
let size = brush.value;

canvas.addEventListener('mousedown', (e) => {
    mode = true;
})

canvas.addEventListener('mouseup', (e) => {
    mode = false;
})

canvas.addEventListener('mousemove', (e) => {
    if (mode) {
        const x = e.clientX - canvasSize.left;
        const y = e.clientY - canvasSize.top;
        painting(x, y);
    }
})

function painting(x, y) {
    ctx.fillRect(x, y, size, size);
}

function downloadImg(el) {
    const imageURI = canvas.toDataURL("image/png");
    el.href = imageURI;
};

brush.addEventListener('change', () => {
    size = brush.value;
})

colorBtns.addEventListener('click', e => {
    changeColor(e);
})

claerBtn.addEventListener('click', () => {
    clearCanvas();
})

function changeColor(e) {
    const color = window.getComputedStyle(e.target).getPropertyValue('background-color');
    ctx.fillStyle = color;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);
}
