import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import { reduxForm } from 'redux-form';
import routes from 'routes';
import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import ActionToggle from 'components/common/toggle/ActionToggle';
import actions from 'actions/node/creators';
import UpdateForm from 'components/admin/user/new/Form';
import NewForm from './../new/Form';

class Results extends Component {
  actionToggleDataSet = { on: 1, off: 0 };

  unlock(item, step, title) {
    const { dispatch } = this.props;

    const contentDialog = (
      <NewForm
        mode="new"
        step={step}
        node={item}
        hiddenFields={{ uiid: item.iid }}
        params={{ uiid: item.iid }}
        alternativeApi="user/api/support-unlock"
        searchFormId="support_payment_search"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title,
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  updateItem(item) {
    const { dispatch } = this.props;

    const formid = `change_support_note_${item.id}`;
    const contentDialog = (
      <UpdateForm
        mode="edit"
        title={t1('change_support_note')}
        node={item}
        step="change_support_note"
        formid={formid}
        searchFormId="support_payment_search"
      />
    );

    const optionsProperties = {
      modal: true,
      handleClose: true,

      title: t1('change_support_note'),
    };

    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items } = this.props;
    const unlockTrialCourseLabel = t1('unlock_trial_course');
    const unlockPathLabel = t1('unlock_path');

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn rowSpan="2" width="10px">
                {t1('stt')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2" width="310px">
                {t1('user_information')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="0" colSpan="2">
                {t1('screen')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="0" colSpan="3">
                {t1('change_status')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="2" width="310px">
                {t1('current_courses')}
              </TableHeaderColumn>
              <TableHeaderColumn rowSpan="0" colSpan="2">
                {t1('unlock')}
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>{t1('pay1_screen')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('pay2_screen')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('is_supported')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('support_later')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('support_note')}</TableHeaderColumn>
              <TableHeaderColumn>{t1('path')}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.id}>
                  <TableRowColumn width="10px">{item.index}</TableRowColumn>
                  <TableRowColumn width="310px">
                    <b>Name:</b> {item.name} <br />
                    <b>Phone:</b> {item.phone} <br />
                    <b>Iid:</b> {item.iid} <br />
                    <b>Email:</b> {item.mail} <br />
                    <b>Register Date:</b> {item.register_date} <br />
                  </TableRowColumn>
                  {item.support &&
                    item.support.map((support) => (
                      <TableRowColumn key={`${support.cp}-${support.tp}`}>
                        <b>Count:</b> {support.cp} <br />
                        <b>Date:</b> {support.tp} <br />
                      </TableRowColumn>
                    ))}
                  <TableRowColumn>
                    <ActionToggle
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'change_support_status',
                        ntype: 'user',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.is_supported || 0}
                      name="is_supported"
                      label
                      hideLabel
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <ActionToggle
                      baseURL={routes.url('node_update', {
                        ...item,
                        step: 'change_support_status',
                        ntype: 'user',
                      })}
                      dataSet={this.actionToggleDataSet}
                      value={item.is_saved || 0}
                      name="is_saved"
                      label
                      hideLabel
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={t1('change_support_note')}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                  </TableRowColumn>
                  <TableRowColumn width="310px">
                    {item.try_to_learn && (
                      <div>
                        {item.try_to_learn.name} <br /> ({t1('remaining_time')}:{' '}
                        {item.try_to_learn.time} {t('day')})
                      </div>
                    )}
                    {item.paths &&
                      item.paths.map((path) => (
                        <div key={`${item.id}-${path.id}`}>
                          {path && path.unlock && (
                            <span>
                              - {path.name} <br /> {t1('bought_date')} :{' '}
                              {path.time})
                            </span>
                          )}
                        </div>
                      ))}
                  </TableRowColumn>
                  <TableRowColumn>
                    {item.try_to_learn ? (
                      <IconButton
                        title={t1('unlock_trial_course')}
                        iconClassName="mi mi-lock-open"
                        onClick={() =>
                          this.unlock(
                            item,
                            'try_to_learn',
                            unlockTrialCourseLabel,
                          )
                        }
                      />
                    ) : (
                      <span>{t1('unlocked')}</span>
                    )}
                  </TableRowColumn>
                  <TableRowColumn>
                    <IconButton
                      title={t1('unlock_path')}
                      iconClassName="mi mi-lock-open"
                      onClick={() =>
                        this.unlock(item, 'unlock_path', unlockPathLabel)
                      }
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

export default connect()(reduxForm({})(Results));
