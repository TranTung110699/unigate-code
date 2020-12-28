import { t1 } from 'translate';

const videoTypes = {
  TYPE_TEXT: 'text',
  TYPE_VIDEO: 'video',
  TYPE_PDF: 'pdf',
  // TYPE_PPT: 'ppt',//TODO: Apply this feature after research the way to view ppt successully
  TYPE_IMAGE: 'image',
  TYPE_AUDIO: 'audio',
  TYPE_SWF: 'swf',
};

export const templateOptions = () => [
  {
    value: videoTypes.TYPE_VIDEO,
    label: t1('video_lecture'),
    avatar: '/images/lecture-types/video.png',
  },
  {
    value: videoTypes.TYPE_TEXT,
    label: t1('text_lecture'),
    avatar: '/images/lecture-types/text.png',
  },
  {
    value: videoTypes.TYPE_PDF,
    label: t1('pdf_lecture'),
    avatar: '/images/lecture-types/pdf.png',
  },
  {
    value: videoTypes.TYPE_IMAGE,
    label: t1('image_lecture'),
    avatar: '/images/lecture-types/image.png',
  },
  {
    value: videoTypes.TYPE_AUDIO,
    label: t1('audio_lecture'),
    avatar: '/images/lecture-types/video.png',
  },
  {
    value: videoTypes.TYPE_SWF,
    label: t1('swf_lecture'),
    avatar: '/images/lecture-types/swf.png',
  },
];

export default videoTypes;
