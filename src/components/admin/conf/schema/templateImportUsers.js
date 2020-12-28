import React from 'react';
import { t1 } from 'translate';
import get from 'lodash.get';
import DownloadTemplate from 'components/admin/import-users/DownloadTemplate';
import InputFile from 'schema-form/elements/input-file';

const schema = ({ values, template }) => {
  const fileTemplate = get(values, 'content.template');
  return {
    template: {
      type: InputFile,
      fullWidth: true,
      classWrapper: fileTemplate ? 'col-md-12' : 'col-md-10',
      floatingLabelText: t1('upload_template'),
    },
    defaultTemplate: {
      type: 'cascade',
      classWrapper: 'col-md-2 m-t-30',
      component: (
        <DownloadTemplate
          title={t1('download_template_default')}
          label={t1('download')}
          template={template}
          getDefault
        />
      ),
    },
    required_fields: {
      type: 'multiCheckbox',
      options: 'async',
      fullWidth: true,
      inline: true,
      classWrapper: 'col-md-12',
      floatingLabelText: t1('required_fields'),
      paramsasync: {
        key: fileTemplate,
        __url__: '/template/get-fields-to-imports',
        value: {
          template: fileTemplate,
        },
        transformData: (fields) => {
          if (!Array.isArray(fields) || !fields.length) {
            return [];
          }

          return fields
            .map((filed) => {
              if (!filed) {
                return;
              }
              return {
                value: filed,
                label: t1(filed),
                primaryText: t1(filed),
              };
            })
            .filter(Boolean);
        },
      },
    },
    unique_fields: {
      type: 'multiCheckbox',
      options: 'async',
      fullWidth: true,
      inline: true,
      classWrapper: 'col-md-12',
      floatingLabelText: t1('unique_fields_default'),
      paramsasync: {
        key: fileTemplate,
        __url__: '/template/get-fields-to-imports',
        value: {
          template: fileTemplate,
        },
        transformData: (fields) => {
          if (!Array.isArray(fields) || !fields.length) {
            return [];
          }

          return fields
            .map((filed) => {
              if (!filed) {
                return;
              }
              return {
                value: filed,
                label: t1(filed),
                primaryText: t1(filed),
              };
            })
            .filter(Boolean);
        },
      },
    },
  };
};

const ui = (step, values, themeConfig, xpath) => {
  const template = get(values, 'content.template');
  return [
    {
      id: 'default',
      fields: [
        'template',
        !template && 'defaultTemplate',
        template && template.length > 0 && 'required_fields',
        template && template.length > 0 && 'unique_fields',
      ].filter(Boolean),
    },
  ];
};

export default (template) => ({
  schema: (formid, values) => schema({ template, values }),
  ui,
});
