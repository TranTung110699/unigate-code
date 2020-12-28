import React from 'react';
import { t1 } from 'translate';
import Attachments from 'schema-form/elements/attachments';
import { allowedFileTypes } from 'common/utils/File';
import videoTypes from './videoTypes';
import VideoTabs from './VideoTabs';
import { VideoActionRender } from '../utils';
import InputFile from 'schema-form/elements/input-file';

const schema = () => ({
  youtube: {
    type: 'socialVideoInput',
    videoType: 'youtube',
    hintText: t1('youtube_video_id'),
    floatingLabelText: t1('youtube_video_id'),
    fullWidth: true,
  },
  vimeo: {
    type: 'socialVideoInput',
    videoType: 'vimeo',
    hintText: t1('vimeo_video_id'),
    floatingLabelText: t1('vimeo_video_id'),
    defaultValue: '',
    fullWidth: true,
  },
  attachments: {
    type: Attachments,
    rootFolder: 'public', // TODO: work out the correct folder
    folder: 'attachments', // TODO: work out the correct folder
    allowDownload: true,
    accept: allowedFileTypes(videoTypes.TYPE_VIDEO),
    limit: 1,
    label: t1(`upload_video_file`),
    fullWidth: true,
    ActionRenderer: VideoActionRender,
  },
  drm_vid: {
    type: 'text',
    hintText: t1('hls_url'),
    floatingLabelText: t1('hls_url'),
    fullWidth: true,
    //TODO
    // format: (value) => value && value.url,
    // normalize: (value) => ({ url: value }),
  },
  et: {
    type: 'text',
    readOnly: true,
  },
});

const ui = () => {
  return [
    {
      id: 'video',
      fields: ['youtube', 'vimeo', 'attachments', 'drm_vid', 'et'],
    },
  ];
};

const layout = { component: VideoTabs, freestyle: true };

export default { schema, ui, layout };
