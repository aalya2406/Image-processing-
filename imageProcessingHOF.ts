import type { Image, Color } from "../include/image.js";

export function imageMapCoord(img: Image, func: (img: Image, x: number, y: number) => Color): Image {
  // TODO
  let x;
  let y;
  const art = img.copy();
  for (y = 0; y < img.height; y++) {
    for (x = 0; x < img.width; x++) {
      const colour = func(img, x, y);
      art.setPixel(x, y, colour);
    }
  }
  return art;
}

export function imageMapIf(
  img: Image,
  cond: (img: Image, x: number, y: number) => boolean,
  func: (p: Color) => Color
): Image {
  const useThisFunc = (img: Image, x: number, y: number): Color => {
    const dot = img.getPixel(x, y);
    if (cond(img, x, y)) {
      return func(dot);
    } else {
      return dot;
    }
  };

  // TODO
  return imageMapCoord(img, useThisFunc);
}

export function mapWindow(
  img: Image,
  xInterval: number[], // Assumed to be a two element array containing [x_min, x_max]
  yInterval: number[], // Assumed to be a two element array containing [y_min, y_max]
  func: (p: Color) => Color
): Image {
  // TODO
  const exists = (img: Image, x: number, y: number): boolean => {
    return x >= xInterval[0] && x <= xInterval[1] && y >= yInterval[0] && y <= yInterval[1];
  };
  //const applyifexists = (img:Image, x:number, y:number): Color => {
  // }
  //const dot = img.getPixel(x,y);
  // if(exists(img,x,y)){
  // return func(dot);
  // }
  // else{
  //  return dot;
  //}
  // };

  return imageMapIf(img, exists, func);
}

export function makeBorder(img: Image, thickness: number, func: (p: Color) => Color): Image {
  // TODO
  // const xInterval = [0,img.width-1];
  // const yInterval = [0,img.height-1];
  const ifOnBorder = (img: Image, x: number, y: number): boolean => {
    if (x < thickness || x > img.width - 1 - thickness || y < thickness || y > img.height - 1 - thickness) {
      return true;
    }
    return false;
  };

  return imageMapIf(img, ifOnBorder, func);
}

export function dimCenter(img: Image, thickness: number): Image {
  // TODO
  //const dimColor =(p:Color): Color =>{
  //const ifOnBorder = (img: Image, x: number, y: number): boolean => {
  //  return x <= thickness || x >= img.width - 1 - thickness || y <= thickness || y >= img.height - 1 - thickness;
  //};
  // function a(p: Color): Color {
  //   if (!ifOnBorder) {
  //     return [Math.floor(p[0] * 0.8), Math.floor(p[1] * 0.8), Math.floor(p[2] * 0.8)];
  //   }
  //   return p;
  // }

  function f(p: Color) {
    return [p[0] * 0.8, p[1] * 0.8, p[2] * 0.8];
  }

  const a = [thickness, img.width - thickness - 1];
  const b = [thickness, img.height - thickness - 1];

  return mapWindow(img, a, b, f);
}

export function isGrayish(p: Color): boolean {
  // TODO

  const max = Math.max(p[0], p[1], p[2]);
  const min = Math.min(p[0], p[1], p[2]);
  if (max - min <= 85) {
    return true;
  }
  return false;
}

export function makeGrayish(img: Image): Image {
  // TODO

  function check(img: Image, x: number, y: number): Color {
    if (!isGrayish(img.getPixel(x, y))) {
      const m = Math.floor((img.getPixel(x, y)[0] + img.getPixel(x, y)[1] + img.getPixel(x, y)[2]) / 3);
      return [m, m, m];
    } else {
      return img.getPixel(x, y);
    }
  }
  const output = imageMapCoord(img, check);
  return output;
}
