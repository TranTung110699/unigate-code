/**
 * Created by DVN on 9/8/2017.
 */
import axios from 'axios';
import { configs } from 'configs/constants';
import Store from 'store';
import lGet from 'lodash.get';
import { secondsToTimeString } from 'common/utils/Date';
import Request from 'common/network/http/Request';

const youtubeDataApiUrl = 'https://www.googleapis.com/youtube/v3/videos';

const Vimeo = require('vimeo').Vimeo;
function getDetailMatch(match) {
  const res = match.substring(0, match.length - 1) || '00';
  return res.length < 2 ? `0${res}` : res;
}

// return duration allow format --:--
function formatYoutubeDuration(time) {
  const regex = /[^\D]{1,2}[^\W]/g;
  let d = '00',
    h = '00',
    m = '00',
    s = '00',
    reg;

  while ((reg = regex.exec(time)) !== null) {
    if (reg.index === regex.lastIndex) {
      regex.lastIndex++;
    }
    reg.forEach((match) => {
      const key = match.length >= 2 ? match[match.length - 1] : '';
      switch (key) {
        case 'D':
          d = getDetailMatch(match);
          break;
        case 'H':
          h = getDetailMatch(match);
          break;
        case 'M':
          m = getDetailMatch(match);
          break;
        case 'S':
          s = getDetailMatch(match);
          break;
        default:
          break;
      }
    });
  }
  let du = s;
  du = `${m}:${du}`;
  if (h != '00') du = `${h}:${du}`;
  if (d != '00') du = `${d}:${du}`;

  return du;
}

// return duration allow format PT--M--S
function getYoutubeDuration(data) {
  const durationDefault = '';
  if (!data) return durationDefault;
  const items = data.items;
  if (!items || items.length === 0) return durationDefault;
  const item = items[0];
  if (!item) return durationDefault;
  const contentDetails = item.contentDetails;
  if (!contentDetails) return durationDefault;
  return contentDetails.duration;
}

const getYoutubeApiKeyFromState = (state) => {
  state = state || Store.getState();

  return lGet(
    state,
    'domainInfo.conf.youtube_api_key',
    'AIzaSyBBEPhLRuuxFzyrzh3dTAqfh0S6WGgyYGk',
  );
};

const getYoutubeVideoDurationUsingAPI = (videoId, handleDurationVideo) => {
  const youtubeApiKey = getYoutubeApiKeyFromState();

  axios
    .get(youtubeDataApiUrl, {
      params: {
        id: videoId,
        part: 'contentDetails',
        key: youtubeApiKey,
      },
    })
    .then((response) => {
      if (!response || !response.data) return;

      const time = formatYoutubeDuration(getYoutubeDuration(response.data));
      handleDurationVideo(time);
    });
};

export const getYoutubeVideoThumbnailUsingAPI = (videoIds, onResult) => {
  if (!onResult) {
    return;
  }

  if (!Array.isArray(videoIds) || videoIds.length === 0) {
    onResult(null);
    return;
  }

  const youtubeApiKey = getYoutubeApiKeyFromState();

  axios
    .get(youtubeDataApiUrl, {
      params: {
        id: videoIds.join(),
        part: 'snippet',
        key: youtubeApiKey,
      },
    })
    .then((response) => {
      if (!response || !response.data) {
        onResult(null);
        return;
      }

      let thumbnails = {};
      (lGet(response.data, 'items') || []).forEach((item) => {
        thumbnails = {
          ...thumbnails,
          [item.id]: lGet(item, 'snippet.thumbnails'),
        };
      });

      onResult(thumbnails);
    });
};

const getVimeoVideoDurationUsingAPI = (
  vimeoId,
  handleDurationVideo,
  // vimeoApiSettings,
) => {
  // this.setState({rooms: result.result || []});
  const client = new Vimeo(
    configs.VIMEO_CLIENT_ID,
    configs.VIMEO_CLIENT_SECRET,
    configs.VIMEO_ACCESS_TOKEN,
  );

  client.request(
    {
      path: `/videos/${vimeoId}`,
    },
    (err, res) => {
      if (err) {
        console.log({ vimeo_api_error: err });
        // console.log(res);
        // Not allowed with default id,secret, tokens
        // we should try server side solution
        Request.get('/video/vimeo/get-duration', {
          id: vimeoId,
        }).then((data) => {
          if (data.success && data.result) {
            const time = secondsToTimeString(data && data.result.duration);
            handleDurationVideo(time);
          } else {
            // Couldn't fetch duration. reasons could be the user account is not a "PRO" vimeo account yet
            handleDurationVideo('00:00');
          }
        });
      } else {
        // successfully get video duration using default client
        const time = secondsToTimeString(res && res.duration);
        handleDurationVideo(time);
      }
    },
  );
};

export default function getDuration(videoId, type, handleDurationVideo) {
  if (!videoId) return;
  const isYoutube = type && type === 'youtube';

  if (isYoutube) {
    getYoutubeVideoDurationUsingAPI(videoId, handleDurationVideo);
  } else {
    getVimeoVideoDurationUsingAPI(videoId, handleDurationVideo);
  }
}
