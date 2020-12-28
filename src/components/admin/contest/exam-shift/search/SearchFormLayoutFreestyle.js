/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  render() {
    const { groups, message, readOnly, examRound } = this.props;
    let { submitButton } = this.props;

    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className="col-md-3 align-top">{groups.id.fieldNames.name}</div>
          {(!examRound || !examRound.code) && (
            <div className="col-md-3 align-top">
              {groups.id.fieldNames.exam_round}
            </div>
          )}
          <div className="col-md-3 align-top">
            {groups.id.fieldNames.status}
          </div>
          <div className="col-md-3 m-t-15">{submitButton}</div>
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
    itemAncestors,
    examRound,
  };
};

export default connect(mapStateToProps)(SearchFormDetailFreestyle);
