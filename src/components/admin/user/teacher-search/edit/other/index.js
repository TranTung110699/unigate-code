import React from 'react';
import PropTypes from 'prop-types';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { t1 } from 'translate';

const actionToggleDataSet = { on: 'true', off: 'false' };

class Index extends React.Component {
  render() {
    const { className, teacher } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <ActionToggle
          label={t1('is_visible')}
          baseURL={routes.url('node_update_user', {
            ...teacher,
            step: 'is_visible',
          })}
          dataSet={actionToggleDataSet}
          value={(teacher && teacher.is_visible) || 'false'}
          name="is_visible"
        />
      </div>
    );
  }
}

Index.propTypes = {
  className: PropTypes.string,
  teacher: PropTypes.shape(),
};

Index.defaultProps = {
  className: '',
  teacher: null,
};

export default Index;
