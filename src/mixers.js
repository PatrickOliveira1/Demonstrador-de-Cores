export function mixRgb(color1, color2) {
  const r = Math.floor((color1.r + color2.r) / 2);
  const g = Math.floor((color1.g + color2.g) / 2);
  const b = Math.floor((color1.b + color2.b) / 2);
  return { r, g, b };
}

export function mixRyb(color1, color2) {
  const r = Math.floor((color1.r + color2.r) / 2);
  const y = Math.floor((color1.g + color2.g) / 2);
  const b = Math.floor((color1.b + color2.b) / 2);
  return { r, g: y, b };
}