import { fork } from 'redux-saga/effects';

import addMoneyByCard from './addMoneyByCard';
import getUserMoney from './getUserMoney';
import checkoutItem from './checkoutItem';

const paymentSagas = [
  fork(addMoneyByCard),
  fork(getUserMoney),
  fork(checkoutItem),
];

export default paymentSagas;
