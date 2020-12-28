import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import GenericOrganizationSearch from 'components/admin/organization/search/Layout';
import RaisedButton from 'components/common/mui/RaisedButton';

class ResultActions extends React.Component {
  cssClass = 'admin-organization-result-actions';

  render() {
    const { onAddChip } = this.props;
    return (
      <GenericOrganizationSearch
        {...this.props}
        renderResultActions={(item) =>
          item && (
            <div>
              <RaisedButton
                primary
                icon={<Icon icon="add" />}
                onClick={() => onAddChip(item)}
              />
            </div>
          )
        }
      />
    );
  }
}

ResultActions.propTypes = {
  className: PropTypes.string,
};

ResultActions.defaultProps = {
  className: '',
};

export default ResultActions;
