/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import Avatar from 'components/common/avatar/index';
import fetchData from 'components/common/fetchData';
import RaisedButton from 'components/common/mui/RaisedButton';
import DetailOnDialog from 'components/common/detail-on-dialog';
import SearchUsers from 'components/admin/user/user-in-school/Layout';
import MultiCheckbox from 'schema-form/elements/multi-checkbox/core';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Paper from 'material-ui/Paper';
import Title from 'schema-form/field-set/Title';
import { extractObject } from 'common/utils/Array';
import { amount_in_numbers_to_words, formatMoney } from 'common';

const dialogOptionsProperties = {
  handleClose: true,

  title: t1('user_search'),
  width: '80%',
};

const labels = {
  iid: t1('iid'),
  code: t1('code'),
  name: t1('name'),
  add: t1('add'),
  adds: t1('add_selected_items'),
  noItemSelected: t1('no_item_selected'),
  type: t1('type'),
  action: t1('action'),
};

class LayoutFreestyle extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      timeRender: 0,
    };
  }

  stylePaper = {
    marginTop: 20,
    padding: 10,
  };

  buttonSearchUser = ({ showFull }) => {
    const student = get(this.props, 'formValues.student');
    return (
      <RaisedButton
        label={student && student.iid ? t1('change') : t1('search')}
        icon={<Icon icon={student && student.iid ? 'edit' : 'search'} />}
        onClick={showFull}
      />
    );
  };

  showStudentSearchForm = ({ closeDialog }) => (
    <SearchUsers
      renderResultsComponent={(items) =>
        this.renderResultSearchUsers(items, { closeDialog })
      }
    />
  );

  renderResultSearchUsers = (items, { closeDialog }) => {
    if (!Array.isArray(items) || !items.length) {
      return [];
    }

    const handleChangeFormValueByField = get(
      this.props,
      'layoutOptionsProperties.handleChangeFormValueByField',
    );

    const student = get(this.props, 'formValues.student');
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn title={labels.type}>
              {labels.type}
            </TableHeaderColumn>
            <TableHeaderColumn title={labels.code}>
              {labels.code}
            </TableHeaderColumn>
            <TableHeaderColumn title={labels.name}>
              {labels.name}
            </TableHeaderColumn>
            <TableHeaderColumn title={labels.action} className="text-center">
              {labels.action}
            </TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={false}
          showRowHover
          stripedRows
        >
          {items &&
            items.map((item) => (
              <TableRow key={item.id}>
                <TableRowColumn>
                  <Icon icon="user">
                    &nbsp;
                    {t1('user')}
                  </Icon>
                </TableRowColumn>
                <TableRowColumn>
                  {item.code || item.iid}
                  {item.code && (
                    <span className="text-muted">({item.iid})</span>
                  )}
                </TableRowColumn>
                <TableRowColumn>
                  <Avatar user={item} size={30} />
                  &nbsp;
                  {item.name}
                </TableRowColumn>
                <TableRowColumn>
                  <div className="text-center">
                    <RaisedButton
                      primary
                      disabled={student && student.iid === item.iid}
                      label={labels.add}
                      labelPosition="after"
                      icon={<Icon icon="plus" />}
                      onClick={() => {
                        if (
                          typeof handleChangeFormValueByField === 'function'
                        ) {
                          handleChangeFormValueByField(
                            this.props.formid,
                            'student',
                            extractObject(item, [
                              'id',
                              'iid',
                              'code',
                              'mail',
                              'name',
                            ]),
                          );
                        }
                        closeDialog();
                      }}
                    />
                  </div>
                </TableRowColumn>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  };

  elementSearchUser = () => (
    <DetailOnDialog
      renderPreview={this.buttonSearchUser}
      renderFull={this.showStudentSearchForm}
      dialogKey="student-search"
      dialogOptionsProperties={dialogOptionsProperties}
    />
  );

  elementApplicableBenefits = () => {
    const applicableBenefits = get(this.props, 'applicableBenefits');
    const handleChangeFormValueByField = get(
      this.props,
      'layoutOptionsProperties.handleChangeFormValueByField',
    );

    const feeOptions = [];
    const defaultValue = [];
    applicableBenefits.forEach((fee) => {
      feeOptions.push({
        name: fee && fee.name,
        value: fee && fee.iid,
        label: fee && fee.name,
        primaryText: fee && fee.name,
      });
      defaultValue.push(fee.iid);
    });

    return (
      <MultiCheckbox
        defaultValue={defaultValue}
        options={feeOptions}
        floatingLabelText={t1('choose_applied_benefits')}
        onChange={(values) => {
          if (typeof handleChangeFormValueByField === 'function') {
            handleChangeFormValueByField(
              this.props.formid,
              'benefits_semester',
              values,
            );
          }
        }}
      />
    );
  };

  showTotalAmountToPayment = () => {
    const feeTemplate = get(this.props, 'formValues.fee_template');
    const amount = get(this.props, 'formValues.amount');
    const currency = get(this.props, 'formValues.currency');

    if (!feeTemplate && (!amount || !currency)) {
      return null;
    }

    if (!feeTemplate) {
      return (
        <h3>
          {t1('total_amount_to_pay:')} &nbsp;
          {`${formatMoney(amount)} ${currency} (${amount_in_numbers_to_words(
            amount,
          )} ${currency})`}
        </h3>
      );
    }

    const calculateFees = get(
      this.props,
      'calculateTotalAmountToPayment.total_amount_to_pay_group_by_currency',
    );

    if (!calculateFees) {
      return null;
    }

    return (
      <h3>
        {t1('total_amount_to_pay:')} &nbsp;
        {Object.keys(calculateFees).map(
          (nCurrency) =>
            `${formatMoney(calculateFees[nCurrency])} ${nCurrency} (${t1(
              amount_in_numbers_to_words(calculateFees[nCurrency]),
            )} ${nCurrency})`,
        )}
      </h3>
    );
  };

  render() {
    const fieldNames = get(this.props, 'groups.new_deposit.fieldNames');
    const student = get(this.props, 'formValues.student');

    const { applicableBenefits } = this.props;

    if (!fieldNames) {
      return null;
    }

    return (
      <div>
        <Paper style={this.stylePaper}>
          <Title title={t1('student_information')} />
          <div>
            {student && student.iid ? (
              <div>
                <div className="col-md-10">
                  <Avatar user={student} size={30} />
                  &nbsp;
                  {student.name}
                  <ul>
                    {student.code && (
                      <li>
                        {`${'code'}: ${student.code}`}{' '}
                        <span>({student.iid})</span>
                      </li>
                    )}
                    {student.mail && <li>{`${'mail'}: ${student.mail}`}</li>}
                  </ul>
                </div>
                <div className="col-md-2">{this.elementSearchUser()}</div>

                <div>{fieldNames.user_major_iid}</div>
              </div>
            ) : (
              <div className="text-center">{this.elementSearchUser()}</div>
            )}
          </div>
        </Paper>
        <Paper style={this.stylePaper}>
          <Title title={t1('payment_information')} />
          <div className="clearfix">
            <div className="col-md-12">
              <div>{fieldNames.wallet_type_iid}</div>
              <div>{fieldNames.fee_template}</div>
              <div>{fieldNames.amount}</div>
              <div>{fieldNames.currency}</div>
            </div>
          </div>
        </Paper>
        {fieldNames.benefits_semester &&
          Array.isArray(applicableBenefits) &&
          applicableBenefits.length > 0 && (
            <Paper style={this.stylePaper}>
              <Title title={t1('benefits')} />
              <div className="clearfix">
                <div className="col-md-12">
                  {this.elementApplicableBenefits()}
                </div>
              </div>
            </Paper>
          )}

        <div>{fieldNames.note}</div>
        <div className="text-center">
          {this.showTotalAmountToPayment()}
          {this.props.submitButton}
        </div>
      </div>
    );
  }
}

const getApplicableBenefitsToDepositForUser = (props) => ({
  baseUrl: apiUrls.get_applicable_benefits_to_deposit_for_user,
  fetchCondition: (() => {
    const studentIid = get(props, 'formValues.student.iid');
    const feeTemplate = get(props, 'formValues.fee_template');
    const userMajorIid = get(props, 'formValues.user_major_iid');
    return studentIid && feeTemplate && userMajorIid;
  })(),
  refetchCondition: (prevProps) => {
    const studentIid = get(prevProps, 'formValues.student.iid');
    const newStudentIid = get(props, 'formValues.student.iid');

    const feeTemplate = get(prevProps, 'formValues.fee_template');
    const newFeeTemplate = get(props, 'formValues.fee_template');

    const userMajorIid = get(prevProps, 'formValues.user_major_iid');
    const newUserMajorIid = get(props, 'formValues.user_major_iid');

    if (!newFeeTemplate || !newStudentIid || !newUserMajorIid) {
      return false;
    }

    if (
      newStudentIid !== studentIid ||
      newFeeTemplate !== feeTemplate ||
      newUserMajorIid !== userMajorIid
    ) {
      return true;
    }

    return false;
  },
  params: (() => {
    const studentIid = get(props, 'formValues.student.iid');
    const feeTemplate = get(props, 'formValues.fee_template');
    const userMajorIid = get(props, 'formValues.user_major_iid');
    return {
      user_iid: studentIid,
      fee_template: feeTemplate,
      user_major_iid: userMajorIid,
    };
  })(),
  propKey: 'applicableBenefits',
});

const calculateTotalAmountToPayment = (props) => ({
  baseUrl: apiUrls.calculate_total_amount_payment_to_deposit_for_user,
  fetchCondition: (() => {
    const feeTemplate = get(props, 'formValues.fee_template');
    const benefits = get(props, 'formValues.benefits_semester');
    return feeTemplate && benefits;
  })(),
  refetchCondition: (prevProps) => {
    const feeTemplate = get(props, 'formValues.fee_template');

    const benefits = get(prevProps, 'formValues.benefits_semester');
    const newBenefits = get(props, 'formValues.benefits_semester');

    if (!feeTemplate) {
      return false;
    }

    if (!isEqual(benefits, newBenefits)) {
      return true;
    }

    return false;
  },
  params: (() => {
    const feeTemplate = get(props, 'formValues.fee_template');
    const benefits = get(props, 'formValues.benefits_semester');
    const studentIid = get(props, 'formValues.student.iid');
    const userMajorIid = get(props, 'formValues.user_major_iid');
    return {
      fee_template: feeTemplate,
      benefits,
      user_iid: studentIid,
      user_major_iid: userMajorIid,
    };
  })(),
  propKey: 'calculateTotalAmountToPayment',
});

export default fetchData(getApplicableBenefitsToDepositForUser)(
  fetchData(calculateTotalAmountToPayment)(LayoutFreestyle),
);
