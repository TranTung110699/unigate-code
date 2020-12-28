import React, { Component } from 'react';
import get from 'lodash.get';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate/index';
import PreviewUserInDialog from 'components/admin/user/account/common/PreviewInDialog';
import Avatar from 'antd/lib/avatar';
import {
  timestampToDateString,
  timestampToDateTimeString,
} from 'common/utils/Date';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import { editProfile } from 'components/temis/routes';
import withTemisConfig from 'common/hoc/withTemisConfig';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

class ProfileResults extends Component {
  divStyle = {
    marginTop: '20px',
    textAlign: 'center',
  };
  raisedButtonStyle = {
    color: '#ffffff',
  };

  render() {
    const { items } = this.props;
    let { temisConfig } = this.props;
    temisConfig = temisConfig || {};

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
        render: (birthday, item) => {
          return (
            <div>
              {item.user_organizations && item.user_organizations.length ? (
                <OrganizationsOrPhongBan
                  item={item}
                  attr={'user_organizations'}
                  showParentsInfo
                />
              ) : (
                '-'
              )}
            </div>
          );
        },
      },
      {
        title: t1('graded_assessment'),
        className: 'text-center',
        render: ({ assessment }) => {
          if (!assessment || !assessment.final_aggregate_assessment) {
            return null;
          }

          const scale = get(assessment, 'score_scale', []).find(
            ({ id }) => String(id) === String(get(assessment, 'result.final')),
          );

          return (
            <ul>
              <li>{`${t1('graded_assessment')}: ${get(scale, 'name')}`}</li>
              <li>
                {t1('last_updated')}: &ensp;
                <Icon type="clock-circle" antIcon />{' '}
                {timestampToDateString(get(assessment, 'updated_ts'))}
              </li>
            </ul>
          );
        },
      },
      {
        title: 'Hành động',
        className: 'text-center',
        children: [
          {
            title: 'Thông tin hồ sơ',
            className: 'text-center',
            render: (birthday, item) => {
              return (
                <React.Fragment>
                  <div>
                    {item.updated_ts &&
                      timestampToDateTimeString(item.updated_ts)}
                  </div>
                  <div>
                    <Link to={editProfile(item.id)}>
                      <Icon icon="edit" />
                    </Link>
                  </div>
                </React.Fragment>
              );
            },
          },
          {
            title: 'BDTX',
            className: 'text-center',
            render: (birthday, item) => {
              const bdtxData = get(item, '__expand.temis.bdtx');

              return (
                <React.Fragment>
                  {bdtxData ? (
                    <span>
                      <span className="text-success">{t1('done')}</span>
                      <div className="text-muted" title={t1('last_updated')}>
                        <Icon type="clock-circle" antIcon />{' '}
                        {timestampToDateString(
                          get(item, '__expand.temis.bdtx.updated_ts'),
                        )}
                      </div>
                    </span>
                  ) : (
                    <span>{t1('not_done')} </span>
                  )}
                </React.Fragment>
              );
            },
          },
        ],
      },
    ];

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

export default withTemisConfig(ProfileResults);
