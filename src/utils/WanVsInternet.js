/**
 * Check access to wan domain via testWanImg
 *
 * @param schoolConfig
 * @param callback
 * @returns {boolean}
 */
export function checkAccessToWanDomain(schoolConfig, callback) {
  const testWanImg =
    schoolConfig && schoolConfig.test_wan_img ? schoolConfig.test_wan_img : '';
  let canAccessToWanDomain = false;
  if (testWanImg) {
    canAccessToWanDomain = imageExists(testWanImg, callback);
  }

  return canAccessToWanDomain;
}

/**
 * Please refer this link to know more
 * https://stackoverflow.com/questions/14651348/checking-if-image-does-exists-using-javascript
 *
 * @param url
 * @param callback
 * @returns {boolean}
 */
export function imageExists(url, callback) {
  const img = new Image();
  img.onload = function() {
    callback(true);
  };
  img.onerror = function() {
    callback(false);
  };
  img.src = url;
}
