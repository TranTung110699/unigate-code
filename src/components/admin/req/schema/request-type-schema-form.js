import { t1 } from 'translate';
import { required } from 'common/validators';
import processorSchema from './processor-schema';
import get from 'lodash.get';
import { requestTypeElement } from './elements';
import Attachments from 'schema-form/elements/attachments';
import RTE from 'schema-form/elements/richtext';

const schema = (formid, values, step, v, props) => ({
  type: requestTypeElement({
    floatingLabelText: t1('group_request_type'),
    validate: [required(t1('group_request_type_cannot_be_empty'))],
    paramsasync: {
      transformData: (data) => {
        if (!Array.isArray(data) || !data.length) {
          return [];
        }
        return data.map((val) => ({
          value: val,
          label: t1(val),
          primaryText: t1(val),
        }));
      },
    },
  }),
  name: {
    type: 'text',
    floatingLabelText: t1('name'),
    validate: [required(t1('name_cannot_be_empty'))],
    floatingLabelFixed: true,
    fullWidth: true,
  },
  attachments: {
    type: Attachments,
    label: t1('attachments'),
    allowDownload: true,
    limit: 1,
    multiple: false,
    fullWidth: true,
  },
  note: {
    type: RTE,
    hintText: t1('note'),
    floatingLabelText: t1('note'),
    defaultValue: '',
    multiLine: true,
    fullWidth: true,
  },
  processor: {
    fullWidth: true,
    type: 'section',
    schema: processorSchema(props),
    title: t1('processor'),
  },
});

const ui = (step, values) => {
  const fields = [
    {
      id: 'default',
      fields: ['type', 'name', 'processor', 'attachments', 'note'],
    },
  ];
  return fields;
};

const layout = {
  new: '',
};

const finalProcessBeforeSubmit = (fullData) => {
  if (get(fullData, 'processor')) {
    const processorTypes = get(fullData, 'processor.type', []) || [];
    if (!processorTypes.includes('org_iids')) {
      fullData.processor.org_iids = [];
    }
    if (!processorTypes.includes('positions')) {
      fullData.processor.positions = [];
    }
    if (!processorTypes.includes('user_iids')) {
      fullData.processor.user_iids = [];
    }
  }
  return fullData;
};

export default {
  schema,
  ui,
  layout,
  finalProcessBeforeSubmit,
};
