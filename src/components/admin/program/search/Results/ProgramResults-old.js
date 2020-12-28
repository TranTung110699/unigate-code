import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { t1, t3 } from 'translate';
import { programTypeOptions, schoolTypes } from 'configs/constants';
import FlatButton from 'components/common/mui/FlatButton';
import Icon from 'components/common/Icon';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Table from 'antd/lib/table';
import lGet from 'lodash.get';

const width = {
  iid: '10%',
  name: '15%',
  staff: '5%',
  code: '5%',
  type: '10%',
  organizations: '15%',
  major: '10%',
  credit: '10%',
  hours: '5%',
  // semester_count: '10%',
  status: '5%',
  action: '10%',
};

class ProgramResults extends Component {
  getProgramTypeDisplayText = (value) => {
    const programType = programTypeOptions().find(
      (type) => type.value === value,
    );

    if (!programType) {
      return t3('n/a');
    }

    return programType.label;
  };

  render() {
    const { items, formid, ntype, schoolType } = this.props;

    const isSIS = schoolType && schoolType === schoolTypes.SIS;

    const label = {
      name: t1('name'),
      staff: t1('staff'),
      code: t1('code'),
      type: t1('type'),
      organizations: t1('organizations'),
      credit: t1('credits'),
      hours: t1('hours'),
      major: t1('major'),
      iid: t1('iid'),
      status: t1('status'),
      action: t1('action'),
      editPath: t1('edit_path'),
      remove: t1('remove'),
      textConfirm: t1('are_you_sure_you_want_to_do_this'),
      publishLevel: t1('publish_level'),
      editIcon: <Icon title={this.editPath} icon="edit" />,
      viewIcon: <Icon title={this.editPath} icon="preview" />,
      semesterCountLabel: t1('semester_count'),
    };

    const editLink = (item) => `/admin/program/${item.iid}/children`;
    const viewLink = (item) => `/admin/program/${item.iid}/dashboard`;

    const columns = [
      {
        title: label.code,
        key: 'code',
        dataIndex: 'code',
        width: width.code,
      },
      {
        title: label.name,
        key: 'name',
        dataIndex: 'name',
        width: width.name,
      },
      ...(isSIS
        ? [
            {
              title: label.type,
              key: 'type',
              dataIndex: 'type',
              width: width.type,
              render: (type) => this.getProgramTypeDisplayText(type),
            },
          ]
        : []),
      ...(!isSIS
        ? [
            {
              title: label.organizations,
              key: 'organizations_name',
              dataIndex: 'organizations_name',
              width: width.organizations,
              render: (organizationsName) =>
                organizationsName ? organizationsName.join(',') : null,
            },
          ]
        : []),
      ...(isSIS
        ? [
            {
              title: label.credit,
              key: 'credit',
              dataIndex: 'credit',
              width: width.credit,
            },
          ]
        : []),
      {
        title: label.hours,
        key: 'hours',
        dataIndex: 'hours',
        width: width.hours,
        render: (hours) => (hours ? `${hours} ${t1('hours')}` : ''),
      },
      {
        title: label.status,
        key: 'status',
        dataIndex: 'status',
        width: width.status,
        render: (status) => t1(status),
      },
      {
        title: label.action,
        key: 'action',
        width: width.action,
        render: (item) => (
          <React.Fragment>
            <Link to={viewLink(item)}>
              <FlatButton icon={label.editIcon} />
            </Link>
            <DeleteItem
              title={label.remove}
              textConfirm={label.textConfirm}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          rowClassName={(item) =>
            item.status === 'deleted' ? 'searchResultsDeletedRow' : null
          }
          rowKey="id"
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schoolType: lGet(state, 'domainInfo.school.type'),
});

export default connect(mapStateToProps)(ProgramResults);
