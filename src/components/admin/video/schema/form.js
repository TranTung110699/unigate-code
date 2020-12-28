// const fields = ['name'];
import React from 'react';
import { required } from 'common/validators';
import { input } from 'components/common/forms/schema-fields';
import { t1 } from 'translate';
import Store from 'store';
import { getThemeConfig } from 'utils/selectors';
import { allowedFileTypes } from 'common/utils/File';
import { VideoActionRender, AudioActionRender } from '../utils';
import get from 'lodash.get';
import { itemDuration } from 'components/common/elements/duration';
import RTE from 'schema-form/elements/richtext';

import videoTypes, { templateOptions as videoTypeOptions } from './videoTypes';
import SelectImage from 'schema-form/elements/select-image';
import Attachments from 'schema-form/elements/attachments';
import InputToken from 'schema-form/elements/input-token';
import VideoSchema from './video-schema';

const attachmentTitle = (type) => {
  switch (type) {
    case 'video':
      return t1(`upload_video_file`);
    case 'pdf':
      return t1('upload_pdf');
    default:
      return t1(`add_${type}_file`);
  }
};

const actionRenderByValueType = (type) => {
  switch (type) {
    case 'video':
      return VideoActionRender;
    case 'image': // maybe should show slider
      return AudioActionRender;
    default:
      return null;
  }
};

const schema = (formid, values) => {
  const isVideo = get(values, 'type') === 'video';
  return {
    type: {
      type: SelectImage,
      // hintText: t1('choose_display_template_of_the_lecture'),
      // floatingLabelText: t1('choose_display_template_of_the_lecture'),
      defaultValue: videoTypes.TYPE_VIDEO,
      valueKey: 'value',
      errorText: '',
      options: videoTypeOptions(),
      validate: [required(t1('name_cannot_be_empty'))],
    },
    name: {
      type: 'text',
      fullWidth: true,
      hintText: t1('name_of_lecture'),
      floatingLabelText: t1('enter_name_of_lecture'),
      defaultValue: '',
      // validate: [required(t1('name_cannot_be_empty'))],
      required: true,
    },
    content: {
      type: RTE,
      hintText: t1('lecture_text_content'),
      floatingLabelText: t1('lecture_text_content'),
      defaultValue: '',
      errorText: '',
    },
    description: {
      type: 'text',
      multiLine: true,
      fullWidth: true,
      hintText: t1('lecture_short_description'),
      floatingLabelText: t1('lecture_short_description'),
      defaultValue: '',
      errorText: '',
    },
    videoId: {
      type: 'cascade',
      schema: VideoSchema,
      formid,
    },
    attachments: {
      type: Attachments,
      rootFolder: 'public', // TODO: work out the correct folder
      folder: 'attachments', // TODO: work out the correct folder
      allowDownload: true,
      accept: allowedFileTypes(values.type),
      limit: [
        videoTypes.TYPE_VIDEO,
        videoTypes.TYPE_SWF,
        videoTypes.TYPE_PDF,
      ].includes(values.type)
        ? 1
        : 0,
      label: attachmentTitle(values.type),
      // floatingLabelText: 'Vimeo video id',
      // defaultValue: '',
      fullWidth: true,
      ActionRenderer: actionRenderByValueType(values.type),
    },
    pdf_default_rotate_deg: {
      type: 'select',
      label: t1('pdf_default_rotate'),
      options: [
        {
          value: 0,
          label: t1('no_rotate'),
        },
        {
          value: 90,
          label: t1('rotate_right'),
        },
        {
          value: 270,
          label: t1('rotate_left'),
        },
        {
          value: 180,
          label: t1('rotate_upside_down'),
        },
      ],
    },
    vid: input(t1('youtube_vid_id')),
    svid: input(t1('youtube_video_id_(with_sub)')),
    vimeo_vid: input(t1('vimeo_vid_id')),
    vimeo_svid: input(t1('videmo_video_id_(with_sub)')),
    st: input(t1('video_start_time')),
    et: input(t1('video_end_time')),
    tags: {
      type: InputToken,
      floatingLabelText: t1('tags'),
      fullWidth: true,
    },
    duration: itemDuration({ defaultValue: '03:00' }),
    download_materials: {
      type: Attachments,
      label: t1('download_materials'),
      allowDownload: true,
      multiple: true,
    },
  };
};

const ui = (step, values) => {
  const themeConfig = getThemeConfig(Store.getState());
  const basicFields = ['content', 'tags'];
  if (values.type != 'video') basicFields.push('duration');

  const videoFields = [
    // 'youtube',
    // 'vimeo',
    // 'attachments',
    'videoId',
  ];
  const legacyFields = ['vid', 'svid', 'vimeo_vid', 'vimeo_svid', 'st', 'et'];

  const groups = {
    type: {
      fields: ['type'],
      title: t1('lecture_type'),
      subTitle: t1('choose_display_template_of_the_lecture'),
    },
    name: {
      title: t1('name'),
      fields: ['name'],
    },
    basic: {
      fields: basicFields,
      title: t1('lecture_basic_info'),
    },
    materials: {
      fields: ['download_materials'],
      title: t1('download_materials'),
    },

    video: {
      fields: videoFields,
      title: t1('video'),
    },
    attachments: {
      fields: ['attachments'],
      title: attachmentTitle(values.type),
    },
    pdf: {
      fields: ['pdf_default_rotate_deg'],
      title: t1('pdf_settings'),
      subTitle: t1(
        'some_pdf_files_are_buggy_and_does_note_rotate_properly_on_the_browser_and_you_can_use_this_setting_to_fix_that',
      ),
    },
  };

  let editNew;

  if (values.type === 'text') {
    editNew = [groups.name, groups.basic, groups.materials];
  } else {
    // with attachments
    editNew = [
      groups.name,
      ...(values.type === videoTypes.TYPE_VIDEO
        ? [groups.video]
        : [groups.attachments]),
      // groups.attachments,
      ...(values.type === videoTypes.TYPE_PDF ? [groups.pdf] : []),
      groups.basic,
      groups.materials,
    ];
  }

  const configs = {
    new: editNew,
    edit: [groups.type, ...editNew],
    edit_legacy: [
      {
        fields: legacyFields,
        title: t1('legacy_fields_(v3)'),
        show: false, // by default hide these
      },
    ],
  };

  if (configs[step]) {
    return configs[step];
  }

  return [];
};

const layout = {
  new: 'left_tiny',
};

const finalProcessBeforeSubmit = (fullData) => {
  const { drm_vid, et } = fullData;
  let newFullData = fullData;

  if (drm_vid) {
    newFullData.drm_vid = {
      url: drm_vid,
      et,
    };
  }

  return newFullData;
};

const video = {
  schema,
  ui,
  layout,
  finalProcessBeforeSubmit,
};

export default video;
