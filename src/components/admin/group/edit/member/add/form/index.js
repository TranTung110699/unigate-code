import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import {
  categoryRelationTypes,
  schoolTypes,
  socialFunctionGroups,
} from 'configs/constants';
import NodeNew from 'components/admin/node/new/index';
import { getThemeConfigSelector } from 'utils/selector';
import groupApiUrls from 'components/admin/group/endpoints';

import allUserRts from 'configs/constants/group-members-relationship-types';
import { extractObject } from 'common/utils/Array';
import schemaEnterprise from './schema/form-enterprise';
import buildSchema from './schema/form-ums';
import UsersListPreview from './UsersListPreview';

class GroupMemberAddForm extends React.Component {
  finalProcessBeforeSubmitForUms = (data) => {
    // const { formValues } = this.props;
    // const group = Object.assign({}, this.props.group);
    //
    // // TODO why do we need the major-related info here??
    // group.faculty = group.faculty || (formValues && formValues.faculty);
    // group.ico = group.ico || (formValues && formValues.ico);
    // group.major = group.major || (formValues && formValues.major);
    // group.training_level = group.training_level || (formValues && formValues.training_level);
    // group.training_mode = group.training_mode || (formValues && formValues.training_mode);

    const { group, extraInfo } = this.props;

    const otherInformation = [];

    if (group && Object.values(socialFunctionGroups).includes(group.type)) {
      const semesterIids =
        (group.semester ? [group.semester] : data.semester) || [];
      const major =
        group.type === socialFunctionGroups.SCHOLARSHIP_CATEGORY
          ? extractObject(group, [
              'faculty',
              'major',
              'ico',
              'training_mode',
              'training_level',
              'semester',
            ])
          : {};

      semesterIids.forEach((semesterIid) => {
        otherInformation.push(
          Object.assign({}, major, { semester: semesterIid }, extraInfo),
        );
      });
    }

    if (
      [
        categoryRelationTypes.ADMISSION,
        categoryRelationTypes.STUDENT_RECOGNITION,
        categoryRelationTypes.FINISHING_SENIOR,
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.EXPULSION_GROUP,
      ].includes(group && group.type)
    ) {
      otherInformation.push(
        Object.assign(
          {},
          extractObject(group, [
            'faculty',
            'major',
            'ico',
            'training_mode',
            'training_level',
            'specialization',
          ]),
          extraInfo,
          data.other_information,
        ),
      );
    }

    if (Array.isArray(otherInformation) && otherInformation.length) {
      data.other_information = otherInformation;
    }

    return data;
  };

  render() {
    const {
      themeConfig,
      users,
      group,
      formid,
      filterset,
      mode,
      selectedUsersMode,
      oldRtModeOfRelation, // old rt mode of relation between user and group (to search) ['pending', 'current', 'redundant']
      oldRtsOfRelation, // old rt mode of relation between user and group (to search) ['pending', 'current', 'redundant']
      newRtOfRelation, // new rt of relation between user and group (to update)
      dialogKey,
      searchFormId,
      requestSuccessful,
      total,
    } = this.props;

    // filter out users with no iid
    const userIids = users
      .map((user) => user && user.iid)
      .filter((user) => !!user);

    let rt;
    if (newRtOfRelation) {
      rt = newRtOfRelation;
    } else if (mode === 'remove') {
      rt = allUserRts.USER_RT_REMOVED;
    } else {
      rt = allUserRts.USER_RT_CURRENT;
    }

    const params = {
      oid: userIids,
      sid: group && group.iid,
      object: 'user',
      subject: 'category',
      type: (group && group.type) || 'user_group',
      old_rt_mode: oldRtModeOfRelation,
      old_rts: oldRtsOfRelation,
      rt,
      // along with invitation & sendMail
      mode,
      selectedUsersMode,
      filterset,
      group,
      total,
    };

    const apiUrl = groupApiUrls.add_members_group_relation;

    if (themeConfig.type === schoolTypes.SIS) {
      const schema = buildSchema({ ...this.props, userIids });
      return (
        <div>
          {group &&
            group.type &&
            [
              categoryRelationTypes.FINISHING_SENIOR,
              categoryRelationTypes.GRADUATING_SENIOR,
            ].includes(group.type) && (
              <div>
                <UsersListPreview {...this.props} />
              </div>
            )}
          <NodeNew
            mode="new"
            step=""
            schema={{
              ...schema,
              finalProcessBeforeSubmit: this.finalProcessBeforeSubmitForUms,
            }}
            hiddenFields={params}
            dialogKey={dialogKey}
            searchFormId={searchFormId}
            closeModal
            alternativeApi={apiUrl}
            formid={formid}
            group={group}
          />
        </div>
      );
    }

    return (
      <div>
        <div>
          <UsersListPreview {...this.props} />
        </div>

        <NodeNew
          dialogKey={dialogKey}
          step=""
          mode="new"
          ntype="user_group"
          params={params}
          schema={schemaEnterprise}
          alternativeApi={apiUrl}
          formid={formid}
          group={group}
          closeModal
          searchFormId={searchFormId}
          requestSuccessful={requestSuccessful}
        />
      </div>
    );
  }
}

GroupMemberAddForm.propTypes = {
  className: PropTypes.string,
  formValues: PropTypes.shape(),
  group: PropTypes.shape(),
};

GroupMemberAddForm.defaultProps = {
  className: '',
  formValues: null,
  group: null,
};

const mapStateToProps = (state, props) => ({
  themeConfig: getThemeConfigSelector(state),
});

export default reduxForm({})(connect(mapStateToProps)(GroupMemberAddForm));
