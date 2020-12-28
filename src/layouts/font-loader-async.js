import { loadScript } from 'common/utils/script';

let loadFont;

let loadedFonts = [];

const initFont = (font) => {
  if (typeof loadFont === 'undefined') {
    loadFont = loadScript(
      'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js',
    );
  }

  if (loadedFonts.includes(font)) {
    return;
  }
  loadedFonts = loadedFonts.concat([font]);

  loadFont
    .then(() => {
      if (window.WebFont) {
        window.WebFont.load({
          google: {
            families: [font, 'Roboto', 'Droid Sans'],
          },
          timeout: 5000,
        });
      }
    })
    .catch(function() {});
};

export default initFont;
