import React from 'react';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import { Element } from 'schema-form/elements';
import { change, getFormValues, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import './stylesheet.scss';

class PaymentBank extends React.Component {
  componentDidMount() {
    const { dispatch, form, banks } = this.props;
    this.fetchBankInfo();
    if (banks[0]) {
      dispatch(change(form, 'bank_id', banks[0].bank_id));
    }
  }

  componentDidUpdate() {
    const { banks, dispatch, form, bankId } = this.props;
    if (!bankId && banks[0]) {
      dispatch(change(form, 'bank_id', banks[0].bank_id));
    }
  }

  fetchBankInfo() {
    const { dispatch } = this.props;
    const { getDataRequest } = nodeSagaActions;
    dispatch(
      getDataRequest({
        url: apiUrls.get_bank_accounts,
        keyState: 'paymentBanks',
      }),
    );
  }

  render() {
    const { banks, selectedBank, items, user } = this.props;
    return (
      <Paper className="payment-bank-form">
        <form className="payment-bank-form__values">
          <Element
            schema={{
              type: 'select',
              name: 'bank_id',
              floatingLabelText: t1('card_type'),
              floatingLabelFixed: true,
              fullWidth: true,
              options: banks.map((bank) => ({
                value: bank.bank_id,
                primaryText: bank.bank_name,
              })),
            }}
          />
        </form>
        {selectedBank && (
          <div className="payment-bank-form__info">
            <div className="payment-bank-form__info-title">
              {t1('account_number')}
            </div>
            <div className="payment-bank-form__info-value">
              {selectedBank.account_number}
            </div>
            <div className="payment-bank-form__info-title">
              {t1('account_name')}
            </div>
            <div className="payment-bank-form__info-value">
              {selectedBank.account_name}
            </div>
            <div className="payment-bank-form__info-title">
              {t1('bank_branch')}
            </div>
            <div className="payment-bank-form__info-value">
              {selectedBank.bank_branch}
            </div>
            {items && (
              <div>
                <div className="payment-bank-form__info-title">
                  {t1('payment_info')}
                </div>
                <div className="payment-bank-form__info-value">
                  {`Xpeak U${user.iid} ${items
                    .map((item) => item.codeInBankPayment)
                    .join(', ')}`}
                </div>
              </div>
            )}
          </div>
        )}
      </Paper>
    );
  }
}

const formName = 'payment_bank';

const mapStateToProps = (state) => {
  const banks =
    (state.dataApiResults && state.dataApiResults.paymentBanks) || [];
  const formValues = getFormValues(formName)(state);
  const bankId = formValues && formValues.bank_id;
  const selectedBank = banks.find((bank) => bank.bank_id === bankId);

  return {
    banks,
    bankId,
    selectedBank,
  };
};

export default connect(mapStateToProps)(
  reduxForm({
    form: formName,
  })(PaymentBank),
);
