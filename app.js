'use strict';
let canvas;
let canvasSize;
let ctx;
const claerBtn = document.querySelector('.clear-btn');
const colorBtns = document.querySelector('.color-btns');
const brush = document.querySelector('#brush');
let mode = false;
let size = brush.value;

setScreen();

window.addEventListener('resize', () => {
    setScreen();
})

function setScreen() {
    const intViewportWidth = window.innerWidth;
    console.log(intViewportWidth);
    if (intViewportWidth <= 575) {
        setCanvas('#canvas-sm');
    } else if (intViewportWidth >= 576 && intViewportWidth <= 767) {
        setCanvas('#canvas-md');
    } else if (intViewportWidth >= 768) {
        setCanvas('#canvas-lg');
    }
}

function setCanvas(size) {
    console.log(size);
    canvas = document.querySelector(size);
    canvasSize = canvas.getBoundingClientRect();
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', (e) => {
        mode = true;
    })
    canvas.addEventListener('touchstart', (e) => {
        mode = true;
    })

    canvas.addEventListener('mouseup', (e) => {
        mode = false;
    })
    canvas.addEventListener('touchend', (e) => {
        mode = false;
    })

    canvas.addEventListener('mousemove', (e) => {
        if (mode) {
            const x = e.clientX - canvasSize.left;
            const y = e.clientY - canvasSize.top;
            painting(x, y);
        }
    })
    canvas.addEventListener('touchmove', (e) => {
        if (mode) {
            const touch = e.touches[0];
            const x = touch.clientX - canvasSize.left;
            const y = touch.clientY - canvasSize.top;
            painting(x, y);
        }
    })
}

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
