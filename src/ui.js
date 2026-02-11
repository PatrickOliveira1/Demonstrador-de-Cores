import { mixRGB, mixRYB } from './mixers.js';
import {renderColors} from './names.js';

let selectedColor1 = null;
let selectedColor2 = null;
let phase = 1;
let colorMode = 'RGB';

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

        updateResult();
        
        phase = 3;
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

function updateResult() {
  let result;
  
  if (colorMode === 'RGB') {
    result = mixRGB(selectedColor1, selectedColor2);
  } else {
    result = mixRYB(selectedColor1, selectedColor2);
  }
  
  const resultCss = `rgb(${result.r}, ${result.g}, ${result.b})`;
  const resultHex = rgbToHex(result.r, result.g, result.b);
  
  document.querySelector('.color-result').style.backgroundColor = resultCss;
  
  document.getElementById('result-rgb').textContent = `RGB: ${result.r}, ${result.g}, ${result.b}`;
  document.getElementById('result-hex').textContent = `HEX: ${resultHex}`;
}

function parseRgbString(rgbString) {
  const values = rgbString.match(/\d+/g).map(Number);
  return {
    r: values[0],
    g: values[1],
    b: values[2]
  };
}

function rgbToHex(r, g, b) {
  const toHex = (n) => {
    const hex = n.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function reset() {
document.getElementById('reset-btn').addEventListener('click', () => {
  const resultBox = document.querySelector('.color-result');
  
  resultBox.classList.add('fade-out');
  
  setTimeout(() => {
    resultBox.style.backgroundColor = '';
    resultBox.classList.remove('fade-out');
    
    document.getElementById('result-rgb').textContent = 'RGB: -';
    document.getElementById('result-hex').textContent = 'HEX: -';
    
    selectedColor1 = null;
    selectedColor2 = null;
    phase = 1;
    
    const colorBoxes = document.querySelectorAll('.colors');
    colorBoxes.forEach(b => b.classList.remove('color1', 'color2'));
  }, 300);
});
}

function setupColorModeToggle() {
  const rgbRadio = document.getElementById('rgb');
  const rybRadio = document.getElementById('ryb');

  rgbRadio.addEventListener('change', () => {
    if (rgbRadio.checked) {
      colorMode = 'RGB';
      
      if (selectedColor1 && selectedColor2) {
        updateResult();
      }
    }
  });

  rybRadio.addEventListener('change', () => {
    if (rybRadio.checked) {
      colorMode = 'RYB';
      
      if (selectedColor1 && selectedColor2) {
        updateResult();
      }
    }
  });
}

setupColorModeToggle();
renderColors();
highlightColor();
reset();