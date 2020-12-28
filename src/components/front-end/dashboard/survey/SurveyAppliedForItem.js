import React from 'react';
import { connect } from 'react-redux';
import Survey from 'components/learn/items/survey';

const takeSurvey = ({ appliedItemType, itemIid, surveyIid }) => {
  if (!itemIid || !surveyIid) {
    return null;
  }

  return (
    <div className="container">
      <Survey
        surveyIid={surveyIid}
        item_iid={itemIid}
        surveyAppliedItemId={itemIid}
        item_type={appliedItemType}
        displayMaxHeight={Infinity}
      />
    </div>
  );
};

const mapStateToProps = (state, props) => {
  const { match } = props;
  const { params } = match || {};

  return params || {};
};
export default connect(mapStateToProps)(takeSurvey);
