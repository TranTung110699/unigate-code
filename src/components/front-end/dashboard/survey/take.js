import React from 'react';
import { connect } from 'react-redux';
import Survey from 'components/learn/items/survey';

const takeSurvey = ({ surveyIid, semesterIid }) => {
  return (
    <div className="container">
      <Survey
        surveyIid={surveyIid}
        item_iid={semesterIid}
        item_type="semester"
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
