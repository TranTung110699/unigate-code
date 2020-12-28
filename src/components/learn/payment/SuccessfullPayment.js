import React from 'react';
import { t1 } from 'translate';
import './SuccessfulPayment.scss';

class SuccessfullPayment extends React.Component {
  render() {
    return (
      <div className="successful-payment-modal">
        <div className="successful-payment-modal__title">
          {`${t1('your_purchase_has_completed_successfully')}`}
        </div>
        <div className="successful-payment-modal__body">
          {`${t1('we_wish_you_a_great_learning_experience')}!`}
        </div>
      </div>
    );
  }
}

export default SuccessfullPayment;
