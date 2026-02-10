import { mixRGB, mixRYB } from './mixers.js';
import {renderColors} from './names.js';

let selectedColor1 = null;
let selectedColor2 = null;
let phase = 1;

function highlightColor() {
  const colorBoxes = document.querySelectorAll('.colors');

  colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const color = getComputedStyle(box).backgroundColor;
      const colorObj = parseRgbString(color);

      if (phase === 1) {
        selectedColor1 = parseRgbString(color);
        colorBoxes.forEach(b => b.classList.remove('color1'));
        box.classList.add('color1');
        phase = 2;
      } else if (phase === 2) {
        selectedColor2 = parseRgbString(color);
        colorBoxes.forEach(b => b.classList.remove('color2'));
        box.classList.add('color2');
        phase = 3;

        const result = mixRGB(selectedColor1, selectedColor2);
        const resultCss = `rgb(${result.r}, ${result.g}, ${result.b})`;
        document.querySelector('.color-result').style.backgroundColor = resultCss;
      } else {
        selectedColor1 = null;
        selectedColor2 = null;
        colorBoxes.forEach(b => b.classList.remove('color1', 'color2'));
        document.querySelector('.color-result').style.backgroundColor = '';
        phase = 1;
      }
    });
  });
}

function parseRgbString(rgbString) {
  const values = rgbString.match(/\d+/g).map(Number);
  return {
    r: values[0],
    g: values[1],
    b: values[2]
  };
}

function reset() {
  document.getElementById('reset-btn').addEventListener('click', () => {
  selectedColor1 = null;
  selectedColor2 = null;
  phase = 1;
  
  const colorBoxes = document.querySelectorAll('.colors');
  colorBoxes.forEach(b => b.classList.remove('color1', 'color2'));
  document.querySelector('.color-result').style.backgroundColor = '';
  });
}

renderColors();
highlightColor();
reset();