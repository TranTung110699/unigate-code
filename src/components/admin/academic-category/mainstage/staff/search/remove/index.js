import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import actions from 'actions/node/creators';
import sagaActions from 'actions/node/saga-creators';
import { t1 } from 'translate';
import Dialog from './dialog';
import { getSearchFormId } from '../../common/utils';

class AcademicCategoryStaffRemove extends React.Component {
  iconStyle = { fontSize: 20 };
  flatButtonStyle = { minWidth: '43px !important', top: '-7px' };
  cssClass = 'admin-academic-category-staff-remove';

  handleRemoveButtonClick = () => {
    const { item, node, dispatch } = this.props;
    const searchFormId = getSearchFormId(node);
    const url = apiUrls.remove_relation;
    const param = {
      oid: item.iid,
      sid: node.iid,
      object: 'user',
      subject: 'category',
    };
    dispatch(
      sagaActions.submitFormRequest('', {
        extraParams: param,
        url,
        formidToSubmitOnSuccess: searchFormId,
        closeModal: true,
      }),
    );
  };

  handleButtonClick = () => {
    const { item, node, dispatch } = this.props;
    const contentDialog = (
      <Dialog
        onRemoveButtonClick={this.handleRemoveButtonClick}
        onCancelButtonClick={() => {
          dispatch(actions.handleOpenDialog({ openDialog: false }));
        }}
        item={item}
        node={node}
      />
    );
    const optionsProperties = {
      handleClose: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { className, node, item } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    if (!item || !node) {
      return null;
    }

    const title = t1('remove');

    return (
      <span className={componentClassName}>
        <FlatButton
          icon={
            <Icon
              title={title}
              icon={'delete'}
              className="action"
              style={this.iconStyle}
            />
          }
          style={this.flatButtonStyle}
          onClick={this.handleButtonClick}
        />
      </span>
    );
  }
}

AcademicCategoryStaffRemove.propTypes = {
  className: PropTypes.string,
};

AcademicCategoryStaffRemove.defaultProps = {
  className: '',
};

export default connect()(AcademicCategoryStaffRemove);
