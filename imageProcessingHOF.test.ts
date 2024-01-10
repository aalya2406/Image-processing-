import assert from "assert";
import { Color, COLORS, Image } from "../include/image.js";
import {
  imageMapCoord,
  imageMapIf,
  mapWindow,
  makeBorder,
  dimCenter,
  isGrayish,
  makeGrayish,
} from "./imageProcessingHOF.js";

describe("imageMapCoord", () => {
  function identity(img: Image, x: number, y: number) {
    return img.getPixel(x, y);
  }

  it("should return a different image", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = imageMapCoord(input, identity);
    assert(input !== output);
  });

  // More tests for imageMapCoord go here.
});

describe("imageMapIf", () => {
  function x(img: Image, x: number, y: number) {
    return x == 3 || y == 5;
  }
  function f(color: Color) {
    color = COLORS.BLUE;
    return color;
  }
  // More tests for imageMapIf go here
  it("if the condition is passed it is true otherwise its false", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = imageMapIf(input, x, f);
    assert(input.getPixel(3, 0)[0] !== output.getPixel(3, 0)[0]);
  });
});

describe("mapWindow", () => {
  const x = [4, 9];
  const y = [2, 10];

  function f(p: Color) {
    p = COLORS.GREEN;
    return p;
  }
  // More tests for mapWindow go here
  it("a new image is returned if the pixel lies within the range", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = mapWindow(input, x, y, f);
    assert(input.getPixel(5, 7)[0] !== output.getPixel(5, 7)[0]);
  });
});

describe("makeBorder", () => {
  const thickness = 5;
  function func(p: Color) {
    p = COLORS.BLACK;
    return p;
  }
  // More tests for makeBorder go here
  it("creating a new image with a border if pixels lie within given range from edge pixel", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = makeBorder(input, thickness, func);
    assert(input.getPixel(5, 7)[0] !== output.getPixel(5, 7)[0]);
  });
});

describe("dimCenter", () => {
  // More tests for dimCenter go here
  const thickness = 5;

  it("creates a new image with the center pixels 20% dimmer", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = dimCenter(input, thickness);
    assert(input.getPixel(5, 7)[0] == output.getPixel(5, 7)[0]);
  });
});

describe("isGrayish", () => {
  // More tests for isGrayish go here
  it("checks if the pixel is gray or not", () => {
    const color = COLORS.WHITE;
    const output = isGrayish(color);
    assert(output);
  });
});

describe("makeGrayish", () => {
  // More tests for makeGrayish go here
  it("if the pixels are not grey they are changed to grey", () => {
    const input = Image.create(10, 10, COLORS.WHITE);
    const output = makeGrayish(input);
    assert(input.getPixel(5, 7)[0] == output.getPixel(5, 7)[0]);
  });
});
