import React, { Component } from 'react';
import { change, formValueSelector, getFormValues, reset } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ChangeExamShiftButton from 'components/admin/contest/exam-shift/arrange/ChangeExamShiftButton';
import ChangeExamRoundButton from 'components/admin/contest/exam-round/arrange/ChangeExamRoundButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';

import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';

import UserResults from './Results';
import schema from './schema-form';
import { t1 } from 'translate';

const searchFormId = 'user_search';

const resultTableFormId = 'contestants_search_results';
const resultTableFieldName = 'selectedUsers';
const keyOfSelectedUsers = 'id';
const fieldToSaveInSelectedUsers = ['id', 'iid', 'name'];

class UserLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(change('user_search', 'contest_code', null));
    dispatch(change('user_search', 'exam_round', null));
  }

  renderResultComponent(items) {
    const { formid, ntype, contest, examShift } = this.props;

    return (
      <UserResults
        items={items}
        id={formid}
        ntype={ntype}
        form={formid}
        contest={contest}
        examShift={examShift}
        resultTableFormId={resultTableFormId}
        resultTableFieldName={resultTableFieldName}
        fieldToSaveInSelectedUsers={fieldToSaveInSelectedUsers}
        keyOfSelectedUsers={keyOfSelectedUsers}
      />
    );
  }

  handleOnChangeSuccessFull = () => {
    const { dispatch } = this.props;
    dispatch(reset(resultTableFormId));
  };

  render() {
    const {
      contestIid,
      contest,
      selectedUsers,
      searchValues,
      examShift,
    } = this.props;

    const hiddenFields = {
      ntype: 'user',
      _sand_step: 'champion',
      _sand_expand: ['user_organizations', 'positions', 'phongbans'],
    };

    if (contestIid) {
      hiddenFields.contest_iid = contestIid;
    }

    const initialValues =
      examShift && examShift.iid ? { exam_shift_iid: examShift.iid } : {};

    return (
      <div>
        <SearchWrapper
          formid={searchFormId}
          showResult
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton
          schema={schema}
          initialValues={initialValues}
          autoSearchWhenStart={true}
        />
        <div className="m-t-30">
          <span className="m-r-10">
            <ChangeExamShiftButton
              searchFormId={searchFormId}
              selectedUsers={selectedUsers}
              contestIid={contest.iid}
              label={t1('arrange_exam_shift_for_selected_users')}
              dialogTitle={t1('arrange_exam_shift_for_selected_users')}
              requestSuccessful={this.handleOnChangeSuccessFull}
            />
          </span>
          {/*
          <span className="m-r-10">
            <ChangeExamShiftButton
              searchFormId={searchFormId}
              contestCode={contestCode}
              contestIid={contest.iid}
              forAllMatchingUsers
              label={t1('arrange_exam_shift_for_all_matching_users')}
              dialogTitle={t1('arrange_exam_shift_for_all_matching_users')}
              searchValues={searchValues}
            />
          </span>
          */}
          <span className="m-r-10">
            <ChangeExamRoundButton
              searchFormId={searchFormId}
              selectedUsers={selectedUsers}
              contestIid={contest.iid}
              label={t1('arrange_exam_round_for_selected_users')}
              dialogTitle={t1('arrange_exam_round_for_selected_users')}
              requestSuccessful={this.handleOnChangeSuccessFull}
            />
          </span>
          <span className="m-r-10 p-t-15">
            <DeleteItem
              alternativeApi={'/contest/api/remove-contestants'}
              params={{
                contest_iid: contest.iid,
                user_iids:
                  selectedUsers && Array.isArray(selectedUsers)
                    ? selectedUsers.map((user) => user.iid)
                    : [],
              }}
              formid={searchFormId}
              label={t1('remove_selected_contestants_from_contest')}
              icon="delete"
              textConfirm={t1('do_you_want_to_remove_this_contestant?')}
              newButton
              buttonType="danger"
            />
          </span>

          {/*
          <span className="m-r-10">
            <ChangeExamRoundButton
              searchFormId={searchFormId}
              contestCode={contestCode}
              contestIid={contest.iid}
              forAllMatchingUsers
              label={t1('arrange_exam_round_for_all_matching_users')}
              dialogTitle={t1('arrange_exam_round_for_all_matching_users')}
              searchValues={searchValues}
            />
          </span>
             */}
          {/*

          <span className="text-right">
            <ConfirmFinishTask
              ntype="contest"
              className="m-l-10"
              itemIid={contest.iid}
              field="task_list.contestants_list"
              confirmed_status={
                contest &&
                contest.task_list &&
                contest.task_list.contestants_list
              }
              title={
                contest &&
                contest.task_list &&
                contest.task_list.contestants_list
                  ? t1('confirmed_finish_manage_contestants_list')
                  : t1('confirm_finish_manage_contestants_list')
              }
              textConfirm={t1(
                'are_you_sure_you_want_to_mark_done_manage_contestants_list?',
              )}
            />
          </span>
             */}
          <div className="clearfix" />
        </div>
      </div>
    );
  }
}

UserLayout.propTypes = {
  dispatch: PropTypes.func,
  node: PropTypes.shape(),
};

UserLayout.defaultProps = {
  dispatch: null,
  node: null,
};

const mapStateToProps = (state, props) => {
  let contest = {};

  const itemAncestors = state.editing.itemAncestors || [];
  const contestItem = itemAncestors[0] || {};
  const nodes = state.tree;

  if (contestItem.ntype === 'contest') {
    if (contestItem && contestItem.iid && nodes[contestItem.iid]) {
      contest = nodes[contestItem.iid];
    }
  }

  const selectedUsers = formValueSelector(resultTableFormId)(
    state,
    resultTableFieldName,
  );

  const searchValues = getFormValues(searchFormId)(state);

  return {
    contest,
    selectedUsers,
    searchValues,
  };
};

export default connect(mapStateToProps)(UserLayout);
