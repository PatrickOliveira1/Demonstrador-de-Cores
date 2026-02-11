export function mixRGB(color1, color2) {
  const r = Math.floor((color1.r + color2.r) / 2);
  const g = Math.floor((color1.g + color2.g) / 2);
  const b = Math.floor((color1.b + color2.b) / 2);
  return { r, g, b };
}

export function mixRYB(color1, color2) {
  const ryb1 = rgbToRyb(color1);
  const ryb2 = rgbToRyb(color2);
  
  const mixedRyb = {
    r: Math.floor((ryb1.r + ryb2.r) / 2),
    y: Math.floor((ryb1.y + ryb2.y) / 2),
    b: Math.floor((ryb1.b + ryb2.b) / 2)
  };
  
  return rybToRgb(mixedRyb);
}

function rgbToRyb(rgb) {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  
  const white = Math.min(r, g, b);
  const red = r - white;
  const yellow = (g - white) + Math.min(g, b) - white;
  const blue = (b - white) * 2 - (g - white);
  
  return {
    r: Math.floor((red + white) * 255),
    y: Math.floor((yellow + white) * 255),
    b: Math.floor(Math.max(0, Math.min(1, blue + white)) * 255)
  };
}

function rybToRgb(ryb) {
  const r = ryb.r / 255;
  const y = ryb.y / 255;
  const b = ryb.b / 255;
  
  const white = Math.min(r, y, b);
  const red = r - white;
  const yellow = y - white;
  const blue = b - white;
  
  const green = (yellow - red) / 2;
  
  return {
    r: Math.floor(Math.max(0, Math.min(1, red + white)) * 255),
    g: Math.floor(Math.max(0, Math.min(1, green + yellow / 2 + white)) * 255),
    b: Math.floor(Math.max(0, Math.min(1, blue + white)) * 255)
  };
}