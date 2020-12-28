import React, { Component } from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';

const ntypes = [
  'course',
  'syllabus',
  'sco',
  'exercise',
  'question',
  'organization',
];

const schema = {
  schema: {
    ntypes: {
      type: 'multiCheckbox',
      options: ntypes.map((ntype) => ({ value: ntype, label: ntype })),
      floatingLabelText: 'choose ntypes to sync',
      required: true,
    },
    use_job: {
      type: 'checkbox',
      label: 'check this box if you want to run through job',
    },
  },
  ui: () => [
    {
      id: 'id',
      fields: ['ntypes', 'use_job'],
    },
  ],
};

class SyncTcoInfo extends Component {
  render() {
    return (
      <div>
        <h3>{t1('cache_tco_info_to_redis')}</h3>
        <div>
          cache tco info to redis (TCO:$iid)
          <SimpleSubmitForm
            schema={schema}
            alternativeApi={apiUrls.cache_tco_info}
            formid="cache-tco-info"
            submitLabel="sync tco info"
          />
        </div>
      </div>
    );
  }
}

export default SyncTcoInfo;
