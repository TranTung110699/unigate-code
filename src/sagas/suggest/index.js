import { fork } from 'redux-saga/effects';
import suggestAutoComplete from './suggestAutoComplete';

const suggestSagas = [fork(suggestAutoComplete)];

export default suggestSagas;
