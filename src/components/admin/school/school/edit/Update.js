import React from 'react';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import UpdateForm from '../new/Form';

const update = ({ school, step, formid }) =>
  !school ? (
    <div style={{ paddingTop: 200, textAlign: 'center' }}>
      <CircularProgress />
      <CircularProgress size={60} thickness={5} />
      <CircularProgress size={80} thickness={7} />
    </div>
  ) : (
    <div>
      <UpdateForm mode="edit" node={school} step={step} formid={formid} />
    </div>
  );

function mapStateToProps(state) {
  const school = state.domainInfo.school;
  return { school };
}

export default connect(mapStateToProps)(update);
