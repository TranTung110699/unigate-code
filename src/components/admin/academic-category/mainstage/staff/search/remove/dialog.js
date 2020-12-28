import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import FlatButton from 'components/common/mui/FlatButton';
import { t1 } from 'translate';
import './dialog.scss';

const keyState = 'academic_category_related_to_user';

class AcademicCategoryStaffRemoveDialog extends React.Component {
  cssClass = 'admin-academic-category-staff-remove-dialog';

  constructor(props) {
    super(props);
    this.state = {
      expandedIids: [],
      checkedIids: [],
    };
  }

  componentWillMount() {
    const { dispatch, item, node } = this.props;
    const url = apiUrls.get_category_tree_related_to_user_from_arbitrary_node;
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState },
        {
          iid: node.iid,
          user_iid: item.iid,
        },
      ),
    );
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
    const { className, node, item, tree } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;
    if (typeof tree === 'undefined' || tree === null) {
      return null;
    }

    const relationsCount = tree.relations_count;

    return (
      <div className={componentClassName}>
        {relationsCount <= 1 ? (
          <h1 className={`${this.cssClass}__title`}>
            {t1('if_you_remove_%s_from_this_list_of_staff', [item.name])}
            .&nbsp;
            {t1('he/she_will_be_entirely_removed_from_the_category')}
            .&nbsp;
            {t1(
              'if_you_do_not_want_that,_please_go_back_and_assign_%s_to_another_categories',
              [item.name],
            )}
            .
          </h1>
        ) : (
          <h1 className={`${this.cssClass}__title`}>
            {t1('do_you_want_to_remove_%s_from_list_of_staff', [item.name])}
          </h1>
        )}
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

AcademicCategoryStaffRemoveDialog.propTypes = {
  className: PropTypes.string,
  dispatch: PropTypes.func,
  item: PropTypes.shape(),
  node: PropTypes.shape(),
  tree: PropTypes.shape(),
};

AcademicCategoryStaffRemoveDialog.defaultProps = {
  className: '',
  dispatch: null,
  item: null,
  node: null,
  tree: null,
};

const mapStateToProps = (state, props) => {
  const tree = state.dataApiResults[keyState];
  return {
    tree,
  };
};

export default connect(mapStateToProps)(AcademicCategoryStaffRemoveDialog);
