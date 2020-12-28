import React from 'react';
import PropTypes from 'prop-types';
import MultiCheckbox from 'schema-form/elements/multi-checkbox/core';
import RaisedButton from 'components/common/mui/RaisedButton';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import NodeNew from 'components/admin/node/new';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import { feeStatuses, invoiceStatuses } from 'configs/constants';
import DetailOnDialog from 'components/common/detail-on-dialog';
import { schemaCreateInvoiceByFee } from '../../fees-of-user/schema/form';

class CreateInvoice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      feeIds: [],
    };
  }

  dialogOptionsProperties = {
    width: '80%',
  };

  renderPreview = ({ showFull }) => {
    const { fees } = this.props;
    const feeOptions = [];
    const defaultValue = [];
    fees.forEach((fee) => {
      feeOptions.push({
        name: fee && fee.name,
        value: fee && fee.id,
        label: fee && fee.name,
        primaryText: fee && fee.name,
      });
      defaultValue.push(fee.id);
    });

    return (
      <div>
        <MultiCheckbox
          defaultValue={defaultValue}
          options={feeOptions}
          floatingLabelText={t1('choose_fees_create_invoice')}
          onChange={(values) => {
            this.setState({ feeIds: values });
          }}
        />
        <div className="text-center">
          <RaisedButton
            primary
            disabled={
              !(Array.isArray(this.state.feeIds) && this.state.feeIds.length)
            }
            onClick={() => {
              showFull();
            }}
            label={t1('go_to_create_invoice')}
          />
        </div>
      </div>
    );
  };

  renderCreate = ({ closeDialog }) => {
    const { searchFormId, userFees, fees } = this.props;

    const feeIds = this.state.feeIds || [];
    const newFees =
      Array.isArray(fees) &&
      fees.filter((fee) => feeIds.includes(fee && fee.id));

    if (!Array.isArray(newFees) || !newFees.length) {
      closeDialog();
      return null;
    }

    const hiddenFields = {
      status: invoiceStatuses.PAID,
    };

    return (
      <NodeNew
        ntype="invoice"
        hiddenFields={hiddenFields}
        schema={schemaCreateInvoiceByFee(userFees, hiddenFields)}
        node={{
          fees: newFees,
          payer__name: userFees && userFees.name,
          payer__phone: userFees && userFees.phone,
          student_iid: userFees && userFees.iid,
        }}
        searchFormId={searchFormId}
        alternativeApi={apiUrls.post_new_node('invoice')}
        requestSuccessful={closeDialog}
        submitButton={
          <RaisedButton
            className="pay-invoice-btn"
            name="pay_invoice"
            icon={<Icon icon="send" />}
            label={t1('pay')}
            primary
            type="submit"
          />
        }
      />
    );
  };

  render() {
    const { fees } = this.props;
    if (!Array.isArray(fees) || !fees.length) {
      return <p>{t1('can_not_create_invoice')}</p>;
    }

    return (
      <DetailOnDialog
        renderPreview={this.renderPreview}
        timeRender={
          (Array.isArray(this.state.feeIds) && this.state.feeIds.length) +
          (Array.isArray(fees) && fees.length)
        }
        renderFull={this.renderCreate}
        dialogOptionsProperties={this.dialogOptionsProperties}
      />
    );
  }
}

CreateInvoice.propTypes = {
  className: PropTypes.string,
};

CreateInvoice.defaultProps = {
  className: '',
};

export default fetchData((props) => {
  const { userFees } = props;

  return {
    baseUrl: apiUrls.get_fees_of_user,
    params: {
      mode: 'fees-to-pay',
      status: [
        feeStatuses.POSTPONE_DEADLINE,
        feeStatuses.NEW,
        feeStatuses.PARTIAL,
      ],
      user_iid: userFees && userFees.iid,
      iids:
        Array.isArray(userFees && userFees.fees) &&
        userFees.fees.map((fee) => fee && fee.iid),
    },
    propKey: 'fees',
    fetchCondition: (() => {
      const tmp = props.userFees;
      return tmp && tmp.iid && Array.isArray(tmp.fees) && tmp.fees.length;
    })(),
    refetchCondition: () => false,
    // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
    // he/she did not pass refetchCondition here, therefore, it will never refetch
    // I just refactor make it clearer
  };
})(CreateInvoice);
