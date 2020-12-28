import React from 'react';
import Avatar from 'antd/lib/avatar';
import Tooltip from 'antd/lib/tooltip';

/**
 * Get data (node) by iid
 *
 * @param dataList
 * @param iid
 * @returns node
 */
export const getDataByIid = (dataList, iid) => {
  if (!dataList || !iid) {
    return null;
  }
  for (let j = 0; j < dataList.length; j++) {
    if (dataList[j].iid == iid) {
      return dataList[j];
    }
  }
  return null;
};

/**
 * Get list of data (nodes) by iids
 *
 * @param dataList
 * @param iid
 * @returns node
 */
export const getDataByIids = (dataList, iids) => {
  if (!dataList || !iids) {
    return null;
  }
  const result = [];
  for (let j = 0; j < iids.length; j++) {
    const data = getDataByIid(dataList, iids[j]);
    if (data) {
      result.push(data);
    }
  }
  return result;
};

/**
 * Trying to mere 2 array that contain iids are difference
 *
 
 * @param firstListInput
 * @param secondListInput
 *
 * @returns array || []
 */
export const mergeArrAndRejectElementSameIid = (
  firstListInput,
  secondListInput,
) => {
  const firstList = firstListInput || [];
  const secondList = secondListInput || [];

  const diff = [];
  for (let i = 0; i < secondList.length; i++) {
    const r = getDataByIid(firstList, secondList[i].iid);
    if (r === null) {
      diff.push(secondList[i]);
    }
  }
  return [...firstList, ...diff];
};

export const teacherIconStyle = {
  color: '#f56a00',
  backgroundColor: '#fde3cf',
};

/**
 * return the Avatar of teacher
 * @param teacher
 * @returns {*}
 */
export const getTeacherAvatar = (teacher) => {
  let avatar = null;
  let name = teacher.name;
  let phone = teacher.phone || teacher.tel;
  let code = teacher.code || teacher.mail || teacher.lname;

  if (teacher.avatar) {
    avatar = (
      <Avatar src={teacher.avatar} size="small" style={teacherIconStyle} />
    );
  }

  if (!name) {
    avatar = <Avatar icon="user" size="small" style={teacherIconStyle} />;
  } else {
    const namewords = name.split(' ');
    const lastName = namewords[namewords.length - 1];

    avatar = (
      <Avatar size="small" style={teacherIconStyle}>
        {lastName.charAt(0).toUpperCase()}
      </Avatar>
    );
  }
  return (
    <Tooltip title={`${code ? `${code} - ` : ''} ${name} ${phone}`}> {avatar} </Tooltip>
  );
};
