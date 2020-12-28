import React from 'react';
import { required } from 'common/validators';
import { t1 } from 'translate';
import AspectsPercentElement from 'components/admin/skill/form/AspectsPercentElement';
import Expiry from 'components/admin/skill/form/Expiry';
import { effortSourcesMultiCheckboxOptions as effortSources } from 'components/admin/skill/form/configs';

const schema = (formid) => {
  return {
    name: {
      type: 'text',
      floatingLabelText: t1('name'),
      defaultValue: '',
      errorText: '',
      fullWidth: true,
      validate: [required(t1("value_is_required_and_can't_be_empty"))],
    },
    aspects_percent: {
      name: 'aspects_percent',
      type: () => (
        <AspectsPercentElement name={'aspects_percent'} formid={formid} />
      ),
      hintText: t1(
        'the_following_skill_aspects_combination_is_considered_as_passed',
      ),
    },
    effort_sources: {
      type: 'multiCheckbox',
      options: effortSources,
      hintText: t1('effort_sources'),
    },
    expiry: {
      type: () => <Expiry name={'expiry'} />,
    },
  };
};

const defaultUI = [
  {
    id: 'row-name',
    fields: ['name'],
  },
  {
    id: 'row-passed-when',
    title: t1('passed_when'),
    subTitle: t1(
      'if_any_aspect_greater_than_0_it_means_that_aspects_must_be_passed',
    ),
    fields: ['aspects_percent'],
  },
  {
    id: 'row-effort-sources',
    title: t1('effort_sources'),
    subTitle: t1(
      'any_of_the_following_effort_sources_can_be_considered_as_passed_for_skill',
    ),
    fields: ['effort_sources'],
  },
  {
    id: 'row-expiry',
    title: t1('skill_validity_over_time'),
    fields: ['expiry'],
  },
];

const ui = {
  new: defaultUI,
  edit: defaultUI,
};

const layout = {
  new: '',
};

export default {
  schema,
  ui,
  layout,
};
