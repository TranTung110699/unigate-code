/**
 * Created by hungvo on 23/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1 } from 'translate/index';
import Toggle from 'material-ui/Toggle';
import RaisedButton from 'components/common/mui/RaisedButton';
import sagaActions from 'actions/node/saga-creators';
import actions from 'actions/node/creators';
import InlineEditable from 'components/common/forms/editable/inline';
import UserAvatarList from 'components/common/users-avatar-list/index';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import CoursesEditor from 'components/admin/course/edit/EditorByCreditSyllabusPlan';
import { TableRow, TableRowColumn } from 'components/common/mui/Table';
import getLodash from 'lodash.get';

class CreditSyllabusPlanEditor extends Component {
  deleteItemParams = {
    type: 'credit-plan',
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.updateDataInStore = this.updateDataInStore.bind(this);
  }

  updateDataInStore(field, value) {
    const { csPlan, dispatch } = this.props;
    csPlan[field] = value;
    dispatch(
      sagaActions.updateNodeRequest({
        step: field,
        iid: csPlan.iid,
        data: { ...csPlan, ntype: 'plan', model: 'cs-plan' },
      }),
    );
  }

  onEditCourses = () => {
    const { dispatch, plan, csPlan } = this.props;
    const contentDialog = (
      <CoursesEditor
        plan={plan}
        csPlanIid={csPlan && csPlan.iid}
        faculty={getLodash(this.props, 'plan.majorObject.organization')}
        updateListCourse={(courseIids) =>
          this.updateDataInStore('courses', courseIids)
        }
      />
    );
    const optionsProperties = {
      width: '80%',
      handleClose: true,
      modal: true,
    };
    dispatch(actions.handleOpenDialog({ contentDialog, optionsProperties }));
  };

  render() {
    const { csPlan, formid } = this.props;
    if (!csPlan || !csPlan.iid) {
      return <div>{t1('data_missing')}</div>;
    }

    const classCount = (csPlan && csPlan.courses && csPlan.courses.length) || 0;
    const addClassesLabel =
      classCount > 0 ? t1('%s_classes', [classCount]) : t1('add_classes');

    return (
      <TableRow>
        <TableRowColumn>
          <a
            href={`/admin/credit/${getLodash(
              csPlan,
              'creditSyllabusObject.iid',
            )}`}
            title={getLodash(csPlan, 'creditSyllabusObject.name')}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getLodash(csPlan, 'creditSyllabusObject.name')}
            {getLodash(csPlan, 'creditSyllabusObject.code') && (
              <span className="text-muted">
                ({getLodash(csPlan, 'creditSyllabusObject.code')})
              </span>
            )}
          </a>
        </TableRowColumn>
        <TableRowColumn>
          {getLodash(csPlan, 'creditSyllabusObject.credit') || '...'}
        </TableRowColumn>
        <TableRowColumn>
          <UserAvatarList
            users={csPlan && csPlan.staff}
            mode="previewCreditSyllabus"
          />
        </TableRowColumn>
        <TableRowColumn>
          <InlineEditable
            type="number"
            value={csPlan && csPlan.max_student}
            propName="max_student"
            handleOnChange={({ max_student }) =>
              this.updateDataInStore('max_student', max_student)
            }
            validate={(newValue) => newValue > 0}
          />
        </TableRowColumn>
        <TableRowColumn>
          <RaisedButton
            title={t1('click_to_add_or_manage_classes_for_this_subject')}
            label={addClassesLabel}
            onClick={() => this.onEditCourses()}
            primary={!(csPlan && csPlan.courses && csPlan.courses.length)}
          />
        </TableRowColumn>
        <TableRowColumn className="text-center" width="8%">
          <Toggle
            labelPosition="right"
            toggled={(csPlan && csPlan.status) === 'confirmed'}
            onToggle={(even, toggle) => {
              this.updateDataInStore(
                'status',
                toggle ? 'confirmed' : 'unconfirmed',
              );
            }}
          />
        </TableRowColumn>
        <TableRowColumn className="text-center" width="8%">
          <DeleteItem
            title={t1('delete')}
            textComfirm={t1('are_you_sure_you_want_to_do_this')}
            formid={formid}
            ntype="plan"
            params={this.deleteItemParams}
            itemId={csPlan && csPlan.id}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

CreditSyllabusPlanEditor.propTypes = {
  plan: PropTypes.instanceOf(Object),
  csPlan: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func,
};
CreditSyllabusPlanEditor.defaultProps = {
  plan: null,
  csPlan: null,
  dispatch: null,
};
const mapStateToProps = (state, props) => {
  let csPlan = props.creditPlan;
  csPlan = !isNaN(csPlan) ? csPlan : csPlan && csPlan.iid;
  return {
    csPlan: state.tree[csPlan],
  };
};
export default connect(mapStateToProps)(CreditSyllabusPlanEditor);
