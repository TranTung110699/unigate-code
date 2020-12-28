export const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    var script = document.createElement('script');
    script.src = src;
    script.addEventListener('load', () => {
      resolve();
    });
    script.addEventListener('error', (e) => {
      reject(e);
    });
    document.body.appendChild(script);
  });
};
