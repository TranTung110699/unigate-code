import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFormValues, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import FlatButton from 'components/common/mui/FlatButton';
import RaisedButton from 'components/common/mui/RaisedButton';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog';
import getLodash from 'lodash.get';
import Tabs from 'components/common/tabs';
import {
  TableAsReduxFormField as Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'schema-form/elements/table';
import Avatar from 'components/common/avatar';
import UserPrograms from 'components/admin/user/transcript-by-program-tree';
import { userMajorStatus } from 'configs/constants';
import NodeNew from 'components/admin/node/new';
import EditSpecialization from './EditSpecialization';
import statusSchema, {
  editInformationAfterGraduationSchema,
  getUserMajorStatusToChangeCurrentStatus,
} from '../schema/status-schema';
import HistoriesStatus from '../histories-status';
import { Link } from 'react-router-dom';
import { getUrl } from 'routes/links/common';

const label = {
  user: t1('user'),
  faculty: t1('faculty'),
  major: t1('major'),
  training_level: t1('training_level'),
  training_mode: t1('training_mode'),
  ico: t1('ico'),
  specialization: t1('specialization'),
  status: t1('status'),
  action: t1('action'),
};

const styles = {
  status: { width: '230px' },
  specialization: { width: '200px' },
};

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusOnChange: null,
    };
  }

  actionToggleDataSet = { on: 'approved', off: 'queued' };

  renderPreviewStatus = ({ showFull, ids, item }) => {
    if (Array.isArray(ids)) {
      let changeStatusLabel = t1('change_status');
      if (ids.length) {
        changeStatusLabel += ` (${t1('%s_selected', [ids.length])})`;
      }
      return (
        <RaisedButton
          disabled={!ids || !ids.length}
          label={changeStatusLabel}
          onClick={showFull}
          primary
        />
      );
    }
    return (
      <FlatButton
        label={t1(item.status)}
        labelPosition="before"
        primary
        onClick={showFull}
        icon={<Icon icon="edit" />}
      />
    );
  };

  renderFullChangeStatus = ({ closeDialog, ids, item, statusSelected }) => {
    const { formid } = this.props;

    return (
      <NodeNew
        schema={statusSchema}
        alternativeApi="/user-major/update"
        formid={'update-status'}
        node={item || { status: statusSelected }}
        searchFormId={formid}
        step="status"
        currentStatus={(item && item.status) || statusSelected}
        params={{ id: ids }}
        resetForm
      />
    );
  };

  renderFullEditInformationAfterGraduation = ({ closeDialog, item }) => {
    const { formid } = this.props;

    return (
      <NodeNew
        schema={editInformationAfterGraduationSchema}
        alternativeApi="/user-major/update"
        formid={'update-information-after-graduation'}
        node={{
          ...item,
          after_graduation: getLodash(item, 'after_graduation', [{}]),
        }}
        mode="edit"
        searchFormId={formid}
        step="after_graduation"
        resetForm
      />
    );
  };

  renderHistories = (item) => {
    if (!getLodash(item, 'histories')) {
      return null;
    }

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) => (
          <FlatButton
            label={t1('histories')}
            labelPosition="before"
            primary
            onClick={showFull}
            icon={<Icon icon={'preview'} />}
          />
        )}
        renderFull={() => <HistoriesStatus histories={item.histories} />}
        dialogKey="history-changed-status"
        dialogOptionsProperties={{
          handleClose: true,
          title: t1('histories_of_%s', [getLodash(item, 'user.name')]),
          width: '50%',
        }}
      />
    );
  };

  render() {
    const {
      formValues,
      hiddenQueryField,
      userMajorIds,
      statusSelected,
    } = this.props;

    const items = this.props.items && this.props.items.filter((item) => !!item);
    if (!items) {
      return null;
    }

    const userIid = formValues && formValues.user_iid;

    const tableProps = {
      multiSelectable: !userIid,
      name: 'user_major_ids',
      itemList: items,
      checkKey: 'id',
      className: 'text-center',
    };

    return (
      <div className="table-result">
        {!userIid && (
          <div className="m-b-30">
            <DetailOnDialog
              renderPreview={(props) =>
                this.renderPreviewStatus({
                  ...props,
                  ids: userMajorIds,
                })
              }
              renderFull={(props) =>
                this.renderFullChangeStatus({
                  ...props,
                  ids: userMajorIds,
                  statusSelected,
                })
              }
              dialogOptionsProperties={{
                ...this.dialogOptionsProperties,
                title: t1('change_status'),
              }}
            />
          </div>
        )}
        <Table {...tableProps}>
          <TableHeader
            enableSelectAll={false}
            displaySelectAll={!userIid}
            adjustForCheckbox={!userIid}
          >
            <TableRow>
              {!userIid && <TableHeaderColumn>{label.user}</TableHeaderColumn>}
              <TableHeaderColumn>{label.faculty}</TableHeaderColumn>
              <TableHeaderColumn>{label.major}</TableHeaderColumn>
              <TableHeaderColumn>{label.training_mode}</TableHeaderColumn>
              <TableHeaderColumn>{label.training_level}</TableHeaderColumn>
              <TableHeaderColumn>{label.ico}</TableHeaderColumn>
              {!hiddenQueryField && (
                <TableHeaderColumn style={styles.specialization}>
                  {label.specialization}
                </TableHeaderColumn>
              )}
              <TableHeaderColumn style={styles.status}>
                {label.status}
              </TableHeaderColumn>
              <TableHeaderColumn>{label.action}</TableHeaderColumn>}
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={!userIid}
            deselectOnClickaway={false}
            showRowHover
            stripedRows
          >
            {items &&
              items.map((item) => (
                <TableRow
                  key={item.id}
                  disabled={statusSelected && item.status !== statusSelected}
                >
                  {!userIid && (
                    <TableRowColumn>
                      <Link
                        to={getUrl('admin_view_student', {
                          ...item.user,
                          action: 'majors',
                        })}
                      >
                        {item && item.user && (
                          <Avatar user={item && item.user} size={30} />
                        )}{' '}
                        &nbsp;
                        {item && item.user && item.user.name}
                      </Link>
                    </TableRowColumn>
                  )}
                  <TableRowColumn>
                    {item.facultyObject && item.facultyObject.name}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.majorObject && item.majorObject.name} -{' '}
                    {item.majorObject && item.majorObject.code}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.training_mode && t1(item.training_mode)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.training_level && t1(item.training_level)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.icoObject && item.icoObject.name}
                  </TableRowColumn>
                  {!hiddenQueryField && (
                    <TableRowColumn style={styles.specialization}>
                      {Array.isArray(item.specializations) &&
                        item.specializations.length > 0 && (
                          <EditSpecialization
                            node={item}
                            searchFormid={this.props.formid}
                          />
                        )}
                    </TableRowColumn>
                  )}
                  <TableRowColumn style={styles.status}>
                    {hiddenQueryField ||
                    getUserMajorStatusToChangeCurrentStatus(item.status)
                      .length === 0 ? (
                      t1(item.status)
                    ) : (
                      <DetailOnDialog
                        key={`${item.iid}_`}
                        renderPreview={(props) =>
                          this.renderPreviewStatus({
                            ...props,
                            ids: item.id,
                            item,
                          })
                        }
                        renderFull={(props) =>
                          this.renderFullChangeStatus({
                            ...props,
                            ids: [item.id],
                            item,
                          })
                        }
                        dialogOptionsProperties={{
                          handleClose: true,

                          title: t1('change_status'),
                        }}
                      />
                    )}
                    {this.renderHistories(item)}
                  </TableRowColumn>
                  <TableRowColumn>
                    {!!userIid &&
                      ![
                        userMajorStatus.APPLIED,
                        userMajorStatus.QUALIFIED,
                      ].includes(item.status) && (
                        <DetailOnDialog
                          renderPreview={({ showFull }) => (
                            <FlatButton
                              label={t1('preview')}
                              title={t1(
                                'preview_transcript_of_user_by_program_tree',
                              )}
                              primary
                              onClick={showFull}
                              icon={<Icon icon={'preview'} />}
                            />
                          )}
                          renderFull={() => {
                            const {
                              specializations,
                              major,
                              training_mode,
                              training_level,
                              ico,
                            } = item;
                            if (
                              !Array.isArray(specializations) ||
                              specializations.length <= 1
                            ) {
                              return (
                                <UserPrograms
                                  userIid={userIid}
                                  formOfTraining={{
                                    major,
                                    training_mode,
                                    training_level,
                                    ico,
                                  }}
                                />
                              );
                            }

                            return (
                              <Tabs
                                tabs={specializations.map((specialization) => ({
                                  label: getLodash(specialization, 'name'),
                                  content: (
                                    <UserPrograms
                                      userIid={userIid}
                                      formOfTraining={{
                                        major,
                                        training_mode,
                                        training_level,
                                        ico,
                                        specialization: getLodash(
                                          specialization,
                                          'iid',
                                        ),
                                      }}
                                    />
                                  ),
                                }))}
                              />
                            );
                          }}
                          dialogKey="transcrip-by-program-tree"
                          dialogOptionsProperties={{
                            handleClose: true,

                            title: t1('transcript_of_%s_by_program_tree', [
                              getLodash(item, 'user.name'),
                            ]),
                            width: '90%',
                          }}
                        />
                      )}
                    {getLodash(item, 'status') ===
                      userMajorStatus.CERTIFIED && (
                      <DetailOnDialog
                        key={`${item.iid}_`}
                        renderPreview={({ showFull }) => (
                          <FlatButton
                            label={t1('edit_information_after_graduation')}
                            primary
                            onClick={showFull}
                            icon={<Icon icon="edit" />}
                          />
                        )}
                        renderFull={(props) =>
                          this.renderFullEditInformationAfterGraduation({
                            ...props,
                            item,
                          })
                        }
                        dialogOptionsProperties={{
                          handleClose: true,

                          title: t1('edit_information_after_graduation'),
                        }}
                      />
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

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

const form = 'on_change_status';

function mapStateToProps(state, props) {
  const formValues = getFormValues(form)(state);
  let statusSelected = null;
  const userMajorIds =
    (formValues &&
      formValues.user_major_ids &&
      formValues.user_major_ids.map((row) => {
        statusSelected = row.status;
        return row && row.id;
      })) ||
    [];
  return {
    statusSelected,
    userMajorIds,
  };
}

export default reduxForm({
  form,
})(connect(mapStateToProps)(Results));
