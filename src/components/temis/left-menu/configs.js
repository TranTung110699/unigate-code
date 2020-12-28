import React from 'react';
import { t1 } from 'translate';
import {
  editProfile,
  temisAssessments,
  temisDashboard,
  temisEvidence,
  temisReports,
} from '../routes';
import lodashGet from 'lodash.get';
import Icon from 'antd/lib/icon';
import {
  isHieuTruong,
  isLeader,
  isReviewApprover,
} from 'components/admin/user/utils';

const temisConfigs = (user, iconStyle = {}) => {
  return [
    {
      icon: <Icon type="home" style={iconStyle} />,
      id: 'temis-dashboard',
      href: temisDashboard(),
      label: t1('temis_dashboard'),
      navLabel: t1('temis_dashboard'),
    },
    {
      icon: <Icon type="user" style={iconStyle} />,
      id: 'temis-profile',
      href: editProfile(lodashGet(user, 'id')),
      label: t1('temis_profile'),
      navLabel: t1('temis_profile'),
    },
    (!isLeader(user) || isHieuTruong(user)) && {
      icon: <Icon type="book" style={iconStyle} />,
      id: 'temis-evidence',
      href: temisEvidence(),
      label: t1('evidence_documents'),
      navLabel: t1('evidence_documents'),
    },
    !(isLeader(user) && !isHieuTruong(user)) && {
      icon: <Icon type="form" style={iconStyle} />,
      id: 'my-assessment',
      href: temisAssessments('self'),
      label: t1('my_assessments'),
      navLabel: t1('my_assessments'),
    },
    !isLeader(user) && {
      icon: <Icon type="usergroup-add" style={iconStyle} />,
      id: 'peers-assessment',
      href: temisAssessments('peers-assessment'),
      label: t1('peers_assessment'),
      navLabel: t1('peers_assessment'),
    },
    isReviewApprover(user) && {
      icon: <Icon type="check-square" style={iconStyle} />,
      id: 'assess_assessment',
      href: temisAssessments('assess_assessment'),
      label: t1('approve_assessment'),
      navLabel: t1('approve_assessment'),
    },
    isLeader(user) && {
      icon: <Icon type="profile" style={iconStyle} />,
      id: 'assessments-in-organization',
      href: temisAssessments('assessments-in-organization'),
      label: t1('assessments_in_organization'),
      navLabel: t1('assessments_in_organization'),
    },
    {
      icon: <Icon type="file-done" style={iconStyle} />,
      id: 'temis-reports',
      href: temisReports(),
      label: t1('reports'),
      navLabel: t1('reports'),
    },
  ].filter(Boolean);
};

export default temisConfigs;
