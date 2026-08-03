const { Jimp } = require('jimp');

async function main() {
  const image = await Jimp.read('images/logo-light.png');
  const color = image.getPixelColor(0, 0);
  const rgba = Jimp.intToRGBA(color);
  console.log('logo-light.png top-left:', rgba);

  const image2 = await Jimp.read('images/logo-dark.png');
  const color2 = image2.getPixelColor(0, 0);
  const rgba2 = Jimp.intToRGBA(color2);
  console.log('logo-dark.png top-left:', rgba2);
}

main().catch(console.error);
