import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { categoryRelationTypes, schoolTypes } from 'configs/constants';
import { getFormValues, reduxForm } from 'redux-form';
import { t1 } from 'translate';
import { getThemeConfig } from 'utils/selectors';
import ResultsEnterprise from './ResultsEnterprise';
import ResultsSis from './ResultsSis';
import selectedUsersModes from '../action-buttons/configs';
import GroupMembersActions from '../action-buttons/Actions';
import Tag from 'antd/lib/tag';

class MembersResults extends Component {
  onUserRelationshipChangeWhenPerformOnOneUser = (...params) =>
    this.onUserRelationshipChange(
      selectedUsersModes.PERFORM_ON_ONE_USER,
      ...params,
    );

  onUserRelationshipChangeWhenPerformMultipleSelectedMembers = (...params) =>
    this.onUserRelationshipChange(
      selectedUsersModes.PERFORM_ON_MULTIPLE_SELECTED_MEMBERS,
      ...params,
    );

  onUserRelationshipChangeWhenPerformAllMatchingMembers = (...params) =>
    this.onUserRelationshipChange(
      selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS,
      ...params,
    );

  onUserRelationshipChange = (data) => {
    const { onUserRelationshipChange } = this.props;
    if (
      onUserRelationshipChange &&
      typeof onUserRelationshipChange === 'function'
    ) {
      onUserRelationshipChange(data);
    }
  };

  renderActionCell = (item, extraInfo = {}) => (
    <GroupMembersActions
      {...this.props}
      extraInfo={extraInfo}
      item={item}
      searchFormId={this.props.formid}
      selectedUsersMode={selectedUsersModes.PERFORM_ON_ONE_USER}
      requestSuccessful={this.onUserRelationshipChangeWhenPerformOnOneUser}
    />
  );

  showActions = () => {
    const { group } = this.props;
    if (!group || group.type === categoryRelationTypes.SCHOLARSHIP_CATEGORY) {
      return false;
    }
    if (
      [
        categoryRelationTypes.EXPULSION_GROUP,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.FINISHING_SENIOR,
        categoryRelationTypes.GRADUATING_SENIOR,
      ].includes(group.type) &&
      (!group.major ||
        !group.ico ||
        !group.training_mode ||
        !group.training_level)
    ) {
      return false;
    }
    return true;
  };

  render() {
    const {
      items,
      themeConfig,
      targets,
      // targets, total, form, searchFormId, action
    } = this.props;

    const itemList = items && items.filter((item) => !!item);
    if (!itemList) {
      return null;
    }

    const checkKey = 'id';
    const keysSave = ['id', 'iid', 'name', 'code'];

    const ResultTable =
      themeConfig.type === schoolTypes.SIS ? ResultsSis : ResultsEnterprise;

    return (
      <div className="table-result">
        {this.showActions() && (
          <div className="m-b-10">
            <GroupMembersActions
              {...this.props}
              selectedUsersMode={
                selectedUsersModes.PERFORM_ON_MULTIPLE_SELECTED_MEMBERS
              }
              searchFormId={this.props.formid}
              requestSuccessful={
                this.onUserRelationshipChangeWhenPerformMultipleSelectedMembers
              }
            />
            <GroupMembersActions
              {...this.props}
              selectedUsersMode={
                selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS
              }
              searchFormId={this.props.formid}
              requestSuccessful={
                this.onUserRelationshipChangeWhenPerformAllMatchingMembers
              }
            />
            {targets.length ? (
              <Tag color="magenta">{t1('%d_selected', [targets.length])}</Tag>
            ) : null}
          </div>
        )}

        <ResultTable
          {...this.props}
          checkKey={checkKey}
          keysSave={keysSave}
          itemList={itemList}
          renderActionCell={this.renderActionCell}
        />
      </div>
    );
  }
}

const emptyArray = [];

MembersResults.propTypes = {
  form: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

MembersResults.defaultProps = {
  form: '',
  items: emptyArray,
};

function mapStateToProps(state, props) {
  const { form } = props;
  const formValues = getFormValues(form)(state);

  // targets are the selected users from the select all table
  const targets = (formValues && formValues.targets) || [];

  return {
    targets,
    themeConfig: getThemeConfig(state),
  };
}

export default reduxForm({})(connect(mapStateToProps)(MembersResults));
