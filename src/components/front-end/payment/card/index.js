import React from 'react';
import { Element } from 'schema-form/elements';
import TextField from 'schema-form/elements/redux-form-fields/MuiTextField';
import RaisedButton from 'components/common/mui/RaisedButton';
import { reduxForm } from 'redux-form';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import { t, t1 } from 'translate';
import { addMoneyByCardRequest } from 'actions/learn/payment/saga-creators';
import { cardIdOptions } from '../configs';
import './stylesheet.scss';

class PaymentCard extends React.Component {
  render() {
    const { handleSubmit } = this.props;

    return (
      <Paper className="payment-card-form">
        <form onSubmit={handleSubmit}>
          <Element
            schema={{
              type: 'select',
              name: 'card_id',
              floatingLabelText: 'Loại thẻ',
              floatingLabelFixed: true,
              fullWidth: true,
              options: cardIdOptions,
            }}
          />
          <TextField
            name="pin_field"
            fullWidth
            floatingLabelText={t('enter_pin')}
          />
          <TextField
            name="seri_field"
            fullWidth
            floatingLabelText={t('enter_seri')}
          />
          <div className="payment-card-form__button">
            <RaisedButton
              primary
              type="submit"
              label={t1('payment')}
              raisedButton
            />
          </div>
        </form>
      </Paper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onSubmit(values) {
    dispatch(
      addMoneyByCardRequest({
        ...values,
        _sand_step: 'thecao_telecom_vn',
      }),
    );
  },
});

const mapStateToProps = (state, props) => ({
  validate(values) {
    const errors = {};
    if (!values || !values.pin_field) {
      errors.pin_field = t1('pin_cannot_be_empty');
    }
    if (!values || !values.seri_field) {
      errors.seri_field = t1('seri_cannot_be_empty');
    }
    return errors;
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  reduxForm({
    form: 'payment_card',
    initialValues: {
      card_id: cardIdOptions[0].value,
    },
  })(PaymentCard),
);
