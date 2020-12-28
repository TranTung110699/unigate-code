/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
// import { t1 } from 'translate';
// import ConfirmFinishTask from 'components/admin/contest/dashboard/ConfirmFinishTask';
import { allCreditSyllabusesAreOnlineOnly } from 'common/conf';

class ProgramSearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const {
      groups,
      message,
      readOnly,
      examRound,
      allCreditSyllabusesAreOnlineOnlyConfig,
    } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    const middleLine = { paddingTop: '45px' };

    return (
      <div className="container-fluid elementGroup">
        <div className="row">
          <div className="col-md-2">{groups.id.fieldNames.year}</div>
          <div className="col-md-1">{groups.id.fieldNames.name}</div>
          <div className="col-md-2">{groups.id.fieldNames.training_mode}</div>
          <div className="col-md-2">{groups.id.fieldNames.grade}</div>
          <div className="col-md-2">{groups.id.fieldNames.school__group}</div>
          <div className="col-md-2">{groups.id.fieldNames.credit_syllabus}</div>
          <div className="col-md-1">{submitButton}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let examRound = {};

  const itemAncestors = state.editing.itemAncestors || [];
  const nodes = state.tree;

  const examRoundItem = itemAncestors[1];
  if (examRoundItem && examRoundItem.iid && nodes[examRoundItem.iid]) {
    examRound = nodes[examRoundItem.iid];
  }

  return {
    examRound,
    allCreditSyllabusesAreOnlineOnlyConfig: allCreditSyllabusesAreOnlineOnly(
      state.domainInfo,
    ),
  };
};

export default connect(mapStateToProps)(ProgramSearchFormDetailFreestyle);
