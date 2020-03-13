const hexToHSL = (hex) => {
  const rgb = {
    r: 0,
    g: 0,
    b: 0
  };

  if (hex.length === 4) {
    rgb.r = '0x' + hex[1] + hex[1];
    rgb.g = '0x' + hex[2] + hex[2];
    rgb.b = '0x' + hex[3] + hex[3];
  } else {
    rgb.r = '0x' + hex[1] + hex[2];
    rgb.g = '0x' + hex[3] + hex[4];
    rgb.b = '0x' + hex[5] + hex[6];
  }

  rgb.r /= 255;
  rgb.g /= 255;
  rgb.b /= 255;

  const cmin = Math.min(rgb.r, rgb.g, rgb.b);
  const cmax = Math.max(rgb.r, rgb.g, rgb.b);
  const delta = cmax - cmin;

  const hsl = {
    h: 0,
    s: 0,
    l: 0
  };

  if (delta === 0) {
    hsl.h = 0;
  } else if (cmax === hsl.r) {
    hsl.h = ((hsl.g - hsl.b) / delta) % 6;
  } else if (cmax === hsl.g) {
    hsl.h = (hsl.b - hsl.r) / delta + 2;
  } else {
    hsl.h = (hsl.r - hsl.g) / delta + 4;
  }

  hsl.h = Math.round(hsl.h * 60);

  if (hsl.h < 0) {
    hsl.h += 360;
  }

  hsl.l = (cmax + cmin) / 2;
  hsl.s = (delta === 0) ? 0 : delta / (1 - Math.abs(2 * hsl.l - 1));
  hsl.s = +(hsl.s * 100).toFixed(1);
  hsl.l = +(hsl.l * 100).toFixed(1);

  return hsl;
};

export { hexToHSL };
