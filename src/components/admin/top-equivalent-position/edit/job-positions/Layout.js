import React from 'react';
import PropTypes from 'prop-types';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import Search from '../../../job-position/search/Layout';
import topMenuSchema from './menuTop';

class JobPositionEquivalentPosition extends React.Component {
  cssClass = 'admin-job-positions';

  render() {
    const { className, node } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    // console.log('JobPositionEquivalentPosition ->>>>>>:', node);
    return (
      <div className={componentClassName}>
        <SubTopMenuContext schema={topMenuSchema(node)} />
        <Search node={node} formid="job_position_search_form" />
      </div>
    );
  }
}

JobPositionEquivalentPosition.propTypes = {
  className: PropTypes.string,
};

JobPositionEquivalentPosition.defaultProps = {
  className: '',
};

export default JobPositionEquivalentPosition;
