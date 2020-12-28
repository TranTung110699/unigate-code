import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';
import './dialog.scss';

const keyState = 'organization_related_to_user';

class DepartmentStaffRemoveDialog extends React.Component {
  cssClass = 'admin-organization-staff-remove-dialog';

  constructor(props) {
    super(props);
    this.state = {
      expandedIids: [],
      checkedIids: [],
    };
  }

  handleRemoveButtonClick = () => {
    const { onRemoveButtonClick } = this.props;
    if (typeof onRemoveButtonClick === 'function') {
      onRemoveButtonClick();
    }
  };

  handleCancelButtonClick = () => {
    const { onCancelButtonClick } = this.props;
    if (typeof onCancelButtonClick === 'function') {
      onCancelButtonClick();
    }
  };

  render() {
    const { className, node, item } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    const message = t1('do_you_want_to_remove_%s_from_list_of_staff', [
      `<strong>${item.name}</strong>`,
    ]);

    return (
      <div className={componentClassName}>
        <h1 className={`${this.cssClass}__title`}>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </h1>
        <div>
          <div className={`${this.cssClass}__actions`}>
            <FlatButton
              primary
              onClick={this.handleRemoveButtonClick}
              label={t1('remove')}
            />
            <FlatButton
              secondary
              onClick={this.handleCancelButtonClick}
              label={t1('cancel')}
            />
          </div>
        </div>
      </div>
    );
  }
}

DepartmentStaffRemoveDialog.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  item: PropTypes.shape(),
  node: PropTypes.shape(),
  tree: PropTypes.shape(),
};

DepartmentStaffRemoveDialog.defaultProps = {
  className: '',
  dispatch: null,
  item: null,
  node: null,
  tree: null,
};

const mapStateToProps = (state, props) => ({});

export default connect(mapStateToProps)(DepartmentStaffRemoveDialog);
