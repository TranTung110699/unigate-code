import { positions } from 'components/admin/job-position/schema/elements';

const schema = (formid, values, step, xpath, props, domainInfo) => {
  const orgIids = Array.isArray(props.orgIids) ? props.orgIids.slice(0, 1) : [];

  return {
    job_position: positions(formid, {}, orgIids, {
      notRequiredOrganization: values.notRequiredOrganization || 0,
      top_equivalent_position_iid: values.top_equivalent_position_iid || 0,
    }),
  };
};

const ui = (step, values) => {
  const config = {
    new_job_position: [
      {
        id: 'default',
        fields: ['job_position'],
      },
    ],
    edit_job_position: [
      {
        id: 'default',
        fields: ['job_position'],
      },
    ],
  };
  return config[step];
};

const layout = {
  new: '',
};

export default { schema, ui, layout };
