import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import { reset } from 'redux-form';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { extractObject } from 'common/utils/Array';
import schema from './schema-advance';
import formNames, {
  expandFields,
} from 'components/admin/group/edit/member/configs';
import {
  categoryRelationTypes,
  levelSocialFunctionGroups,
  socialFunctionGroups,
  userMajorStatus,
} from 'configs/constants';
import Results from '../../search-results/Results';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';

const formid = formNames.SEARCH_FORM_WHEN_ADD_MEMBERS;
const resultFormName = formNames.resultFormName;

class UserInGroupLayout extends Component {
  handleSubmit = () => {
    const { dispatch } = this.props;
    dispatch(reset(resultFormName));
  };

  prepareDataBeforeSearch = (values) => {
    let newValues = values;
    if (
      Array.isArray(newValues.finishing_senior_groups) &&
      newValues.finishing_senior_groups.length > 0
    ) {
      newValues = {
        ...newValues,
        finishing_senior_groups: values.finishing_senior_groups.map(
          (finishingSeniorGroup) => finishingSeniorGroup.iid,
        ),
      };
    }

    return newValues;
  };

  renderResultComponent = (items, props, objects, searchValues) => {
    const { group, newRtOfRelation } = this.props;
    const newGroup = Object.assign(
      {},
      extractObject(get(props, 'formValues.major_box'), [
        'major',
        'ico',
        'training_mode',
        'training_level',
        'semester',
        'specialization',
        'type',
      ]),
      group,
    );

    return (
      <Results
        {...props}
        searchValues={searchValues}
        addMemberToGroupForm
        newRtOfRelation={newRtOfRelation}
        prepareDataBeforeSearch={this.prepareDataBeforeSearch}
        form={resultFormName}
        formid={formid}
        items={items}
        group={newGroup}
      />
    );
  };

  render() {
    const { group, themeConfig, includeSubOrg } = this.props;
    if (!group) return null;

    let isScholarshipGroup = false;
    let isGraduationSeniorGroup = false;
    const defaultValues = {};

    switch (get(group, 'type')) {
      case categoryRelationTypes.SCHOLARSHIP_CATEGORY: {
        isScholarshipGroup = true;
        break;
      }
      case categoryRelationTypes.FINISHING_SENIOR:
      case categoryRelationTypes.GRADUATING_SENIOR: {
        defaultValues.major_box = {
          status: [userMajorStatus.STUDYING],
        };
        isGraduationSeniorGroup = true;
        break;
      }
      case categoryRelationTypes.ADMISSION: {
        defaultValues.major_box = {
          status: [
            userMajorStatus.APPLIED,
            userMajorStatus.QUALIFIED,
            userMajorStatus.STUDYING,
          ],
        };
        isGraduationSeniorGroup = true;
        break;
      }
      case categoryRelationTypes.STUDENT_RECOGNITION: {
        defaultValues.major_box = {
          status: [userMajorStatus.QUALIFIED, userMajorStatus.STUDYING],
        };
        break;
      }
      case categoryRelationTypes.EXPULSION_GROUP: {
        defaultValues.major_box = {
          status: [
            userMajorStatus.STUDYING,
            userMajorStatus.ON_LEAVE,
            userMajorStatus.SUSPENSION,
            userMajorStatus.EXPULSION,
          ],
        };
      }
    }

    const hiddenFields = Object.assign(
      {},
      this.props.hiddenFields,
      extractObject(group, [
        'major',
        'ico',
        'training_mode',
        'training_level',
        'semester',
        'type',
      ]),
    );
    if (
      group &&
      group.level === levelSocialFunctionGroups.SEMESTER &&
      Object.values(socialFunctionGroups).includes(group && group.type)
    ) {
      hiddenFields.other_information = 1;
    }

    const hidFields = {
      ...hiddenFields,
      orgIids: group && group.organizations,
      _sand_step: 'students',
      category_iid: group && group.iid,
      add_member_to_group_form: true,
    };
    if (this.props.isEnterprise) {
      hidFields._sand_expand = expandFields;
    }

    const apiUrl = '/user/api/search';
    // const apiUrl = '/group/api/search-non-members';
    return (
      <SearchWrapper
        resetForm
        schema={schema}
        formid={formid}
        {...this.props}
        alternativeApi={apiUrl}
        searchingToAdd
        hiddenFields={hidFields}
        defaultValues={defaultValues}
        showSearchButton={false}
        renderResultsComponent={this.renderResultComponent}
        autoSearchWhenStart={!isScholarshipGroup}
        prepareDataBeforeSearch={this.prepareDataBeforeSearch}
        onSubmit={this.handleSubmit}
        includeSubOrg={includeSubOrg}
      />
    );
  }
}

UserInGroupLayout.propTypes = {
  group: PropTypes.shape(),
};

UserInGroupLayout.defaultProps = {
  group: null,
};
const mapStateToProps = (state, props) => {
  return {
    includeSubOrg: get(
      state,
      `valueFieldsToPopulateDefault.${formid}.include_sub_organizations`,
      1,
    ),
  };
};

export default connect(mapStateToProps)(withSchoolConfigs(UserInGroupLayout));
