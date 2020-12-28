import { convertListOfValuesIntoOptionsForFormElement } from 'common/utils/form';
import React from 'react';

export const userSchoolLevels = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  HIGH: 'high',
};

export const userSchoolLevelToShortText = (key) => {
  const map = {
    [userSchoolLevels.PRIMARY]: 'Tiểu học',
    [userSchoolLevels.SECONDARY]: 'THCS',
    [userSchoolLevels.HIGH]: 'THPT',
  };
  return map[key];
};

export const userSchoolLevelToText = (key) => {
  const map = {
    [userSchoolLevels.PRIMARY]: 'Tiểu học',
    [userSchoolLevels.SECONDARY]: 'Trung học cơ sở',
    [userSchoolLevels.HIGH]: 'Trung học phổ thông',
  };
  return map[key];
};

export const userSchoolLevelOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(userSchoolLevels),
    (level) => (
      <span title={userSchoolLevelToText(level)}>
        {userSchoolLevelToShortText(level)}
      </span>
    ),
  );

export const userGrades = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  HIGH: 'high',
};

export const userGradeToText = (key) => {
  const map = {
    [userGrades.PRIMARY]: 'Tiểu học',
    [userGrades.SECONDARY]: 'Trung học cơ sở',
    [userGrades.HIGH]: 'Trung học phổ thông',
  };
  return map[key];
};

export const userGradeToShortText = (key) => {
  const map = {
    [userGrades.PRIMARY]: 'Tiểu học: 1-5',
    [userGrades.SECONDARY]: 'THCS: 6-9',
    [userGrades.HIGH]: 'THPT: 10-12',
  };
  return map[key];
};

export const userGradeOptions = () =>
  convertListOfValuesIntoOptionsForFormElement(
    Object.values(userGrades),
    (grade) => (
      <span title={userGradeToText(grade)}>{userGradeToShortText(grade)}</span>
    ),
  );

export const leaderPositions = {
  LEADER: 'leader',
  VICE_LEADER: 'vice_leader',
  TEACHER: 'teacher',
  CHUYEN_VIEN_PHONG: 'chuyen_vien_phong',
  TRUONG_PHONG_GIAO_DUC: 'truong_phong_giao_duc',
  PHO_PHONG_GIAO_DUC: 'pho_phong_giao_duc',
  CHUYEN_VIEN_SO: 'chuyen_vien_so',
  TRUONG_PHONG_SO: 'truong_phong_so',
  PHO_GIAM_DOC_SO: 'pho_giam_doc_so',
  GIAM_DO_SO: 'giam_do_so',
};

export const leaderPositionToText = (lp) => {
  return {
    [leaderPositions.TEACHER]: 'Giáo viên',
    [leaderPositions.LEADER]: 'Hiệu trưởng',
    [leaderPositions.VICE_LEADER]: 'Phó hiệu trưởng',
    [leaderPositions.CHUYEN_VIEN_PHONG]: 'Chuyên viên phòng',
    [leaderPositions.TRUONG_PHONG_GIAO_DUC]: 'Trưởng phòng giáo dục',
    [leaderPositions.PHO_PHONG_GIAO_DUC]: 'Phó phòng giáo dục',
    [leaderPositions.CHUYEN_VIEN_SO]: 'Chuyên viên Sở',
    [leaderPositions.TRUONG_PHONG_SO]: 'Trưởng phòng Sở',
    [leaderPositions.PHO_GIAM_DOC_SO]: 'Phó giám đốc Sở',
    [leaderPositions.GIAM_DO_SO]: 'Giám đốc Sở',
  }[lp];
};

export const leaderPositionOptions = (orgSubType = null) => {
  let value = [];
  switch (Number.parseInt(orgSubType)) {
    case 2: {
      value = [
        leaderPositions.GIAM_DO_SO,
        leaderPositions.PHO_GIAM_DOC_SO,
        leaderPositions.TRUONG_PHONG_SO,
        leaderPositions.CHUYEN_VIEN_SO,
      ];
      break;
    }
    case 12: {
      value = [
        leaderPositions.TRUONG_PHONG_GIAO_DUC,
        leaderPositions.PHO_PHONG_GIAO_DUC,
        leaderPositions.CHUYEN_VIEN_PHONG,
      ];
      break;
    }
    case 5:
    case 6:
    case 7: {
      value = [
        leaderPositions.LEADER,
        leaderPositions.VICE_LEADER,
        leaderPositions.TEACHER,
      ];
      break;
    }
    default: {
      value = Object.values(leaderPositions);
    }
  }
  return convertListOfValuesIntoOptionsForFormElement(
    value,
    leaderPositionToText,
  );
};
