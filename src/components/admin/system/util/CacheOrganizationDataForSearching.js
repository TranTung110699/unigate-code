import React from 'react';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import SimpleSubmitForm from 'components/common/forms/SimpleSubmitForm';
import { schoolsSelectBox } from 'components/admin/system/common/elements';

const schema = {
  schema: {
    school_slug: schoolsSelectBox({ isRequired: true }),
  },
  ui: () => [
    {
      id: 'id',
      fields: ['school_slug'],
    },
  ],
};

const CacheOrganizationDataForSearching = (props) => {
  return (
    <div>
      <h3>{t1('cache_organization_data_for_searching')}</h3>
      <div className="text-muted">
        Use this when: - after sync organization data from hrms for the first
        time - there are something wrong with the ancestor_iids or acs of
        organizations (you cannot search children of some organizations, ...)
      </div>
      <div>
        <SimpleSubmitForm
          schema={schema}
          hiddenFields={{
            start_again: 1,
          }}
          alternativeApi={apiUrls.cache_organization_data_for_searching}
          formid="cache_organization_data_for_searching"
          submitLabel="cache organization data for searching"
        />
      </div>
    </div>
  );
};

export default CacheOrganizationDataForSearching;
