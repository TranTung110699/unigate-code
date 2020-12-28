import React from 'react';
import SimpleVersion from './simple';
import GroupByTagVersion from './group-by-tag';

const versions = {
  SIMPLE: 'simple',
  GROUP_BY_TAGS: 'group_by_tags',
};

const CoursesOfEnrolmentPlan = ({
  version = window.TAG_COLORS ? versions.GROUP_BY_TAGS : versions.SIMPLE,
  enrolmentPlanIid,
}) => {
  switch (version) {
    case versions.SIMPLE:
      return <SimpleVersion enrolmentPlanIid={enrolmentPlanIid} />;
    case versions.GROUP_BY_TAGS:
      return <GroupByTagVersion enrolmentPlanIid={enrolmentPlanIid} />;
    default:
      return null;
  }
};

export default CoursesOfEnrolmentPlan;
