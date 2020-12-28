/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { Link } from 'react-router-dom';
import routes from 'routes';
import lGet from 'lodash.get';
import StaffList from 'components/common/staff-list';
import DisplayHtml from 'components/common/html';
import { timestampToDateString } from 'common/utils/Date';
import { getConf } from 'utils/selectors/index';
import CourseCellAction from './CourseCellAction';
import AntdTable from 'antd/lib/table';
import ShowMore from '../../../common/html/ShowMoreCategories';
import Icon from '../../../common/Icon';
import RaisedButton from '../../../common/mui/RaisedButton';
import commonSagaActions from '../../../../actions/saga-creators';
import apiUrls from '../endpoints';

const label = {
  code: t1('code'),
  information: t1('course_information'),
  time: t1('time'),
  name: t1('name'),
  staff: t1('staff'),
  status: t1('approved'),
  learningType: t1('learning_type'),
  organizations: t1('organizations'),
  actions: t1('actions'),
  edit: t1('edit'),
  preview: t1('preview'),
  titleDel: t1('delete'),
  createdDate: t1('created_date'),
  category: t1('category'),
  textConfirm: t1('are you sure you want to do this'),
  transcript: t1('transcript'),
  training: t1('training'),
  registering: t1('registering'),
  start: t1('start'),
  approvedTranscript: t1('approved'),
  upload_file: t1('upload_file'),
  major: t1('major'),
  students: t1('students'),
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRowKeys: [],
    };
  }

  actionToggleReadOnlyLabelSet = { on: 'approved', off: 'queued' };
  actionToggleDataSet = { on: 1, off: 0 };

  deepCloneSuccessFul = () => {
    const { dispatch, formid } = this.props;
    dispatch(submit(formid));
  };

  showCategoriesList = (list) => {
    if (Array.isArray(list))
      return list.map((category) => <DisplayHtml content={category.name} />);
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

  handleExport = () => {
    const { selectedRowKeys } = this.state;
    const { dispatch } = this.props;
    dispatch(
      commonSagaActions.exportDataRequest(
        apiUrls.export_score_of_courses_selected,
        { ids: selectedRowKeys },
      ),
    );
  };

  getColumn = ({
    formid,
    readOnly,
    renderActionCell,
    ntypesDeepCloneEnable,
    supportedLearningMethods,
    academicCategoriesEnabled,
  }) => {
    return [
      {
        title: label.code,
        width: '10%',
        render: ({ code }) => code,
      },
      {
        title: label.name,
        render: (row) => (
          <Link
            to={routes.url('node_edit', {
              ...row,
              step: 'dashboard',
            })}
          >
            {row.name}
          </Link>
        ),
      },
      supportedLearningMethods &&
        !supportedLearningMethods.length && {
          title: label.learningType,
          className: 'text-center',
          render: ({ learning_type }) => t1(learning_type),
        },
      academicCategoriesEnabled && {
        title: label.category,
        render: ({ detail_academic_categories }) =>
          this.showCategoriesListMore(detail_academic_categories),
      },
      {
        title: label.students,
        className: 'text-center',
        render: (row) => lGet(row, '__expand.number_of_students', 0),
      },
      {
        title: label.staff,
        render: ({ staff }) => <StaffList staff={staff} />,
      },
      {
        title: label.organizations,
        render: ({ organizations_name }) =>
          Array.isArray(organizations_name) ? organizations_name.join(',') : '',
      },
      {
        title: label.createdDate,
        render: ({ ts }) => ts && timestampToDateString(ts),
      },
      {
        title: label.status,
        render: (row) => (
          <ActionToggle
            readOnly={readOnly}
            readOnlyLabelSet={this.actionToggleReadOnlyLabelSet}
            hideLabel
            baseURL={routes.url('node_update', {
              ...row,
              step: 'status',
            })}
            dataSet={this.actionToggleReadOnlyLabelSet}
            value={row.status || 'queued'}
            name="status"
          />
        ),
      },
      (!readOnly || typeof renderActionCell === 'function') && {
        title: label.actions,
        render: (row) =>
          typeof renderActionCell === 'function' ? (
            renderActionCell(row)
          ) : (
            <CourseCellAction
              item={row}
              ntypesDeepCloneEnable={ntypesDeepCloneEnable}
              formid={formid}
              deepCloneSuccessFul={this.deepCloneSuccessFul}
            />
          ),
      },
    ].filter(Boolean);
  };

  onSelectChange = (selectedRowKeys) => {
    this.setState({ selectedRowKeys });
  };

  render() {
    const { items, ...props } = this.props;
    const { selectedRowKeys } = this.state;
    const idInCurrentPage = Array.isArray(items)
      ? items.map(({ id }) => id)
      : [];

    return (
      <div className="table-result" style={{ width: '100%' }}>
        <AntdTable
          bordered
          rowKey="id"
          size="middle"
          pagination={false}
          childrenColumnName={null}
          style={{ background: 'white' }}
          columns={this.getColumn(props)}
          dataSource={Array.isArray(items) ? items : []}
          rowSelection={{
            selectedRowKeys,
            hideDefaultSelections: true,
            onChange: this.onSelectChange,
            selections: [
              {
                key: 'select_current_page',
                text: t1('select_data_in_current_page'),
                onSelect: () => {
                  this.setState((state) => {
                    let currentSelectedRowKeys = lGet(
                      state,
                      'selectedRowKeys',
                      [],
                    );
                    currentSelectedRowKeys = currentSelectedRowKeys.concat(
                      idInCurrentPage
                        .map((id) => !currentSelectedRowKeys.includes(id) && id)
                        .filter(Boolean),
                    );

                    return { selectedRowKeys: currentSelectedRowKeys };
                  });
                },
              },
              {
                key: 'invert_current_page',
                text: t1('invert_data_in_current_page'),
                onSelect: () => {
                  this.setState((state) => {
                    let currentSelectedRowKeys = lGet(
                      state,
                      'selectedRowKeys',
                      [],
                    ).filter((id) => !idInCurrentPage.includes(id));
                    return { selectedRowKeys: currentSelectedRowKeys };
                  });
                },
              },
              Array.isArray(selectedRowKeys) &&
                !!selectedRowKeys.length &&
                !selectedRowKeys.every((id) =>
                  idInCurrentPage.includes(id),
                ) && {
                  key: 'remove_all',
                  text: t1('remove_all_data_selected'),
                  onSelect: () => {
                    this.setState(() => ({ selectedRowKeys: [] }));
                  },
                },
            ].filter(Boolean),
          }}
        />
        <RaisedButton
          primary
          disabled={!Array.isArray(selectedRowKeys) || !selectedRowKeys.length}
          onClick={this.handleExport}
          icon={<Icon icon="export" style={{ color: 'white' }} />}
          label={t1('export_score_of_%s_selected_courses', [
            Array.isArray(selectedRowKeys) ? selectedRowKeys.length : 0,
          ])}
          className="m-t-10"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  dispatch: PropTypes.func,
  formid: PropTypes.string,
  ntype: PropTypes.string,
  ntypesDeepCloneEnable: PropTypes.array,
};

Results.defaultProps = {
  items: [],
  dispatch: () => {},
  className: PropTypes.string,
  formid: '',
  ntype: '',
  ntypesDeepCloneEnable: [],
};

const mapStateToProps = (state) => {
  const ntypesDeepCloneEnable =
    state.domainInfo &&
    state.domainInfo.conf &&
    state.domainInfo.conf.ntypes_deep_clone_enable;

  return {
    ntypesDeepCloneEnable,
    academicCategoriesEnabled: getConf(state).academic_categories_enabled,
    supportedLearningMethods: lGet(
      state,
      'domainInfo.school.supported_learning_methods',
    ),
  };
};

export default connect(mapStateToProps)(Results);
