import React from 'react';
import Tag from 'antd/lib/tag';
import withTemisConfig from 'common/hoc/withTemisConfig';
import DetailOnDialog from 'components/common/detail-on-dialog';
import SearchFormSpeers from './SearchFormSpeers';
import get from 'lodash.get';
import { getTemisConfByUser } from 'common/hoc/withTemisConfig';
import Widget from 'components/common/Widget';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';

const dialogOptionsProperties = ({ name }) => ({
  handleClose: true,
  title: t1('assign_peers_to_assess_of_%s', [name]),
  width: '80%',
});
const AssignPeersToAssess = ({ user, assignPeersToAssess, userRoot }) => {
  const { rubricToAssessment } = getTemisConfByUser(user);

  const peerssAsignedToAssessment = get(
    user,
    'assessment_of_peers_assigned_to_assessment',
    [],
  )
    .map(({ target, peer, final_aggregate_assessment }) => {
      if (
        String(target.iid) === String(peer.iid) ||
        final_aggregate_assessment
      ) {
        return false;
      }
      return peer;
    })
    .filter(Boolean);
  const target = { iid: user.iid, ntype: 'user' };
  return (
    <DetailOnDialog
      dialogKey="edit_assign_peers_to_assess"
      dialogOptionsProperties={dialogOptionsProperties(user)}
      renderPreview={({ showFull }) => {
        return [
          peerssAsignedToAssessment.map(({ iid, name }) => (
            <Tag
              key={iid}
              closable
              onClose={() =>
                assignPeersToAssess(
                  'remove-assign',
                  target,
                  [iid],
                  rubricToAssessment,
                )
              }
            >
              {name}
            </Tag>
          )),
          <Icon icon="plus" className="action" onClick={showFull} />,
        ];
      }}
      renderFull={({ closeDialog }) => {
        return (
          <Widget>
            <SearchFormSpeers
              user={user}
              peerssAsignedToAssessment={peerssAsignedToAssessment}
              userRoot={userRoot}
              assignPeersToAssess={(peersIid) => {
                assignPeersToAssess(
                  'assign',
                  target,
                  peersIid,
                  rubricToAssessment,
                );
                closeDialog();
              }}
            />
          </Widget>
        );
      }}
    />
  );
};

export default withTemisConfig(AssignPeersToAssess);
