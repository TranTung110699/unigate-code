import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import IconButton from 'material-ui/IconButton';
import actions from 'actions/node/creators';
import UpdateForm from '../new/Form';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

class Results extends Component {
  updateItem(item) {
    const { dispatch, teacher } = this.props;

    // Remove mode='edit' to post id
    const contentDialog = (
      <UpdateForm
        title={t1('edit_teaching_experience')}
        node={item}
        teacher={teacher}
        step="teaching_experience"
        formid="edit_teaching_experience"
      />
    );
    const optionsProperties = {
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  }

  render() {
    const { items, formid, teacher } = this.props;
    const teacherId = (teacher && teacher.id) || null;
    const sttLabel = t1('stt');
    const fromDateLabel = t1('from_date');
    const toDateLabel = t1('to_date');
    const worksPlaceLabel = t1('works_place');
    const achievementLabel = t1('achievement');
    const noteLabel = t1('note');
    const actionsLabel = t1('action');
    const editContractLabel = t1('edit_teaching_experience');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    return (
      <div className="table-result">
        <Table>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width="7%">{sttLabel}</TableHeaderColumn>
              <TableHeaderColumn>{fromDateLabel}</TableHeaderColumn>
              <TableHeaderColumn>{toDateLabel}</TableHeaderColumn>
              <TableHeaderColumn>{worksPlaceLabel}</TableHeaderColumn>
              <TableHeaderColumn>{achievementLabel}</TableHeaderColumn>
              <TableHeaderColumn>{noteLabel}</TableHeaderColumn>
              <TableHeaderColumn width="160">{actionsLabel}</TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody displayRowCheckbox={false} showRowHover stripedRows>
            {items &&
              items.map((item) => (
                <TableRow key={item.experience_index}>
                  <TableRowColumn width="7%">
                    {item.experience_index}
                  </TableRowColumn>
                  <TableRowColumn>{item.from_date}</TableRowColumn>
                  <TableRowColumn>{item.to_date}</TableRowColumn>
                  <TableRowColumn>{item.works_place}</TableRowColumn>
                  <TableRowColumn>{item.achievement}</TableRowColumn>
                  <TableRowColumn>{item.experience_note}</TableRowColumn>
                  <TableRowColumn width="180">
                    <IconButton
                      title={editContractLabel}
                      iconClassName="mi mi-edit"
                      onClick={() => this.updateItem(item)}
                    />
                    <DeleteItem
                      title={removeLabel}
                      textConfirm={textConfirm}
                      formid={formid}
                      itemId={teacherId}
                      step={'remove_teaching_experience'}
                      alternativeApi={'/user/update'}
                      params={{
                        staff_id: teacherId,
                        experience_index: item.experience_index,
                        _sand_step: 'remove_teaching_experience',
                      }}
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

export default connect()(Results);
