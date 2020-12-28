import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ComponentWithoutContent from 'components/common/utils/ComponentWithoutContent';
import ContestInfo from './ContestInfo';

class ContestsShowByList extends Component {
  render() {
    const { contests, mode } = this.props;
    return (
      <div>
        {!contests || contests.length === 0 ? (
          <ComponentWithoutContent content="upcoming_contests" />
        ) : (
          contests.map((contest) => (
            <ContestInfo contest={contest} mode={mode} {...this.props} />
          ))
        )}
      </div>
    );
  }
}

ContestsShowByList.propTypes = {
  contests: PropTypes.arrayOf(PropTypes.any),
  mode: PropTypes.string,
};

ContestsShowByList.defaultProps = {
  contests: [],
  mode: '',
};

export default ContestsShowByList;
