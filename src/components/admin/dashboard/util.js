const convertWidgetsToLayout = (widgets) =>
  widgets &&
  widgets
    .map((item) => {
      if (item == null || typeof item === 'undefined') {
        return null;
      }
      return {
        i: item.id,
        minW: parseInt(item.minWidth, 10) || 4,
        minH: parseInt(item.minHeight, 10) || 2,
        w: parseInt(item.minWidth, 10) || 4,
        h: parseInt(item.minHeight, 10) || 2,
        static: false,
        moved: false,
      };
    })
    .filter((item) => item !== null);

const createCoordinates = (items) => {
  if (!items) return null;

  let cX = 0;
  let cY = 0;
  let maxCH = 0;
  for (let i = 0; i < items.length; i += 1) {
    const item = items[i];
    if (maxCH < item.h) {
      maxCH = item.h;
    }

    if (item.w > 12 - cX) {
      cX = 0;
      cY = maxCH;
      maxCH = 0;
    }

    item.x = cX;
    item.y = cY;
    cX = item.x + item.w;
  }
  return items;
};

export const generateConfigsDefault = (widgets) => {
  let items = convertWidgetsToLayout(widgets);

  items = createCoordinates(items);
  return items;
};
