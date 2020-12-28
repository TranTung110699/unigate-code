/**
 * Created by hungvo on 19/04/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { submit } from 'redux-form';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { getThemeConfigSelector } from 'utils/selector';
import { schoolTypes } from 'configs/constants';
import actions from 'actions/node/creators';
import ActionToggle from 'components/common/toggle/ActionToggle';
import { Link } from 'react-router-dom';
import routes from 'routes';
import lGet from 'lodash.get';
import get from 'lodash.get';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import StaffList from 'components/common/staff-list';
import DisplayHtml from 'components/common/html';
import { timestampToDateString } from 'common/utils/Date';
import { getConf } from 'utils/selectors/index';
import CourseCellAction from './CourseCellAction';
import ShowMore from '../../../common/html/ShowMoreCategories';
import Status from 'components/common/Status';

let width = {
  code: '10%',
  group: '5%',
  name: '15%',
  staff: '5%',
  status: '10%',
  grade: '10%',
  semester: '10%',
  training_mode: '5%',
  category: '10%',
  organizations: '10%',
  actions: '15%',
};

const label = {
  code: t1('code'),
  information: t1('course_information'),
  time: t1('time'),
  name: t1('name'),
  staff: t1('staff'),
  status: t1('approved'),
  grade: t1('grade'),
  organizations: t1('organizations'),
  actions: t1('actions'),
  edit: t1('edit'),
  preview: t1('preview'),
  titleDel: t1('delete'),
  semester: t1('created_date'),
  category: t1('category'),
  textConfirm: t1('are you sure you want to do this'),
  transcript: t1('transcript'),
  training: t1('training'),
  registering: t1('registering'),
  start: t1('start'),
  approvedTranscript: t1('approved'),
  upload_file: t1('upload_file'),
  major: t1('major'),
};

class Results extends Component {
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

  renderHeaderEnterprise = ({
    width,
    academicCategoriesEnabled,
    readOnly,
    renderActionCell,
    supportedLearningMethods,
  }) => (
    <TableHeader
      displaySelectAll={false}
      enableSelectAll={false}
      adjustForCheckbox={false}
    >
      <TableRow>
        <TableHeaderColumn width={width.name}>{label.name}</TableHeaderColumn>
        <TableHeaderColumn width={width.group}>{t1('group')}</TableHeaderColumn>
        <TableHeaderColumn width={width.staff}>{label.staff}</TableHeaderColumn>
        <TableHeaderColumn width={width.grade}>{t1('grade')}</TableHeaderColumn>
        <TableHeaderColumn width={width.training_mode}>
          {t1('training_mode')}
        </TableHeaderColumn>

        <TableHeaderColumn width={width.semester}>
          {t1('semester')}
        </TableHeaderColumn>
        {academicCategoriesEnabled && (
          <TableHeaderColumn width={width.category}>
            {label.category}
          </TableHeaderColumn>
        )}
        <TableHeaderColumn width={width.status}>
          {label.status}
        </TableHeaderColumn>
      </TableRow>
    </TableHeader>
  );

  renderRowEnterprise = ({
    item,
    width,
    ntypesDeepCloneEnable,
    academicCategoriesEnabled,
    readOnly,
    formid,
    renderActionCell,
    supportedLearningMethods,
  }) => (
    <TableRow
      key={item.id}
      selected={item.selected}
      className={item.status === 'deleted' ? 'searchResultsDeletedRow' : ''}
    >
      <TableRowColumn width={width.name}>
        <Link
          to={routes.url('node_edit', {
            ...item,
            step: 'dashboard',
          })}
        >
          {item.name}
        </Link>
      </TableRowColumn>
      <TableRowColumn width={width.group}>
        {item.__expand && item.__expand.group ? item.__expand.group.name : ''}
      </TableRowColumn>

      <TableRowColumn width={width.staff}>
        <StaffList staff={item.staff} />
      </TableRowColumn>
      <TableRowColumn width={width.grade}>{item.grade}</TableRowColumn>
      <TableRowColumn width={width.training_mode}>
        {item.training_mode}
      </TableRowColumn>

      <TableRowColumn width={width.semester}>
        {item.__expand && item.__expand.semester
          ? item.__expand.semester.name
          : ''}
      </TableRowColumn>
      {academicCategoriesEnabled && (
        <TableRowColumn width={width.category}>
          {this.showCategoriesListMore(item.detail_academic_categories)}
        </TableRowColumn>
      )}

      <TableRowColumn width={width.status}>
        <Status status={item.status} />
      </TableRowColumn>

      {/*
      {(!readOnly || typeof renderActionCell === 'function') && (
        <TableRowColumn width={width.actions}>
          {typeof renderActionCell === 'function' ? (
            renderActionCell(item)
          ) : (
            <CourseCellAction
              item={item}
              ntypesDeepCloneEnable={ntypesDeepCloneEnable}
              formid={formid}
              deepCloneSuccessFul={this.deepCloneSuccessFul}
            />
          )}
        </TableRowColumn>
      )}

         */}
    </TableRow>
  );

  render() {
    const {
      items,
      formid,
      ntypesDeepCloneEnable,
      themeConfig,
      readOnly,
      academicCategoriesEnabled,
      renderActionCell,
      supportedLearningMethods,
    } = this.props;

    return (
      <div className="table-result" style={{ width: '100%' }}>
        <Table style={{ tableLayout: 'auto' }}>
          {this.renderHeaderEnterprise({
            width,
            academicCategoriesEnabled,
            readOnly,
            renderActionCell,
            supportedLearningMethods,
          })}

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {(() => {
              if (!items) return null;
              return items.map((item) =>
                this.renderRowEnterprise({
                  formid,
                  item,
                  width,
                  ntypesDeepCloneEnable,
                  academicCategoriesEnabled,
                  readOnly,
                  renderActionCell,
                  supportedLearningMethods,
                }),
              );
            })()}
          </TableBody>
        </Table>
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
  const themeConfig = getThemeConfigSelector(state);

  return {
    ntypesDeepCloneEnable,
    themeConfig,
    academicCategoriesEnabled: getConf(state).academic_categories_enabled,
    supportedLearningMethods: lGet(
      state,
      'domainInfo.school.supported_learning_methods',
    ),
  };
};

export default connect(mapStateToProps)(Results);
