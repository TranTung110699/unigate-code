import React from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import { displayPrice } from 'common/utils/money';
import RaisedButton from 'components/common/mui/RaisedButton';
import PaymentContainer from 'components/front-end/payment/Container';
import PropTypes from 'prop-types';

class PaymentConfirm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddMoneyPanel: false,
    };
  }

  render() {
    const {
      price,
      selections,
      userAmount,
      onBuyButtonClick,
      onCancelButtonClick,
    } = this.props;

    const totalPrice =
      price ||
      selections.reduce((sum, selection) => {
        if (selection && selection.price) {
          return sum + selection.price;
        }
        return sum;
      }, 0);

    const needed = Math.max(totalPrice - userAmount, 0);

    return (
      <div className="payment-confirm">
        {!price && (
          <div className="payment-confirm__section">
            <div className="payment-confirm__section-title">
              {t1('you_select')}
            </div>
            <div className="payment-confirm__section-content">
              {selections &&
                selections.map((selection) => selection.name).join(', ')}
            </div>
          </div>
        )}
        <div className="payment-confirm__section">
          <div className="payment-confirm__section-title">
            {t1('total_price')}
          </div>
          <div className="payment-confirm__section-content">
            {displayPrice(totalPrice)}
          </div>
        </div>
        <div className="payment-confirm__section">
          <div className="payment-confirm__section-title">{t1('you_have')}</div>
          <div className="payment-confirm__section-content">
            {displayPrice(userAmount)}
          </div>
        </div>
        {needed > 0 && (
          <div className="payment-confirm__section">
            <div className="payment-confirm__section-title">
              {t1('you_need')}
            </div>
            <div className="payment-confirm__section-content">
              {displayPrice(needed)}
            </div>
          </div>
        )}
        <div className="payment-confirm__buttons">
          {needed === 0 && (
            <RaisedButton
              className="payment-confirm__button"
              onClick={onBuyButtonClick}
              primary
              label={t1('buy')}
            />
          )}
          {needed > 0 && (
            <RaisedButton
              className="payment-confirm__button"
              onClick={() => {
                this.setState({ showAddMoneyPanel: true });
              }}
              primary
              label={t1('add_money_to_your_account')}
            />
          )}
          <RaisedButton
            className="payment-confirm__button"
            onClick={onCancelButtonClick}
            label={t1('cancel')}
          />
        </div>
        {needed > 0 && this.state.showAddMoneyPanel && (
          <div className="payment-confirm__add-money">
            <PaymentContainer items={selections} />
          </div>
        )}
      </div>
    );
  }
}

// PaymentConfirm.PropTypes = {
//   selections: PropTypes.arrayOf(PropTypes.shape()),
//   totalPrice: PropTypes.number,
//   userAmount: PropTypes.number,
// };
//
// PaymentConfirm.defaultProps = {
//   selections: [],
//   totalPrice: 0,
//   userAmount: 0,
// };

const mapStateToProps = (state) => {
  const user = state.user && state.user.info;
  const userAmount = user && user.counter && user.counter.tm;
  return {
    userAmount,
  };
};

export default connect(mapStateToProps)(PaymentConfirm);
