import React from 'react';
import PropTypes from 'prop-types';

import SubTopMenuContext from 'common/context/menu/SubMenuTop';

import topMenuSchema from './menu/teacher-menus';
import Search from './search';
import { t1 } from 'translate';

class AssessmentEvidenceTemplate extends React.Component {
  render() {
    return (
      <div>
        <SubTopMenuContext
          schema={topMenuSchema()}
          lastBreadcrumbName={t1('assessment_evidence_template')}
        />
        <Search />
      </div>
    );
  }
}

AssessmentEvidenceTemplate.propTypes = {
  className: PropTypes.string,
};

AssessmentEvidenceTemplate.defaultProps = {
  className: '',
};

export default AssessmentEvidenceTemplate;
