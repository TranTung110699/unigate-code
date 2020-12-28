import React from 'react';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import DetailOnDialog from 'components/common/detail-on-dialog';

const dialogOptionsProperties = {
  handleClose: true,
};

const Help = ({ guide }) => {
  if (!guide) return null;

  const icon = (
    <Icon type="question-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
  );

  // extreme case: help on a dialog and only show when you click
  if (guide && guide.click) {
    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <span
            onClick={showFull}
            title={guide.title}
            className="cursor-pointer"
          >
            {icon}
          </span>
        )}
        renderFull={({ closeDialog }) => <div>{guide.content}</div>}
        dialogOptionsProperties={dialogOptionsProperties}
      />
    );
  }

  // by default, return tooltip
  return <Tooltip title={guide}>{icon}</Tooltip>;
};
export default Help;
