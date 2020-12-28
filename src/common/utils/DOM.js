export const smoothScrollTop = (node, value) => {
  let timer = null;
  const timeout = 10;

  if (!node) return;
  let scrollTop = node.scrollTop;
  let valueLeft = value - scrollTop;
  const scrollStep = valueLeft / 20;

  const step = () => {
    scrollTop += scrollStep;
    node.scrollTop = scrollTop;
    const valueLeftBefore = valueLeft;
    valueLeft -= scrollStep;

    if (valueLeftBefore > 0 !== valueLeft > 0 || valueLeft === 0) {
      clearTimeout(timer);
    } else {
      timer = setTimeout(step, timeout);
    }
  };

  if (valueLeft !== 0) {
    timer = setTimeout(step, timeout);
  }
};
