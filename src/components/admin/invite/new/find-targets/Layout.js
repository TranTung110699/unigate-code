import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import PropTypes from 'prop-types';
import { examSubTypes } from 'configs/constants';
import { isClassGroup, isOfflineExam } from 'common/learn';
import { isEnrolmentPlanCourse } from 'components/admin/node/utils';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import get from 'lodash.get';
import withETEP from 'common/hoc/withETEP';

import Results from './Results';
import ClassGroupResults from './ClassGroupResults';
import OfflineExamResults from './OfflineExamResults';
import EnrolmentPlanCourseResults from './EnrolmentPlanCourseResults';
import schema from './form-filter/schema-form';
import schemaForSearchStudentsInCourseInEp from './form-filter-course-in-ep/schema-form';

const tableKeysSave = ['id', 'iid', 'name'];
const checkKey = 'id';

const getFormId = (props) => props.formid || 'find-target';

class UserInGroupLayout extends Component {
  constructor(props) {
    super(props);
    this.renderResultComponent = this.renderResultComponent.bind(this);
  }

  renderResultComponent(items, props) {
    const { node } = this.props;
    if (isOfflineExam(node)) {
      return <OfflineExamResults items={items} {...props} />;
    }
    if (isClassGroup(node)) {
      return <ClassGroupResults items={items} {...props} />;
    }
    if (isEnrolmentPlanCourse(node)) {
      return <EnrolmentPlanCourseResults items={items} {...props} />;
    }
    return <Results items={items} {...props} />;
  }

  render() {
    const {
      categoryIid,
      node,
      etep_isGVDHSP,
      etep_boGiaoDucVaDaoTaoIid,
      etep_boGiaoDucVaDaoTaoSubType,
      etep_soGiaoDucVaDaoTaoSubType,
    } = this.props;
    let hiddenFields;
    let alternativeApi;

    if (isEnrolmentPlanCourse(node)) {
      hiddenFields = {
        _sand_expand: [
          'relation.r',
          'academic_categories',
          'user_organizations',
        ],
        iid: node.iid,
        category_iid: categoryIid,
        organizationRootIids: etep_isGVDHSP
          ? [etep_boGiaoDucVaDaoTaoIid]
          : undefined,
        organizationSubTypes: etep_isGVDHSP
          ? [etep_boGiaoDucVaDaoTaoSubType, etep_soGiaoDucVaDaoTaoSubType]
          : undefined,
        getOnlyOrganizationWhereUserHasPermission: etep_isGVDHSP ? 0 : 1,
        requireOrganization: etep_isGVDHSP ? 0 : 1,
      };
      alternativeApi = epApiUrls.search_members_in_ep_to_add_to_course;
    } else {
      hiddenFields = Object.assign({}, this.props.hiddenFields, {
        _sand_step: 'students',
        items_per_page: 10,
        category_iid: categoryIid,
      });

      alternativeApi = apiUrls.user_in_group_search_by_skill;
      if (isOfflineExam(node)) {
        if (get(node, 'exam_sub_type') === examSubTypes.ENTERING_SCORES) {
          alternativeApi = apiUrls.user_school_search;
          hiddenFields = {};
        } else if (get(node, 'exam_sub_type') === examSubTypes.FINAL) {
          alternativeApi = apiUrls.get_students_take_final_exam;
        } else {
          alternativeApi = apiUrls.get_students_take_resit_exam;
        }
      }
    }

    if (node.ntype === 'course') {
      delete hiddenFields.major;
      delete hiddenFields.training_mode;
      delete hiddenFields.training_level;
      delete hiddenFields.ico;
    }

    // console.log({hiddenFields});
    return (
      <div>
        <SearchWrapper
          {...this.props}
          schema={
            isEnrolmentPlanCourse(node)
              ? schemaForSearchStudentsInCourseInEp
              : schema
          }
          alternativeApi={alternativeApi}
          formid={getFormId(this.props)}
          tableKeysSave={tableKeysSave}
          checkKey={checkKey}
          hiddenFields={hiddenFields}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
          showSearchButton
        />
      </div>
    );
  }
}

UserInGroupLayout.propTypes = {
  categoryIid: PropTypes.number.isRequired,
};

export default withETEP()(UserInGroupLayout);
