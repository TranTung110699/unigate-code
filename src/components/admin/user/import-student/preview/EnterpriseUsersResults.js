import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';

class Results extends Component {
  render() {
    const { items } = this.props;
    const columns = [
      {
        title: t1('stt'),
        key: 'stt',
        render: (text, row, index) => ({
          children: index + 1,
        }),
      },
      {
        title: t1('user'),
        key: 'user',
        render: (text, row) => {
          return (
            <div>
              {row.code && (
                <div>
                  <b>{`${t1('code')} (*)`}: </b>
                  {row.code}
                </div>
              )}
              {row.name && (
                <div>
                  <b>{`${t1('full_name')} (*)`}: </b>
                  {row.name}
                </div>
              )}
              {row.pass && (
                <div>
                  <b>{`${t1('password')} (*)`}: </b>
                  {row.pass}
                </div>
              )}
              {row.birthday && (
                <div>
                  <b>{t1('birthday')}: </b>
                  {row.birthday}
                </div>
              )}
              {row.sex && (
                <div>
                  <b>{t1('gender')}: </b>
                  {row.sex}
                </div>
              )}
              {row.ethnicity && (
                <div>
                  <b>{t1('ethnic')}: </b>
                  {row.ethnicity}
                </div>
              )}
              {row.identification_card && (
                <div>
                  <b>{t1('cmt')}: </b>
                  {row.identification_card}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: t1('contact'),
        key: 'contact',
        render: (text, row) => {
          return (
            <div>
              {row.mail && (
                <div>
                  <b>{`${t1('mail')} (*)`}: </b>
                  {row.mail}
                </div>
              )}
              {row.phone && (
                <div>
                  <b>{t1('phone')}: </b>
                  {row.phone}
                </div>
              )}
              {row.address && (
                <div>
                  <b>{t1('address')}: </b>
                  {row.address}
                </div>
              )}
              {row.province_name && (
                <div>
                  <b>{t1('province')}: </b>
                  {row.province_name}
                </div>
              )}
              {row.district_name && (
                <div>
                  <b>{t1('district')}: </b>
                  {row.district_name}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: t1('academic_background'),
        key: 'academic_background',
        render: (text, row) => {
          return (
            <div>
              {row.academic_rank && (
                <div>
                  <b>{t1('rank')}: </b>
                  {row.academic_rank}
                </div>
              )}
              {row.academic_degree && (
                <div>
                  <b>{t1('degree')}: </b>
                  {row.academic_degree}
                </div>
              )}
              {row.category_name && (
                <div>
                  <b>{t1('categories')}: </b>
                  {row.category_name}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: t1('organization'),
        key: 'organization',
        render: (text, row) => {
          return (
            <div>
              {row.user_organizations && (
                <div>
                  <b>{t1('org')}: </b>
                  {row.user_organizations}
                </div>
              )}
              {row.positions && (
                <div>
                  <b>{t1('job_positions')}: </b>
                  {row.positions}
                </div>
              )}
            </div>
          );
        },
      },
      {
        title: t1('note'),
        key: 'note',
        render: (text, row) => {
          return <div>{row.note}</div>;
        },
      },
      {
        title: t1('is_staff'),
        key: 'is_staff',
        render: (text, row) => {
          return <div>{row.is_staff}</div>;
        },
      },
      {
        title: t1('status'),
        key: 'status',
        render: (text, row) => {
          return (
            <div
              style={{
                color: row && row.err && row.err.length > 0 ? 'red' : 'black',
              }}
            >
              {row.status === 'available' && 'OK'}
              {row.status === 'error' && t1('error')}

              {row.err &&
                row.err.map((error) => (
                  <div>
                    <span>{t1(error.field)}:</span>
                    <span>{t1(error.messages)}</span>
                  </div>
                ))}
            </div>
          );
        },
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        className="enterprise-users-result"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
