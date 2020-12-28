import React from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import CommonDialog from 'components/common/modal/Dialog';
import actions from 'actions/node/creators';
import { connect } from 'react-redux';
import { history } from 'store';
import { aspects } from 'components/admin/skill/configs';
import { isEnrolmentPlanProgram, isRubric } from 'components/admin/node/utils';
import { isExamShift } from 'common/learn';
import { createSelector } from 'reselect';
import {
  getAddBankDialogTitle,
  optionsProperties,
} from 'components/admin/node/edit/metadata-v2/add-item/utils';
import {
  bankDialogTabDisplayTypes,
  getAllowAddPmdRubric,
  getDisplayTypeFromUrl,
} from './utils';

import Bank from './Bank';

/**
 * Dialog content can be scrollable.
 */

class Dialog extends React.PureComponent {
  handleClose = () => {
    // this.setState({open: false});
    const { dispatch } = this.props;
    dispatch(actions.setBankNtype(null, null, null));
    history.push(window.location.pathname);
  };

  /**
   * return 'new_only', 'search_only'
   * @returns {string}
   */
  getDisplayType = () => {
    const {
      pNtype,
      fieldEdit,
      bankDialogNtype,
      editingItemAncestors,
      bankDialogNodeSubtype,
      pSubtype,
    } = this.props;

    if (pNtype === 'exam-template') {
      return bankDialogTabDisplayTypes.NEW_ONLY;
    }

    if (
      bankDialogNtype === 'path' &&
      bankDialogNodeSubtype === 'specialization-program'
    ) {
      return bankDialogTabDisplayTypes.NEW_ONLY;
    }

    if (
      (bankDialogNtype === 'course' &&
        bankDialogNodeSubtype === 'classgroup') ||
      fieldEdit === 'financial'
    ) {
      return bankDialogTabDisplayTypes.SEARCH_ONLY;
    }

    if (fieldEdit === 'rubric' && bankDialogNtype === 'skill') {
      return bankDialogTabDisplayTypes.NEW_ONLY;
    }

    if (
      (Array.isArray(editingItemAncestors) &&
        isRubric(editingItemAncestors[0])) ||
      pSubtype === 'rubric'
    ) {
      return bankDialogTabDisplayTypes.NEW_ONLY;
    }

    if (
      Array.isArray(editingItemAncestors) &&
      isExamShift(editingItemAncestors[0])
    ) {
      return bankDialogTabDisplayTypes.SEARCH_ONLY;
    }

    if (
      Array.isArray(editingItemAncestors) &&
      editingItemAncestors.some(isEnrolmentPlanProgram)
    ) {
      return bankDialogTabDisplayTypes.SEARCH_ONLY;
    }

    return bankDialogTabDisplayTypes.BOTH;
  };

  contentDialog = () => {
    const {
      node,
      pSubtype,
      fieldEdit,
      editingItemIid,
      bankDialogNtype,
      editingItemAncestors,
      bankDialogNodeSubtype,
      options,
      pNtype,
    } = this.props;

    const displayType = this.props.displayType || this.getDisplayType();

    return (
      <Bank
        parentNode={node}
        pNtype={pNtype}
        pSubtype={pSubtype}
        ntype={bankDialogNtype}
        fieldEdit={fieldEdit}
        subType={bankDialogNodeSubtype}
        editingItemIid={editingItemIid || node.iid}
        displayType={displayType}
        editingItemAncestors={editingItemAncestors}
        handleCloseDialog={this.handleClose}
        options={options}
      />
    );
  };

  render() {
    const { node, bankDialogNtype } = this.props;

    if (!bankDialogNtype) {
      return null;
    }

    const displayType = this.props.displayType || this.getDisplayType();
    return (
      <CommonDialog
        handleCloseDialog={this.handleClose}
        contentDialog={this.contentDialog()}
        openDialog={!!bankDialogNtype}
        optionsProperties={optionsProperties(
          getAddBankDialogTitle(node, displayType),
          this.handleClose,
        )}
        dialogKey={`bank_${get(node, 'iid')}_${bankDialogNtype}`}
      />
    );
  }
}

Dialog.propTypes = {
  bankDialogNodeSubtype: PropTypes.string,
  bankDialogNtype: PropTypes.string,
  editingItemIid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fieldEdit: PropTypes.string,
  pSubtype: PropTypes.string,
  editingItemAncestors: PropTypes.array,
  node: PropTypes.shape({
    iid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

Dialog.defaultProps = {
  bankDialogNtype: null,
  bankDialogNodeSubtype: null,
  editingItemIid: '',
  fieldEdit: 'metadata',
  pSubtype: '',
  editingItemAncestors: [],
  node: {
    iid: '',
  },
};

const mapStateToProps = createSelector(
  (state) => state.tree,
  (state) => state.editing || {},
  (nodes, editing) => {
    const {
      bankDialogNtype,
      bankDialogNodeSubtype,
      editingItemIid,
      action,
      itemAncestors,
    } = editing || {};

    const node = get(nodes, editingItemIid);
    const pNtype = get(node, 'ntype');
    const pSubtype = get(node, 'type');

    let options = get(editing, 'options') || {};
    if (bankDialogNtype === 'skill' && bankDialogNodeSubtype === 'rubric') {
      options = {
        ...options,
        hasSelectRubricType: getAllowAddPmdRubric(node),
        hasSelectRubricSubType: 1, //TODO check ums
      };
    } else {
      options = Object.assign({}, options, get(node, 'options'));
    }

    const fieldEdit =
      (editing && editing.fieldEdit) ||
      (action === 'skills' || aspects.includes(action))
        ? action
        : 'metadata';
    const urlPathname = window.location.pathname;
    const editingItemAncestors =
      itemAncestors &&
      itemAncestors.map((item) => (item && nodes[item.iid]) || item);

    const displayType = getDisplayTypeFromUrl(window.location.search);
    return {
      bankDialogNtype,
      bankDialogNodeSubtype,
      editingItemIid,
      urlPathname,
      fieldEdit,
      pNtype,
      pSubtype,
      editingItemAncestors,
      options,
      node,
      displayType,
    };
  },
);

export default connect(mapStateToProps)(Dialog);
