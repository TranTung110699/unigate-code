import { fork } from 'redux-saga/effects';
import jobsToReport from './jobsToReport';

const jobs = [fork(jobsToReport)];

export default jobs;
