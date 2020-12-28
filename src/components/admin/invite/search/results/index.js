import React, { Component } from 'react';
import { formValueSelector, reduxForm, reset } from 'redux-form';
import { createSelector } from 'reselect';
import BatchButton from './batch-actions/Button';
import { connect } from 'react-redux';
import ResultsTable from './AntResultsTable';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import { CourseActions } from 'configs/constants/permission';
import { getThemeConfig } from 'utils/selectors';
import { schoolTypes } from 'configs/constants';
import Icon from 'components/common/Icon';
import { ButtonType } from 'components/common/primary-button/button-type-constants';

const resultSelectedItemsFieldName = 'selectedItems';

class Results extends Component {
  handleRequestBatchSuccessful = () => {
    const { clearSelectedItems } = this.props;
    clearSelectedItems();
  };

  /**
   * Kiểm tra xem user có được thực hiện thành động intive sinh viên hay không
   * TODO Kiểm tra cả quyền cho trường kiểm enterprise
   * TODO Cần check quyền intive thay vì check quyen của course
   * @returns Boolean
   */
  hasPermissionUpdate = () => {
    const { hasPermission, permissions, node, themeConfig } = this.props;
    const isEnterprise =
      lodashGet(themeConfig, 'type') === schoolTypes.ENTERPRISE;
    if (isEnterprise) {
      return true;
    }
    return (
      hasPermission &&
      hasPermission(
        CourseActions.COURSE_ACTION_UPDATE,
        node && node.iid,
        permissions,
      )
    );
  };

  render() {
    const { selectedItems, searchFormId, searchValues } = this.props;

    const hasPermUpdate = this.hasPermissionUpdate();

    return (
      <div>
        <ResultsTable
          {...this.props}
          checkKey="id"
          fieldName={resultSelectedItemsFieldName}
          hasPermUpdate={hasPermUpdate}
        />
        {/*{hasPermUpdate && (
          <div className="m-t-10">
            <span className="p-t-10 p-r-10">
              <BatchButton
                primary
                searchFormId={searchFormId}
                items={selectedItems}
                label={t1('accept_%s_selected_users', [
                  lodashGet(selectedItems, 'length') || 0,
                ])}
                act="accept"
                requestSuccessful={this.handleRequestBatchSuccessful}
                icon={<Icon icon="check" />}
              />
            </span>
            <span className="p-t-10 p-r-10">
              <BatchButton
                primary
                searchFormId={searchFormId}
                items={selectedItems}
                label={t1('reject_%s_selected_users', [
                  lodashGet(selectedItems, 'length') || 0,
                ])}
                act="reject"
                requestSuccessful={this.handleRequestBatchSuccessful}
                icon={<Icon icon="close" />}
                buttonType={ButtonType.danger}
              />
            </span>
            <span className="p-t-10 p-r-10">
              <BatchButton
                primary
                searchFormId={searchFormId}
                searchValues={searchValues}
                label={t1('accept_all_uses')}
                act="accept"
                icon={<Icon icon="check" />}
              />
            </span>
            <span className="p-t-10 p-r-10">
              <BatchButton
                primary
                searchFormId={searchFormId}
                searchValues={searchValues}
                label={t1('reject_all_uses')}
                act="reject"
                icon={<Icon icon="close" />}
                buttonType={ButtonType.danger}
              />
            </span>
            <span className="p-t-10 p-r-10">
              <BatchButton
                primary
                searchFormId={searchFormId}
                items={selectedItems}
                label={t1('delete_%s_selected_users', [
                  lodashGet(selectedItems, 'length') || 0,
                ])}
                act="delete"
                requestSuccessful={this.handleRequestBatchSuccessful}
                icon={<Icon icon="delete" />}
                buttonType={ButtonType.danger}
              />
            </span>
          </div>
        )}*/}
      </div>
    );
  }
}

const getResultFormIdFromProps = (props) =>
  `sinvite_search_results_${lodashGet(props, 'node.iid')}`;

const connectToRedux = connect(
  createSelector(
    (state, props) => getResultFormIdFromProps(props),
    (state, props) =>
      formValueSelector(getResultFormIdFromProps(props))(
        state,
        resultSelectedItemsFieldName,
      ),
    (state) => getThemeConfig(state),
    (resultFormId, selectedItems, themeConfig) => ({
      form: resultFormId,
      selectedItems,
      themeConfig,
    }),
  ),
  (dispatch, props) => {
    return {
      clearSelectedItems: () =>
        dispatch(reset(getResultFormIdFromProps(props))),
    };
  },
);

export default connectToRedux(reduxForm({})(Results));
