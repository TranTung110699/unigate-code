import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from 'material-ui/IconButton';
import PropTypes from 'prop-types';
import { t1 } from 'translate/index';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table/index';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes/index';
import { Link } from 'react-router-dom';
import NodeNew from 'components/admin/node/new/index';
import actions from 'actions/node/creators';
import { categoryRelationTypes } from 'configs/constants/index';
import userGroupSchema from 'components/admin/group/schema/form';
import Status from 'components/common/Status';
// import { epLink } from './utils';
import { v4 } from 'uuid';

class K12GroupSearchResults extends Component {
  handleOnClick = (node) => {
    const { dispatch, formid } = this.props;

    const contentDialog = (
      <NodeNew
        ntype={'group'}
        schema={userGroupSchema(node && node.type ? { type: node.type } : {})}
        mode={'edit'}
        step={'request_category'}
        alternativeApi={'/category/index/update'}
        node={node}
        formid={`edit-category-${node.iid}`}
        searchFormId={formid}
      />
    );

    const optionsProperties = {
      handleClose: true,

      title: t1(`edit_${node && node.type}`),
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { items, formid, type, renderResultActions } = this.props;
    const editLabel = t1('edit_user_group');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    const isFinishingAndGraduatingSeniorGroup =
      type &&
      [
        categoryRelationTypes.GRADUATING_SENIOR,
        categoryRelationTypes.FINISHING_SENIOR,
      ].includes(type);

    const width = {
      code: '5%',
      grade: '5%',
      training_mode: '10%',
      status: '5%',
      name: '10%',
      members: '5%',
      rooms: '10%',
      school_year: '5%',
      semesters: '5%',
    };

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            enableSelectAll={false}
            adjustForCheckbox={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.code}>
                {t1('code')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('name')} width={width.name}>
                {t1('name')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('grade_level')} width={width.grade}>
                {t1('grade_level')}
              </TableHeaderColumn>
              <TableHeaderColumn
                title={t1('training_mode')}
                width={width.training_mode}
              >
                {t1('training_mode')}
              </TableHeaderColumn>

              <TableHeaderColumn
                title={t1('school_year')}
                width={width.school_year}
              >
                {t1('school_year')}
              </TableHeaderColumn>

              <TableHeaderColumn
                title={t1('semesters')}
                width={width.semesters}
              >
                {t1('semesters')}
              </TableHeaderColumn>

              <TableHeaderColumn title={t1('members')} width={width.members}>
                {t1('members')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('members')} width={width.rooms}>
                {t1('rooms')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('status')} width={width.status}>
                {t1('status')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')} width={150}>
                {t1('action')}
              </TableHeaderColumn>
              <TableHeaderColumn title={t1('action')} width={150}>
                {t1('delete')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width={width.code}>
                    <Link
                      to={routes.url(
                        'node_edit',
                        Object.assign({}, item, {
                          ntype: 'group',
                          step: 'dashboard',
                        }),
                      )}
                    >
                      {item.code}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.name}>
                    <Link
                      to={routes.url(
                        'node_edit',
                        Object.assign({}, item, {
                          ntype: 'group',
                          step: 'dashboard',
                        }),
                      )}
                    >
                      {item.name}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.grade}>
                    {item.grade}
                  </TableRowColumn>
                  <TableRowColumn width={width.training_mode}>
                    {item.training_mode}
                  </TableRowColumn>

                  <TableHeaderColumn
                    title={t1('school_year')}
                    width={width.school_year}
                  >
                    {item.school_year ? item.school_year.name : '-'}
                  </TableHeaderColumn>

                  <TableHeaderColumn
                    title={t1('semesters')}
                    width={width.semesters}
                  >
                    {item.semesters && item.semesters.length
                      ? item.semesters.map((s) => (
                          <div key={v4()}>{s.name}</div>
                        ))
                      : '-'}
                  </TableHeaderColumn>

                  <TableRowColumn width={width.members}>
                    <Link
                      to={routes.url(
                        'node_edit',
                        Object.assign({}, item, {
                          ntype: 'group',
                          step: 'members',
                        }),
                      )}
                    >
                      {item.current_members || 0}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn width={width.members}>
                    {item.rooms && item.rooms.length
                      ? item.rooms.map((r) => <div key={r.id}>{r.name}</div>)
                      : '-'}
                  </TableRowColumn>
                  <TableRowColumn width={width.status}>
                    <Status status={item.status} />
                    {/*
                    <div className="text-muted">
                      {timestampToDateString(item.ts)}
                    </div>
                     */}
                  </TableRowColumn>
                  <TableRowColumn width={150}>
                    {renderResultActions ? (
                      renderResultActions(item)
                    ) : (
                      <div>
                        <IconButton
                          title={t1('mark_attendance_for_a_day')}
                          iconClassName="mi mi-face"
                          containerElement={
                            <Link
                              to={routes.url(
                                'node_edit',
                                Object.assign({}, item, {
                                  ntype: 'group',
                                  step: 'attendance',
                                }),
                              )}
                            />
                          }
                        />
                        <IconButton
                          title={t1('manage_student_survey_feedback')}
                          iconClassName="mi mi-star"
                          containerElement={
                            <Link
                              to={routes.url(
                                'node_edit',
                                Object.assign({}, item, {
                                  ntype: 'group',
                                  step: 'surveys',
                                }),
                              )}
                            />
                          }
                        />
                        {/*

                          {item.ep_iid && (
                            <IconButton
                              title={t1('manage_student_survey_feedback')}
                              iconClassName="mi mi-star"
                              containerElement={<Link to={epLink(item)} />}
                            />
                          )}
                           */}
                      </div>
                    )}
                  </TableRowColumn>
                  <TableRowColumn width={150}>
                    {renderResultActions ? (
                      renderResultActions(item)
                    ) : (
                      <div>
                        <IconButton
                          title={editLabel}
                          iconClassName="mi mi-edit"
                          containerElement={
                            <Link
                              to={routes.url(
                                'node_edit',
                                Object.assign({}, item, {
                                  ntype: 'group',
                                  step: 'members',
                                }),
                              )}
                            />
                          }
                        />

                        <DeleteItem
                          title={removeLabel}
                          textConfirm={textConfirm}
                          formid={formid}
                          ntype="category"
                          itemId={item.id}
                        />
                      </div>
                    )}
                  </TableRowColumn>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

K12GroupSearchResults.propTypes = {
  formid: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object),
};

K12GroupSearchResults.defaultProps = {
  formid: 'category_group_search_result',
  items: [],
};

export default connect()(K12GroupSearchResults);
