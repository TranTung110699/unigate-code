import React from 'react';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
// import apiUrls from 'api-endpoints';
import topEquivalentPositionApiUrls from 'components/admin/top-equivalent-position/endpoints';
import UpdateEquivalentPosition from '../../new/Form';
import schema from '../../schema/form';

class EquivalentPositionInfo extends React.Component {
  cssClass = 'admin-equivalent-position-info';

  render() {
    const { className, node } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <UpdateEquivalentPosition
          mode="edit"
          schema={schema}
          title={t1('edit_equivalent_position')}
          node={node}
          searchFormId="top_equivalent_position_search"
          formid="edit_equivalent_position"
          alternativeApi={
            topEquivalentPositionApiUrls.evn_equivalent_position_update
          }
          step="equivalent_position"
        />
      </div>
    );
  }
}

EquivalentPositionInfo.propTypes = {
  className: PropTypes.string,
};

EquivalentPositionInfo.defaultProps = {
  className: '',
};

export default connect()(EquivalentPositionInfo);
