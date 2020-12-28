const hls = new SigmaManager();

hls.config = {
  keepAudioTrackWhenSwitchLevel: true,
  enableWorker: true,
  stretchShortVideoTrack: true,
};
hls.nativeClient = {
  module: 'sigma_drm_1.1.0.js',
  wasmBaseUrl: `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? ':' + window.location.port : ''
  }/sigma/`,
};
var total = 0,
  p2p = 0;

/*hls.on(SigmaManager.Events.MEDIA_ATTACHED, (e) => {
  console.log('MEDIA_ATTACHED loaded');
});

hls.on(SigmaManager.Events.MANIFEST_LOADED, (e) => {
  console.log('MANIFEST_LOADED loaded');
});

hls.on(SigmaManager.Events.FRAG_LOADED, (e) => {
  console.log('FRAG_LOADED loaded');
});*/

hls.on(SigmaManager.Events.ERROR, (datas) => {
  console.log(datas);
  /*if (onError && typeof onError === 'function') {
      onError(datas);
    }*/
});

window.SigmaManager = SigmaManager;
window.hls = hls;
