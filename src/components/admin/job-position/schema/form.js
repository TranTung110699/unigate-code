import { required } from 'common/validators';
import { slugifier } from 'common/normalizers';
import { t1 } from 'translate';
import { topEquivalentPosition } from 'components/admin/top-equivalent-position/schema/elements';
import { organizations } from 'components/admin/organization/schema/elements';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  return {
    name: {
      type: 'text',
      hintText: t1('name_of_job_position'),
      floatingLabelText: t1('name'),
      validate: [required(t1('name_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
    },
    code: {
      type: 'text',
      hintText: t1('code_of_job_position'),
      floatingLabelText: t1('code'),
      validate: [required(t1('code_cannot_be_empty'))],
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      normalize: slugifier,
    },
    organizations: organizations({
      formid,
      multiple: false,
      label: `${t1('organizations')}`,
      defaultValue: props.orgIids,
      // validate: required(t1('organization_can_not_empty')),
    }),
    top_equivalent_position: topEquivalentPosition({ limit: 1 }),
  };
};

const ui = (step, values) => {
  let fields = [];

  if (values.isMultiLevelEquivalent) {
    fields = ['name', 'code', 'organizations'];
  } else {
    fields = ['name', 'code', 'organizations', 'top_equivalent_position'];
  }

  const config = {
    new: [
      {
        id: 'default',
        fields,
      },
    ],
    edit_job_position: [
      {
        id: 'default',
        fields,
      },
    ],
  };

  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
