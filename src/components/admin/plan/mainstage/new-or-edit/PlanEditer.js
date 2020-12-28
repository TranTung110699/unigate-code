/**
 * Created by hungvo on 22/11/17.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t, t1 } from 'translate/index';
import sagaActions from 'actions/node/saga-creators';
import Divider from 'material-ui/Divider';
import DatePicker from 'schema-form/elements/date-picker/index';
import RaisedButton from 'components/common/mui/RaisedButton';
import Paper from 'material-ui/Paper';
import Icon from 'components/common/Icon';
import Toggle from 'material-ui/Toggle';
import Chip from 'material-ui/Chip';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import DetailOnDialog from 'components/common/detail-on-dialog';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
} from 'components/common/mui/Table';
import apiUrls from 'api-endpoints';
import { extractObject } from 'common/utils/Array';
import CreditSyllabusPlanEditer from './CreditSyllabusPlanEditer';
import NewCreditSyllabusPlanForm from './NewCreditSyllabusPlan';

const style = {
  marginTop: 20,
  padding: 10,
};

class Editor extends Component {
  style = { padding: 20 };
  raisedButtonStyle = { marginTop: 10 };
  divStyle = { padding: '10px' };
  chipStyle = { display: 'inline' };
  spanStyle = { display: 'inline-block' };
  datePickerStyleWrapper = { display: 'inline-flex', marginLeft: 10 };

  constructor(props) {
    super(props);
    this.state = {};
  }

  updateDataInStore = (field, value) => {
    const { plan, dispatch } = this.props;
    plan[field] = value;
    const data = extractObject(plan, [
      'id',
      'iid',
      'name',
      'status',
      'start_date',
      'end_date',
      'courses',
      'max_student',
    ]);
    data.ntype = 'plan';
    dispatch(
      sagaActions.updateNodeRequest({
        step: field,
        data,
      }),
    );
  };

  renderResultComponent = (items, props) => {
    const { formid } = props;
    const { plan } = this.props;

    const creditSyllabusIids =
      items &&
      items
        .map((item) => parseInt(item && item.credit_syllabus))
        .filter(Boolean);
    const addLabel =
      items && items.length > 0
        ? t1('add_planning_for_other_subjects')
        : t1('choose_subjects_for_planning');

    return (
      <div style={this.style}>
        {items && items.length > 0 && (
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{t1('subject_name')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('number_of_credits')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('staff')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('expected_students')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('classes')}</TableHeaderColumn>
                <TableHeaderColumn className="text-center" width="8%">
                  {t1('confirmed')}
                </TableHeaderColumn>
                <TableHeaderColumn className="text-center" width="8%">
                  {t1('actions')}
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} showRowHover stripedRows>
              {items.map((creditPlan) => (
                <CreditSyllabusPlanEditer
                  plan={plan}
                  formid={`credit_plan_search-${plan.id}`}
                  key={creditPlan && creditPlan.id}
                  creditPlan={creditPlan}
                />
              ))}
            </TableBody>
          </Table>
        )}
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <RaisedButton
              style={this.raisedButtonStyle}
              icon={<Icon icon="plus" />}
              label={addLabel}
              onClick={showFull}
            />
          )}
          renderFull={({ closeDialog }) => (
            <NewCreditSyllabusPlanForm
              closeDialog={closeDialog}
              creditSyllbusCreated={creditSyllabusIids}
              searchFormId={formid}
              planIid={plan.iid}
            />
          )}
          dialogOptionsProperties={{
            title: t1('add_new_plan_for_subject'),
            modal: true,
            handleClose: true,
          }}
        />
      </div>
    );
  };

  render() {
    const { plan } = this.props;
    if (!plan || !plan.iid) {
      return <div>{t1('data_missing')}</div>;
    }
    return (
      <Paper style={style} zDepth={1}>
        <div className="clearfix">
          <div style={this.divStyle}>
            <span className="pull-right">
              <Toggle
                labelPosition="right"
                toggled={(plan && plan.status) === 'approved'}
                label={t((plan && plan.status) || t('unapproved'))}
                onToggle={(even, toggle) => {
                  this.updateDataInStore(
                    'status',
                    toggle ? 'approved' : 'queued',
                  );
                }}
              />
            </span>
            {plan && plan.icoObject && plan.icoObject.code && (
              <Chip>
                {plan &&
                  plan.icoObject &&
                  (plan.icoObject.name || plan.icoObject.name)}
              </Chip>
            )}
            {plan && plan.majorObject && plan.majorObject.iid && (
              <Chip style={this.chipStyle}>
                {plan && plan.majorObject && plan.majorObject.code}
              </Chip>
            )}

            <span className="text-muted">
              {' '}
              ({plan && plan.training_mode}, {plan && plan.training_level}){' '}
            </span>

            {plan && plan.semesterObject && plan.semesterObject.iid && (
              <span className="pull-rights">
                <Icon icon="timer" />{' '}
                <strong>
                  {plan && plan.semesterObject && plan.semesterObject.name}
                </strong>
              </span>
            )}
          </div>
          <Divider />
          {/*        <div className="pull-left">
           <span className="m-r-20">
           {t1('name:_')}
           <Editable
           form={`edit-name-${plan.id}`}
           title={t1('plan_name')}
           name="name"
           initialValue={plan && plan.name}
           onSubmit={({ name }) => {
           this.updateDataInStore('name', name);
           }}
           validate={({ name }) => {
           const isValid = name && name.length;
           return (isValid) ? {} : { name: t1('name_not_empty') };
           }}
           />
           </span>
           </div> */}

          <div className="pull-right">
            <span className="m-r-20" style={this.spanStyle}>
              <span className="text-muted">{t1('from')}</span>
              <DatePicker
                styleWrapper={this.datePickerStyleWrapper}
                value={
                  (plan && plan.start_date) ||
                  (plan &&
                    plan.semesterObject &&
                    plan.semesterObject.start_date) ||
                  Math.floor(new Date().getTime() / 1000)
                }
                onChange={(value) => {
                  this.updateDataInStore('start_date', value);
                }}
              />
              <span className="text-muted">{t1('to')}</span>
              <DatePicker
                styleWrapper={this.datePickerStyleWrapper}
                value={
                  (plan && plan.end_date) ||
                  (plan &&
                    plan.semesterObject &&
                    plan.semesterObject.end_date) ||
                  Math.floor(new Date().getTime() / 1000)
                }
                onChange={(value) => {
                  this.updateDataInStore('end_date', value);
                }}
              />
            </span>
          </div>
        </div>
        <SearchWrapper
          formid={`credit_plan_search-${plan.id}`}
          alternativeApi={apiUrls.credit_plan_search}
          renderResultsComponent={this.renderResultComponent}
          hiddenFields={{
            plan: plan && plan.iid,
            items_per_page: -1,
          }}
          searchResultKey={`credit-syllabus-plan-${plan && plan.iid}`}
          showQueryField={false}
          autoSearchWhenStart
          showResult
          hidePagination
        />
      </Paper>
    );
  }
}

Editor.propTypes = {
  plan: PropTypes.instanceOf(Object),
  creditsPlan: PropTypes.instanceOf(Object),
  node: PropTypes.instanceOf(Object),
  dispatch: PropTypes.func,
};
Editor.defaultProps = {
  node: null,
  plan: null,
  dispatch: null,
  creditsPlan: [],
};
const mapStateToProps = (state, props) => {
  let plan = props.plan;
  plan = !isNaN(plan) ? plan : plan && plan.iid;
  return {
    plan: state.tree[plan],
  };
};
export default connect(mapStateToProps)(Editor);
