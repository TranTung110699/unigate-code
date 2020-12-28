import React, { Component } from 'react';
import { t, t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import { Link } from 'react-router-dom';
import routes from 'routes';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import Html from 'components/common/html';
import { schoolTypes, syllabusSubTypes } from 'configs/constants';
import DeepClone from 'components/admin/node/bank/DeepClone';
import ShowMore from 'components/common/html/ShowMoreCategories';
import StaffList from 'components/common/staff-list';

class Results extends Component {
  showCategoriesList = (list) => {
    if (Array.isArray(list))
      return list.map((category) => (
        <Html content={category.name} key={category.id} />
      ));
    return null;
  };
  showCategoriesListMore = (list) => {
    if (Array.isArray(list)) {
      if (list.length <= 2) {
        return this.showCategoriesList(list);
      }
      return <ShowMore items={list} />;
    }
    return null;
  };
  render() {
    const {
      items,
      formid,
      ntype,
      readOnly,
      schoolType,
      academicCategoriesEnabled,
      renderResultActions,
      enableScormConfig,
      allCreditSyllabusesAreOnlineOnlyConfig,
      creditSyllabusHasTopEquivalentPositionCodeConfig,
      creditSyllabusLevelsConfig,
      ntypesDeepCloneEnable,
      deepCloneSuccessFul,
    } = this.props;

    const hideActionToSupportSearchInputAutoComplete =
      this.props.hideActionToSupportSearchInputAutoComplete || false;

    const isSIS = schoolType && schoolType === schoolTypes.SIS;

    const width = {
      code: '5%',
      staff: '5%',
      level: '5%',
      online_only: '5%',
      job_position_codes: '5%',
      category: '10%',
      name: academicCategoriesEnabled ? '10%' : '20%',
      subType: '5%',
      organizations: '5%',
      prerequisites: isSIS ? '10%' : '5%',
      // equivalent_credits: '10%',
      credit: '5%',
      hours: '5%',
      status: '5%',
      action: '10%',
      remove: '5%',
    };

    if (hideActionToSupportSearchInputAutoComplete) {
      width.action = '5%';
    }

    const label = {
      iid: t1('iid'),
      name: t1('name'),
      staff: t1('staff'),
      online_only: t1('learning_type'),
      subType: t1('sub_type'),
      code: t1('code'),
      category: t1('category'),
      credit: t1('credits'),
      hours: t1('hours'),
      validFrom: t1('valid_from'),
      validTo: t1('valid_to'),
      organizations: t1('organizations'),
      prerequisites: t1('prerequisites'),
      status: t1('status'),
      action: t1('action'),
      editSyllabus: t1('edit_syllabus_label'),
      remove: t1('remove'),
      equivalent_credits: t1('equivalent_credits'),
      level: t1('syllabus_level'),
      job_position_codes: t1('job_position'),
    };

    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    const columns = [
      {
        title: label.code,
        key: 'code',
        dataIndex: 'code',
        width: width.code,
        render: (code, item) => (
          <React.Fragment>
            {code}
            {item.is_clone ? (
              <div>
                <span className="text-muted">
                  ({t('clone_of')} #{item.clone_from})
                </span>
              </div>
            ) : (
              ' '
            )}
          </React.Fragment>
        ),
      },
      {
        title: label.staff,
        key: 'staff',
        dataIndex: 'staff',
        width: width.staff,
        render: (staff) => <StaffList staff={staff} />,
      },
      {
        title: label.name,
        key: 'name',
        dataIndex: 'name',
        width: width.name,
        render: (name, item) => (
          <React.Fragment>
            {name}
            {items.tags && items.tags.length ? (
              <div className="text-muted">{item.tags.join(', ')}</div>
            ) : (
              ''
            )}
          </React.Fragment>
        ),
      },
      ...(!allCreditSyllabusesAreOnlineOnlyConfig
        ? [
            {
              title: label.online_only,
              key: 'online_only',
              dataIndex: 'online_only',
              width: width.online_only,
              render: (online_only) =>
                online_only ? t1('online') : t1('online_and_offline'),
            },
          ]
        : []),
      ...(enableScormConfig
        ? [
            {
              title: label.subType,
              key: 'sub_type',
              dataIndex: 'sub_type',
              width: width.subType,
              render: (subType) =>
                subType === syllabusSubTypes.SYLLABUS_SCORM ? 'SCORM' : null,
            },
          ]
        : []),
      ...(creditSyllabusLevelsConfig
        ? [
            {
              title: label.level,
              key: 'level',
              dataIndex: 'level',
              width: width.level,
              render: (level) => (level ? t1(`syllabus_level_${level}`) : '-'),
            },
          ]
        : []),
      ...(creditSyllabusHasTopEquivalentPositionCodeConfig
        ? [
            {
              title: label.job_position_codes,
              key: 'job_position_codes',
              dataIndex: 'job_position_codes',
              width: width.job_position_codes,
              render: (job_position_codes) =>
                job_position_codes && job_position_codes.length
                  ? job_position_codes.join(',')
                  : null,
            },
          ]
        : []),
      ...(!isSIS
        ? [
            {
              title: label.organizations,
              key: 'organizations',
              dataIndex: 'organizations_name',
              width: width.organizations,
              render: (organizations_name) =>
                organizations_name ? organizations_name.join(',') : null,
            },
          ]
        : []),
      ...(academicCategoriesEnabled
        ? [
            {
              title: label.category,
              key: 'detail_academic_categories',
              dataIndex: 'detail_academic_categories',
              width: width.category,
              render: (detail_academic_categories) =>
                this.showCategoriesListMore(detail_academic_categories),
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
      },
      {
        title: label.status,
        key: 'status',
        dataIndex: 'status',
        width: width.status,
        render: (status) => t1(status),
      },
      ...(!readOnly
        ? [
            {
              title: label.action,
              key: 'action',
              dataIndex: 'ntype',
              width: width.action,
              render: (type, item) =>
                renderResultActions
                  ? renderResultActions(item)
                  : [
                      ...(ntypesDeepCloneEnable.includes(item && type)
                        ? [
                            <DeepClone
                              node={item}
                              className="button-clone"
                              title={t1('deepclone')}
                              iconButton
                              deepCloneSuccessFul={deepCloneSuccessFul}
                            />,
                          ]
                        : []),
                      <Link to={`/admin/credit/${item.iid}/dashboard`}>
                        <IconButton
                          title={label.editSyllabus}
                          iconClassName="mi mi-edit"
                        />
                      </Link>,
                    ],
            },
            {
              title: label.remove,
              key: 'remove',
              width: width.remove,
              render: (item) => (
                <DeleteItem
                  title={label.remove}
                  textConfirm={textConfirm}
                  formid={formid}
                  ntype={ntype}
                  itemId={item.id}
                />
              ),
            },
          ]
        : []),
    ];

    return (
      <div className="table-result">
        <Table
          columns={columns}
          dataSource={items}
          pagination={false}
          className="white-background"
          childrenColumnName={null}
        />
      </div>
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
