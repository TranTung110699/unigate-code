/* eslint-disable react/prop-types,no-unused-vars,jsx-a11y/anchor-is-valid, react/jsx-closing-tag-location */
import React from 'react';
import Avatar from 'components/common/avatar';

export const inviteUrl = (node) => {
  const url =
    node && node.iid
      ? `/admin/${(node.ntype !== 'course' &&
          node.ntype !== 'contest' &&
          node.type) ||
          node.ntype}/${node.iid}/invite/new`
      : '/admin/invite/new';

  return url;
};

export const renderLearnerInformation = ({
  learner,
  size,
  className,
  typeLearner,
  rightIcon,
}) => (
  <div className={className}>
    {typeLearner && (
      <span className="display-learner-type">{typeLearner}: &nbsp;</span>
    )}
    <Avatar user={learner} size={size || 40} />
    <span className="display-learner-name">
      {' '}
      &nbsp;
      {learner.name}
    </span>
    {rightIcon && <span className="pull-right">{rightIcon}</span>}
  </div>
);
