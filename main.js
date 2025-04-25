"use strict";

const paletRange = document.querySelector('input[id="paletRange"]');
const paletRangeNum = document.querySelector('#paletRangeNum');
const offsetRange = document.querySelector('input[id="offsetRange"]');
const offsetRangeNum = document.querySelector('#offsetRangeNum');
const chromaRange = document.querySelector('input[id="chromaRange"]');
const chromaRangeNum = document.querySelector('#chromaRangeNum');

const canvas = document.getElementById("canvas");

paletRange.addEventListener('input', () =>{
    paletRangeNum.textContent = paletRange.value;
    draw();
})
offsetRange.addEventListener('input', () =>{
    offsetRangeNum.textContent = offsetRange.value;
    draw();
})
chromaRange.addEventListener('input', () =>{
    chromaRangeNum.textContent = chromaRange.value;
    draw();
})

function addRect() {
    const paletRangeValue = parseInt(paletRange.value);
    const x = 0;
    const y = 0;
    const width = Math.floor(canvas.width/paletRangeValue);
    const height = 30;

    console.log(x,y,width,height, paletRangeValue)
    return {"x":x,"y":y,"width":width,"height":height,"value":paletRangeValue};
}
function draw() {
    if (canvas.getContext) {
        const ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,canvas.width,canvas.height)
        const rects = addRect();

        const light = [100, 95, 90, 80, 70, 60, 50, 40, 30, 20, 10];
        const chroma = chromaRange.value
        const hue = 360 / parseInt(paletRange.value);

        for (let i = 0; i < rects["value"]; i++) {
            for (let j = 0; j < light.length; j++) {
                const color = `oklch(${light[j]}% ${chroma}% ${(hue*i) - parseInt(offsetRange.value)}deg)`;
                // console.log(`${hue*i}`)
                ctx.fillStyle = color;
                ctx.fillRect(
                    rects["x"] + i * rects["width"],
                    rects["y"]+ j * rects["height"],
                    rects["width"],
                    rects["height"]);
            }
        }
    }
}
window.addEventListener("load", draw)