import React, { Component } from 'react';
import { t1 } from 'translate';
import sagaActions from 'actions/node/saga-creators';
import groupApiUrls from 'components/admin/group/endpoints';
import RaisedButton from 'components/common/mui/RaisedButton';
import K12GroupDashboard from './K12GroupDashboard';
import Status from './Status';
import Paper from 'components/common/paper';
import Title from 'schema-form/field-set/Title';
import withSchoolConfig from 'common/hoc/withSchoolConfigs';

const styles = {
  minHeight: '150px',
};

class GroupDashboard extends Component {
  rescan(group, mode) {
    const { dispatch } = this.props;

    if (group && group.iid) {
      const url = groupApiUrls.rescan_group;

      const data = { ntype: 'group', iid: group.iid, mode };

      // use fetchNode so it can reuse the logic of updating the group counters to store
      dispatch(
        sagaActions.upsertNodeRequest({ data, apiUrl: url, mode: 'edit' }),
      );
    }
  }

  render() {
    const { group, k12 } = this.props;

    if (k12) {
      return <K12GroupDashboard {...this.props} />;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
            <Paper className={'p-10'}>
              <Title
                title={t1('basic_group_info')}
                className={'text-transform'}
              />
              <div style={styles}>
                <div>
                  {t1('name')}: {group.name}
                </div>
                <div>
                  {t1('type')}:{' '}
                  {group && group.smart
                    ? t1('smart_group')
                    : t1('normal_group')}
                </div>

                <div>
                  {t1('current_members')}: {group && group.current_members}
                </div>
                {group && group.smart ? (
                  <div>
                    {t1('pending_members')}:{' '}
                    {(group && group.pending_members) || 0}
                    <RaisedButton
                      primary
                      onClick={() => this.rescan(group, 'pending')}
                      label={t1('rescan_pending')}
                    />
                  </div>
                ) : null}

                {/*<li>*/}
                {/*{t1('redundant_members')}: {group && group.redundant_members}*/}
                {/*{group &&*/}
                {/*group.smart && (*/}
                {/*<RaisedButton*/}
                {/*primary*/}
                {/*onClick={() => this.rescan(group, 'redundant')}*/}
                {/*label={t1('rescan_redundant')}*/}
                {/*/>*/}
                {/*)}*/}
                {/*</li>*/}

                {group && group.smart ? (
                  <div>
                    {t1('scanning_status')} : {group && group.scanning_status};
                  </div>
                ) : null}
              </div>
            </Paper>
          </div>
          <div className="col-md-3">
            <Paper className={'p-10'}>
              <Title title={t1('group_status')} className={'text-transform'} />
              <div style={styles}>
                <Status node={group} />
              </div>
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default withSchoolConfig(GroupDashboard);
