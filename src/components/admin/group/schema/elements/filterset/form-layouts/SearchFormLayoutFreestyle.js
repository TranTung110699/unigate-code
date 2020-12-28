import React, { Component } from 'react';
import { getFormValues } from 'redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import commonSagaActions from 'actions/saga-creators';
import apiUrls from 'api-endpoints';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import { categoryRelationTypes } from 'configs/constants';
import 'schema-form/layouts/flex.scss';

import FiltersFormSingleUser from './FiltersFormSingleUser';
import K12FiltersFormSingleUser from './K12FiltersFormSingleUser';
import FiltersFormTargetGroup from './FiltersFormTargetGroup';
import getAvailableFilters, {
  editGroupFiltersFormId,
  filtersForSingleUser,
  filtersForTargetGroup,
} from '../utils';
import { isK12 } from 'common/k12';
import { isSearchingWithinGroup } from './utils';

class SearchFormLayoutFreestyle extends Component {
  exportMembersInSeniorGroup() {
    const { dispatch, values } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_members_in_senior_group,
        values,
      ),
    );
  }

  render() {
    const {
      groups,
      message,
      formid,
      availableFilters,
      values,
      submitButton,
      k12,
    } = this.props;

    let hasFiltersForSingleUser;
    let hasFiltersForTargetGroup;

    const showExportButton =
      values &&
      values.group_type &&
      [
        categoryRelationTypes.FINISHING_SENIOR,
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.EXPULSION_GROUP,
      ].includes(values.group_type);

    if (
      availableFilters &&
      availableFilters.length &&
      Array.isArray(availableFilters)
    ) {
      hasFiltersForSingleUser = availableFilters.some(
        (r) => filtersForSingleUser.indexOf(r) >= 0,
      );
      hasFiltersForTargetGroup = availableFilters.some(
        (r) => filtersForTargetGroup.indexOf(r) >= 0,
      );
    }

    // is search is used when we wanna filter live
    // !isSearching is when you wanna add filters for a group only.
    const isSearching = formid !== editGroupFiltersFormId;

    const TheFiltersFormSingleUser = k12
      ? K12FiltersFormSingleUser
      : FiltersFormSingleUser;

    const col2 = isSearching
      ? k12
        ? isSearchingWithinGroup(formid)
          ? 'col-md-3'
          : 'col-md-6'
        : 'col-md-9'
      : 'col-md-12';

    const fieldNamesDefault = get(groups, 'default.fieldNames');
    const fieldsDefault = fieldNamesDefault && Object.keys(fieldNamesDefault);

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className={isSearching ? 'col-md-3' : ''}>
            {groups.others.fieldNames.availableFilters}
          </div>

          <div className={col2}>
            {hasFiltersForSingleUser && (
              <TheFiltersFormSingleUser {...this.props} />
            )}
            {hasFiltersForTargetGroup && (
              <FiltersFormTargetGroup {...this.props} />
            )}
            {Array.isArray(fieldsDefault) &&
              fieldsDefault.length > 0 &&
              fieldsDefault.map((field) => {
                return fieldNamesDefault[field];
              })}
          </div>
        </div>

        {isSearching && (
          <div className="row">
            <div className="col-md-2 submit-btn-col">
              <div>
                {message && <h3>{message}</h3>}
                {submitButton}
                {showExportButton && (
                  <RaisedButton
                    name="export"
                    id="export"
                    label={t1('export')}
                    className="m-l-10"
                    primary
                    icon={<Icon icon={'export'} />}
                    onClick={() => {
                      this.exportMembersInSeniorGroup(values.group_type);
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { formid, xpath } = props;

  const values = getFormValues(formid)(state);
  const availableFilters = getAvailableFilters(values, xpath);

  return {
    values,
    availableFilters,
    k12: isK12(state),
  };
};

export default connect(mapStateToProps)(SearchFormLayoutFreestyle);
