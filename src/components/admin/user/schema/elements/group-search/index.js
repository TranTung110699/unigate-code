import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import SearchLayout from 'components/admin/group/search';
import { categoryRelationTypes } from 'configs/constants';

class ResultActions extends React.Component {
  cssClass = 'admin-group-selection';

  render() {
    const { onAddChip, type } = this.props;
    return (
      <SearchLayout
        {...this.props}
        //TODO: Use type from props
        type={categoryRelationTypes.FINISHING_SENIOR}
        renderResultActions={(item) =>
          item && (
            <div>
              <RaisedButton
                primary
                icon={<Icon icon="add" />}
                onClick={() => onAddChip({ key: item.name, data: item })}
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
