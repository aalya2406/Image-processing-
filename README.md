
Image Processing Library
This JavaScript library provides functions for basic image processing operations. It includes functions for mapping colors, applying filters based on conditions, and manipulating image borders. The library is designed to work with images represented using the Image and Color types.
Functions
imageMapCoord(img, func)
Maps a function to each pixel coordinate of the input image.

imageMapIf(img, cond, func)
Maps a function to pixels based on a condition in the input image.

mapWindow(img, xInterval, yInterval, func)
Applies a function to pixels within a specified window of the image.

makeBorder(img, thickness, func)
Applies a function to pixels on the image border.

dimCenter(img, thickness)
Dims the center of the image.

isGrayish(p)
Checks if a color is grayish.

makeGrayish(img)
Converts non-grayish pixels in the image to grayscale.

