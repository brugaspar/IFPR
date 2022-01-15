export function hexToRGB(color: string) {
  const hexColor = color.match(/.{1,2}/g);

  if (!hexColor) throw new Error("Invalid hex color");

  const rgbColor = [parseInt(hexColor[0], 16), parseInt(hexColor[1], 16), parseInt(hexColor[2], 16)];

  return rgbColor;
}

export function getColorLuminosity(color: string) {
  const rgbColor = hexToRGB(color.substring(1));

  const [red, green, blue] = rgbColor;

  const luminosity = (red * 299 + green * 587 + blue * 114) / 1000;

  return luminosity < 128;
}
