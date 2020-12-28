import React, { Component } from 'react';
import { t1 } from 'translate';
import features from 'feature-flag/features';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import NewForm from 'components/admin/exam-template/new/Form';
import ETNew from './Results-new';
import ETOld from './Results';

const elementCloneExamTemplate = ({
  iid,
  name,
  organizations,
  positions,
  skills,
}) => {
  return (
    <NewForm
      mode="new"
      hiddenFields={{ clone_from: iid }}
      node={{
        name,
        organizations: Array.isArray(organizations)
          ? organizations.map((row) => row && row.iid)
          : [],
        positions: Array.isArray(positions)
          ? positions.map((row) => row && row.iid)
          : [],
        skills,
      }}
      searchFormId="exam_template_search"
    />
  );
};

class Results extends Component {
  render() {
    const { isFeatureEnabled } = this.props;

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      return (
        <ETNew {...this.props} cloneExamTemplate={elementCloneExamTemplate} />
      );
    }

    return <ETOld {...this.props} />;
  }
}

export default withFeatureFlags()(Results);
