/**
 * return the hostname portion of a URL
 * http://abc.com/asdfsdf/asdfsadf => "abc.com"
 * @param url
 * @returns {*}
 */
export const extractHostname = (url) => {
  let hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf('//') > -1) {
    hostname = url.split('/')[2];
  } else {
    hostname = url.split('/')[0];
  }

  //find & remove port number
  hostname = hostname.split(':')[0];
  //find & remove "?"
  hostname = hostname.split('?')[0];

  return hostname;
};

/**
 * copy from https://stackoverflow.com/questions/11550790/remove-hostname-and-port-from-url-using-regular-expression
 * @param url
 * @return {*}
 */
export const removeHostname = (url, keepBeginningSlash = true) => {
  let newUrl =
    url && url.replace(/^[a-z]{4,5}\:\/{2}[a-z]{1,}\:[0-9]{1,4}.(.*)/, '$1'); // http or https

  if (newUrl && keepBeginningSlash) {
    newUrl = `/${newUrl}`;
  }

  return newUrl;
};
