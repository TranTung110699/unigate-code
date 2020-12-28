/* eslint-disable react/prop-types,no-undef */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'routes';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import actions from 'actions/node/creators';
import Icon from 'components/common/Icon';
import { getThemeConfigSelector } from 'utils/selector';
import { timestampToDateString } from 'common/utils/Date';
import { schoolTypes } from 'configs/constants';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

import UpdateForm from '../new/Form';

class SyllabusExamResults extends Component {
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

  render() {
    const { items, formid, ntype, originalType, isSIS } = this.props;

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

    const width = {
      iid: '10%',
      action: '15%',
      createDate: '10%',
    };
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
              <TableHeaderColumn width={width.createDate}>
                {createDateLabel}
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
                        item: { ntype: 'syllabus', iid: item.iid },
                      })}
                    >
                      {item.code || item.slug}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn title={item.name}>
                    <Link
                      to={routes.url('edit_item', {
                        base: '',
                        item: { ntype: 'syllabus', iid: item.iid },
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

                  <TableRowColumn width={width.createDate}>
                    {timestampToDateString(item.ts)}
                  </TableRowColumn>

                  <TableRowColumn width={width.action}>
                    <Link
                      to={routes.url('edit_item', {
                        mode: 'children',
                        item: { ntype: 'credit', iid: item.iid },
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

SyllabusExamResults.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

SyllabusExamResults.defaultProps = {
  items: [],
};

const mapStateToProps = (state) => {
  const themeConfig = getThemeConfigSelector(state);

  return {
    isSIS: themeConfig && themeConfig.type === schoolTypes.SIS,
  };
};

export default connect(mapStateToProps)(SyllabusExamResults);
