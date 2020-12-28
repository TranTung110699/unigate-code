import React from 'react';
import { connect } from 'react-redux';
import HtmlContent from 'components/common/html';

const ScoStandard = ({ sco }) => {
  return <HtmlContent content={sco && (sco.content || sco.name)} />;
};

ScoStandard.propTypes = {};
ScoStandard.defaultProps = {};

const mapStateToProps = (state, props) => {
  const learnItemIid = props.learnItemIid || state.learn.itemIid;
  const nodes = state.tree;
  const sco = nodes[learnItemIid];

  return {
    learnItemIid,
    sco,
  };
};

export default connect(mapStateToProps)(ScoStandard);
