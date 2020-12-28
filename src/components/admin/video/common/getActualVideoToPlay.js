import lodashGet from 'lodash.get';
import { getAttachment } from 'components/learn/items/lecture/common';
import { getTimeInSeconds } from 'common/utils/Date';

/**
 * given a video lecture object
 * and a config of what video provider to used
 *
 * return the actual video that gonna be played
 *
 * E.g: if the video lecture specified both youtube and vimeo url
 *    and config to prioritize youtube
 *    -> we will return youtube video
 *
 * @param node
 * @param defaultVideoProvider
 * @return {null|{vimeoId: *, youtubeId: *, startTime: *, endTime: *, url: *}}
 */
const getActualVideoToPlay = ({ video: node, defaultVideoProvider }) => {
  defaultVideoProvider = Object.values(defaultVideoProvider || {});

  const youtubeVideo = lodashGet(node, 'youtube');
  const vimeoVideo = lodashGet(node, 'vimeo');
  const attachment = getAttachment(node);
  const drm_vid = lodashGet(node, 'drm_vid');

  let youtubeId = '';
  let vimeoId = '';
  let startTime = '';
  let endTime = '';
  let url = '';
  let hlsUrl = '';

  if (!node) return null;

  let selectedProvider;

  if (
    lodashGet(youtubeVideo, 'id') ||
    lodashGet(vimeoVideo, 'id') ||
    lodashGet(attachment, 'id') ||
    lodashGet(drm_vid, 'url')
  ) {
    let applicableVideoProviders = [
      lodashGet(youtubeVideo, 'id') ? 'youtube' : undefined,
      lodashGet(vimeoVideo, 'id') ? 'vimeo' : undefined,
      lodashGet(attachment, 'id') ? 'attachments' : undefined,
      lodashGet(drm_vid, 'url') ? 'drm_vid' : undefined,
    ].filter((opt) => opt !== undefined);

    selectedProvider = (defaultVideoProvider || []).find((opt) =>
      applicableVideoProviders.includes(opt),
    );
    switch (selectedProvider) {
      case 'youtube': {
        startTime = youtubeVideo.st || 0;
        endTime = youtubeVideo.et;
        youtubeId = youtubeVideo.id;
        break;
      }
      case 'vimeo': {
        startTime = vimeoVideo.st || 0;
        endTime = vimeoVideo.et;
        vimeoId = vimeoVideo.id;
        break;
      }
      case 'attachments': {
        startTime = attachment.st || 0;
        endTime = attachment.et;
        url = attachment.link;
        break;
      }
      case 'drm_vid': {
        hlsUrl = lodashGet(drm_vid, 'url');
        break;
      }
    }
  } else if (node.svid || node.vid || node.vid_gb || node.vid_us) {
    selectedProvider = 'youtube';
    // Work with old database
    const videoId = node.svid || node.vid || node.vid_gb || node.vid_us;
    [youtubeId, startTime, endTime] = [videoId, node.st, node.et];
  } else if (attachment && attachment.link) {
    selectedProvider = 'attachments';
    url = attachment.link;
  } else if (drm_vid) {
    hlsUrl = lodashGet(drm_vid, 'url');
  } else {
    selectedProvider = 'vimeo';
    const videoId =
      node.vimeo_svid ||
      node.vimeo_vid ||
      node.vimeo_vid_gb ||
      node.vimeo_vid_us;

    [vimeoId, startTime, endTime] = [videoId, node.st, node.et];
  }

  const startTimeInSeconds = getTimeInSeconds(startTime);
  const endTimeInSeconds = getTimeInSeconds(endTime);

  return {
    youtubeId,
    vimeoId,
    url,
    startTime: startTimeInSeconds,
    endTime: endTimeInSeconds,
    selectedProvider,
    hlsUrl,
  };
};

export default getActualVideoToPlay;
