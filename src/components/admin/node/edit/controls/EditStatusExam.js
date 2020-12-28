import React from 'react';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import routes from 'routes';
import ActionToggle from 'components/common/toggle/ActionToggle';
import CheckValidityForm from 'components/admin/contest/check-validity/form';
import { isExam } from 'common/learn';

const ChangeStatusExam = ({ node, readOnly, syllabusIid, noLabel }) => {
  let [noteToCheckValidity, setNodeToCheckValidity] = React.useState(false);

  if (!node || node.ntype !== 'sco' || !isExam(node)) {
    return null;
  }

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <ActionToggle
          readOnly={readOnly}
          baseURL={routes.url('node_update', {
            ...node,
            step: 'status',
            ntype: 'sco',
          })}
          title={t1('update_status')}
          params={{ syllabus: syllabusIid }}
          dataSet={{ on: 'approved', off: 'queued' }}
          value={node.status || 'queued'}
          name="status"
          label
          noLabel={noLabel}
          handleChange={(res) => {
            if (
              res &&
              res.result &&
              res.result.ntype === 'sco' &&
              !res.success
            ) {
              setNodeToCheckValidity(res.result);
              showFull();
            }
          }}
        />
      )}
      renderFull={({ closeDialog }) => {
        return <CheckValidityForm node={noteToCheckValidity} />;
      }}
      dialogOptionsProperties={{
        handleClose: true,

        title: t1('check_validity'),
        modal: true,
        width: '70%',
      }}
    />
  );
};

export default ChangeStatusExam;
