import React from 'react';
import { filterObjectKeys } from 'common/utils/object';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { t1 } from 'translate';
import nodeActions from 'actions/node/creators';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import Form from '../add/form/index';
import selectedUsersModes from './configs';
import { createSelector } from 'reselect';
import lodashGet from 'lodash.get';

const addMemberToGroupForm = 'add_members_to_group';

// add One or Multiple members
class UpdateMembership extends React.Component {
  /**
   * Users could come from the button that adds 1 single user in 1 row
   * or multiple users that are selected across table's pagination, which is 'targets' in this sense
   *
   * Or we could be using PERFORM_ALL_MATCHING_RESULTS
   * @param users
   * @param selectedUsersMode
   */
  handleUpdateMemberships = (users, selectedUsersMode) => {
    if (selectedUsersMode !== selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS) {
      if (!Array.isArray(users) || !users.length) return;
    } else {
      // TODO do we need to make sure any conditions met before adding this?
      // otherwise an empty filter might match the whole school's students
    }

    const {
      dispatch,
      group,
      total,
      searchFormId,
      mode,
      newRtOfRelation,
      requestSuccessful,
      prepareDataBeforeSearch,
      extraInfo,
    } = this.props;

    const dialogKey = 'update_membership';
    const contentDialog = (
      <Form
        extraInfo={extraInfo}
        dialogKey={dialogKey}
        group={group}
        users={users}
        formid={addMemberToGroupForm}
        form={addMemberToGroupForm}
        filterset={this.props.searchValues}
        total={total}
        mode={mode}
        selectedUsersMode={selectedUsersMode}
        oldRtModeOfRelation={lodashGet(this.props.searchValues, 'rt_mode')}
        oldRtsOfRelation={lodashGet(this.props.searchValues, 'rt')}
        newRtOfRelation={newRtOfRelation}
        searchFormId={searchFormId}
        requestSuccessful={requestSuccessful}
        prepareDataBeforeSearch={prepareDataBeforeSearch}
      />
    );

    const optionsProperties = {
      // actions,
      title:
        this.props.dialogTitle ||
        (mode === 'add'
          ? t1('add_members')
          : mode === 'update'
          ? t1('update_members_status')
          : t1('remove_members')),
    };

    dispatch(
      nodeActions.handleOpenDialog(
        { contentDialog, optionsProperties },
        dialogKey,
      ),
    );
  };

  render() {
    const {
      targets,
      label,
      item,
      // title,
      // keysSave,
      selectedUsersMode, // if we're adding one user or multiple users at a time
      total,
      mode,
      className,
      primary,
      secondary,
      buttonType,
      icon,
    } = this.props;

    const keysSave = ['id', 'iid', 'name', 'code'];
    const iconClass =
      this.props.iconClass || (mode === 'add' ? 'mi mi-add' : 'ti ti-trash');

    if (
      !selectedUsersMode ||
      selectedUsersMode === selectedUsersModes.PERFORM_ON_ONE_USER
    )
      return (
        <IconButton
          title={label}
          iconClassName={iconClass}
          onClick={(e) => {
            e.preventDefault();
            const filteredItem = filterObjectKeys(item, keysSave);
            this.handleUpdateMemberships([filteredItem], selectedUsersMode);
            e.stopPropagation();
          }}
        />
      );
    else if (
      selectedUsersMode ===
      selectedUsersModes.PERFORM_ON_MULTIPLE_SELECTED_MEMBERS
    )
      return (
        <RaisedButton
          primary={primary}
          secondary={secondary}
          className={className}
          disabled={!targets || !targets.length}
          label={label}
          onClick={() =>
            this.handleUpdateMemberships(targets, selectedUsersMode)
          }
          buttonType={buttonType}
          icon={icon}
        />
      );
    else if (
      selectedUsersMode === selectedUsersModes.PERFORM_ALL_MATCHING_RESULTS
    ) {
      return (
        <RaisedButton
          disabled={!total}
          className={className}
          primary={primary}
          secondary={secondary}
          label={label}
          onClick={() => this.handleUpdateMemberships([], selectedUsersMode)}
          buttonType={buttonType}
          icon={icon}
        />
      );
    }
  }
}

// UpdateMembership.propTypes = {
//   item: a user object,
//   multiple: Boolean, if true => .targets will make sense, else .item will
//   targets: list of users from store,as a result of ticking the rows in the table,
//   formValues: values of the search, which is basically a filterSet
// }

const mapStateToProps = createSelector(
  (state, props) => props.searchFormId,
  (state, props) => props.searchValues,
  (state, props) => getFormValues(props.searchFormId)(state),
  (searchFormId, searchValues, searchFormValues) => ({
    searchValues: searchValues || searchFormValues,
  }),
);

export default connect(mapStateToProps)(UpdateMembership);
