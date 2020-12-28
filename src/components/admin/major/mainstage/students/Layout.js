import React from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import UserMajor from 'components/admin/user_major/search/Layout';
import { constants, userMajorStatus } from 'configs/constants';
import Results from './Results';

const getSearchFormId = (node) => `major_students_search_${node && node.iid}`;

class Students extends React.PureComponent {
  renderResultComponent = (items) => <Results items={items} />;

  render() {
    const { node } = this.props;
    const hiddenFields = {
      faculty: parseInt(get(node, 'organization', 0)),
      major: parseInt(get(node, 'iid', 0)),
      group_by: 'form-of-training',
    };

    const optionsFilter = {
      statusOptions: constants.userMajorStatusOptions.filter((option) =>
        [
          userMajorStatus.STUDYING,
          userMajorStatus.ON_LEAVE,
          userMajorStatus.PASSED,
          userMajorStatus.FAILED,
          userMajorStatus.CERTIFIED,
        ].includes(option && option.value),
      ),
      displayFields: ['training_mode', 'training_level', 'ico'],
    };

    return (
      <UserMajor
        formid={getSearchFormId(node)}
        hiddenFields={hiddenFields}
        optionsFilter={optionsFilter}
        renderResultComponent={this.renderResultComponent}
      />
    );
  }
}

Students.propTypes = {
  className: PropTypes.string,
};

Students.defaultProps = {
  className: '',
};

export default Students;
