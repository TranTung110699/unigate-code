/* eslint-disable react/prop-types,no-undef */
import React, { Component } from 'react';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'routes';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import { submit } from 'redux-form';
import DeepClone from 'components/admin/node/bank/DeepClone';
import Icon from 'components/common/Icon';
import { getThemeConfigSelector } from 'utils/selector';
import DisplayHtml from 'components/common/html';
import { timestampToDateString } from 'common/utils/Date';
import { getConf } from 'utils/selectors/index';
import { schoolTypes, syllabusSubTypes } from 'configs/constants';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { enableScorm } from 'common/conf';

import UpdateForm from '../new/Form';
import ShowMore from '../../../common/html/ShowMoreCategories';

class Results extends Component {
  spanStyle = {
    marginLeft: '.2em',
  };

  actionToggleDataSet = { on: 'approved', off: 'queued' };

  updateItem(item) {
    const { dispatch } = this.props;

    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('edit_syllabus')}
        node={item}
        step=""
        formid="edit_syllabus"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('edit_syllabus'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

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
  render() {
    const {
      items,
      formid,
      ntype,
      originalType,
      ntypesDeepCloneEnable,
      isSIS,
      academicCategoriesEnabled,
      enableScorm,
    } = this.props;

    const nameLabel = t1('name');
    const statusLabel = t1('status');
    const subTypeLabel = t1('sub_type');
    const categoriesLabel = t1('categories');
    const organizationsLabel = t1('organizations');
    const createDateLabel = t1('created_date');
    const actionLabel = t1('action');
    const editSyllabusLabel = t1('edit_syllabus_label');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    const setWidth = () => {
      if (isSIS && academicCategoriesEnabled) {
        return '20%';
      } else if (isSIS && !academicCategoriesEnabled) {
        return '30%';
      } else if (!isSIS && academicCategoriesEnabled) {
        return '35%';
      }
      return '45%';
    };
    const width = {
      iid: '10%',
      name: setWidth(),
      status: '10%',
      organizations: '15%',
      categories: '10%',
      action: '15%',
      subType: '10%',
      createDate: '10%',
    };

    const hasScorm = originalType !== 'syllabus_exam' && enableScorm;

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.iid}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.name}>
                {nameLabel}
              </TableHeaderColumn>
              {hasScorm && (
                <TableHeaderColumn width={width.subType}>
                  {subTypeLabel}
                </TableHeaderColumn>
              )}
              {!isSIS && (
                <TableHeaderColumn width={width.organizations}>
                  {organizationsLabel}
                </TableHeaderColumn>
              )}
              {academicCategoriesEnabled &&
                originalType !== 'syllabus_exam' && (
                  <TableHeaderColumn width={width.categories}>
                    {categoriesLabel}
                  </TableHeaderColumn>
                )}
              <TableHeaderColumn width={width.createDate}>
                {createDateLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.status}>
                {statusLabel}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.action}>
                {actionLabel}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  className={
                    item.status === 'deleted' && 'searchResultsDeletedRow'
                  }
                >
                  <TableRowColumn width={width.iid}>
                    <Link
                      to={routes.url('edit_item', {
                        base: '',
                        item: {
                          ntype: 'syllabus',
                          iid: item.iid,
                          step: 'dashboard',
                        },
                      })}
                    >
                      {item.code || item.slug}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn title={item.name} width={width.name}>
                    <Link
                      to={routes.url('edit_item', {
                        base: '',
                        item: {
                          ntype: 'syllabus',
                          iid: item.iid,
                          step: 'dashboard',
                        },
                      })}
                    >
                      {item.name}{' '}
                      <span className="text-muted">({item.iid})</span>
                    </Link>
                    {item.is_clone ? (
                      <span className="text-muted" style={this.spanStyle}>
                        ({t('clone_of')}
                        <Link
                          className="text-muted"
                          to={routes.url('edit_item', {
                            base: '',
                            item: { ntype: 'syllabus', iid: item.clone_from },
                          })}
                          style={this.spanStyle}
                        >
                          #{item.clone_from}
                        </Link>
                        )
                      </span>
                    ) : (
                      ''
                    )}
                  </TableRowColumn>
                  {hasScorm && (
                    <TableRowColumn width={width.subType}>
                      {item.sub_type === syllabusSubTypes.SYLLABUS_SCORM &&
                        'SCORM'}
                    </TableRowColumn>
                  )}
                  {!isSIS && (
                    <TableRowColumn width={width.organizations}>
                      {item.organizations_name.join(',')}
                    </TableRowColumn>
                  )}
                  {academicCategoriesEnabled &&
                    originalType !== 'syllabus_exam' && (
                      <TableRowColumn width={width.categories}>
                        {this.showCategoriesListMore(
                          item.detail_academic_categories,
                        )}
                      </TableRowColumn>
                    )}
                  <TableRowColumn width={width.createDate}>
                    {timestampToDateString(item.ts)}
                  </TableRowColumn>
                  <TableRowColumn width={width.status}>
                    {t1(item.status)}
                  </TableRowColumn>
                  <TableRowColumn width={width.action}>
                    {ntypesDeepCloneEnable.includes(item && item.ntype) && (
                      <DeepClone
                        node={item}
                        className="button-clone"
                        title={t1('deepclone')}
                        iconButton
                        deepCloneSuccessFul={() => this.deepCloneSuccessFul()}
                      />
                    )}{' '}
                    <Link
                      to={routes.url('edit_item', {
                        base: '',
                        item: { ntype: 'syllabus', iid: item.iid },
                      })}
                    >
                      <Icon icon={'edit'} title={editSyllabusLabel} />
                    </Link>{' '}
                    <DeleteItem
                      title={removeLabel}
                      textConfirm={textConfirm}
                      formid={formid}
                      ntype={ntype}
                      itemId={item.id}
                      iconButton
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
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

const mapStateToProps = (state) => {
  const ntypesDeepCloneEnable =
    lodashGet(state, 'domainInfo.conf.ntypes_deep_clone_enable') || [];

  const themeConfig = getThemeConfigSelector(state);

  return {
    ntypesDeepCloneEnable,
    enableScorm: enableScorm(state.domainInfo),
    isSIS: themeConfig && themeConfig.type === schoolTypes.SIS,
    academicCategoriesEnabled: getConf(state).academic_categories_enabled,
  };
};

export default connect(mapStateToProps)(Results);
