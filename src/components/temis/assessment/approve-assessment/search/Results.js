import React, { Component } from 'react';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate/index';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';
import Avatar from 'antd/lib/avatar';
import { timestampToDateTimeString } from 'common/utils/Date';
import withTemisConfig from 'common/hoc/withTemisConfig';
import TCNN from './TieuChuanNgheNghiep';
import AssignPeersToAssess from '../assign-peers-to-assessment';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import { connect } from 'react-redux';
import endPoints from '../../endpoints';
import sagaActions from 'actions/node/saga-creators';
import { leaderPositions } from '../../../../../configs/constants/user';

class ProfileResults extends Component {
  divStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };
  raisedButtonStyle = {
    color: '#ffffff',
  };

  render() {
    const { items, assignPeersToAssess, searchFormId, userRoot } = this.props;

    const columns = [
      {
        title: t1('stt'),
        className: 'text-center',
        render: (text, row, index) => index + 1,
      },
      {
        title: t1('name'),
        key: 'name',
        render: (name, item) => {
          return (
            <div>
              {item.avatar && <Avatar src={item.avatar} />}&nbsp;
              <PreviewUserInDialog
                user={item}
                showFullDetailButton={false}
                hiddenItem={['positions']}
              />
            </div>
          );
        },
      },
      {
        title: t1('mail'),
        render: ({ mail }) => mail,
      },
      {
        title: t1('birthday'),
        key: 'birthday',
        render: (birthday, item) => {
          return (
            <div>
              {item.birthday > 0 &&
                timestampToDateTimeString(item.birthday, { showTime: false })}
            </div>
          );
        },
      },
      {
        title: t1('organizations'),
        key: 'user_organizations',
        width: '15%',
        render: (birthday, item) =>
          item.user_organizations &&
          !!item.user_organizations.length && (
            <div>
              <OrganizationsOrPhongBan
                item={item}
                attr={'user_organizations'}
                showParentsInfo
              />
              {Array.isArray(get(item, '__expand.phongbans')) &&
                !!get(item, '__expand.phongbans').length && [
                  <br />,
                  <OrganizationsOrPhongBan item={item} attr={'phongbans'} />,
                ]}
            </div>
          ),
      },
      {
        title: t1('assign_peers_to_assessment'),
        width: '20%',
        render: (row) => {
          return (
            <AssignPeersToAssess
              user={row}
              assignPeersToAssess={assignPeersToAssess}
            />
          );
        },
      },
      get(userRoot, 'leader_position') !== leaderPositions.TEACHER && {
        title: 'TCNN',
        render: ({ assessment_of_peers_assigned_to_assessment, ...user }) => (
          <TCNN
            user={user}
            searchFormId={searchFormId}
            assessmentOfPeersAssignedToAssess={
              assessment_of_peers_assigned_to_assessment
            }
          />
        ),
      },
    ].filter(Boolean);

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        rowKey="id"
        bordered
        pagination={false}
        childrenColumnName={null}
      />
    );
  }
}

const mapStateToProps = () => ({});
const mapDispatchToProps = (dispatch, props) => {
  const { searchFormId } = props;
  return {
    assignPeersToAssess: (
      action = 'assign',
      target,
      peers_assigned,
      rubric_iid,
    ) => {
      dispatch(
        sagaActions.submitFormRequest(null, {
          extraParams: {
            action,
            target,
            rubric_iid,
            peers_assigned,
          },
          url: endPoints.assignToAssess,
          formidToSubmitOnSuccess: searchFormId,
        }),
      );
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTemisConfig(ProfileResults));
