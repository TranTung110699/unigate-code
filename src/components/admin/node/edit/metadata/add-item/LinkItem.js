import React from 'react';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import { types as questionTypes } from 'components/admin/question/schema/question-types';

/**
 *
 * @param iid
 * @param ntype
 * @param subType
 * @param bankDialogTabMode
 * @return {string}
 */
export const getLinkToAdd = (iid, ntype, subType, bankDialogTabMode) => {
  const editBaseUrl = window.location.pathname || '/';
  let ret;
  if (subType || subType === questionTypes.TYPE_INTRODUCTION) {
    ret = `${editBaseUrl}?/bank/${iid}/${ntype}/${subType}`;
  } else ret = `${editBaseUrl}?/bank/${iid}/${ntype}`;

  if (bankDialogTabMode) return `${ret}/${bankDialogTabMode}`;
  else return ret;
};

export const labelItemToAdd = (
  { ntype, avatar, label, flatButtonStyle, iconBySubtype },
  showButton = false,
) => {
  if (!['question', 'survey-question'].includes(ntype)) {
    return showButton ? (
      <FlatButton
        fullWidth
        label={label}
        icon={<Icon icon={iconBySubtype} />}
        style={flatButtonStyle}
      />
    ) : (
      <span>
        <Icon icon={iconBySubtype} /> {label}
      </span>
    );
  }
  return (
    <span style={{ textAlign: 'center' }} className="m-r-20">
      <img src={avatar} alt={label} /> <br />
      {label}
    </span>
  );
};

const linkItem = (props) => {
  const { ntype, subType, node, linkStyle, onHandlePopoverClose } = props;

  return (
    <Link
      style={linkStyle}
      to={getLinkToAdd(node && node.iid, ntype, subType)}
      onClick={() => {
        if (typeof onHandlePopoverClose === 'function') {
          onHandlePopoverClose();
        }
      }}
    >
      {labelItemToAdd(props, true)}
    </Link>
  );
};

export default linkItem;
