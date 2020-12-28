import React, { Component } from 'react';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import NewForm from './Form';
import { createSelector } from 'reselect';
import { formValueSelector } from 'redux-form';
import { getSearchFormId } from '../common';
import dataNodeActions from 'actions/rc-node-data';
import AntButton from 'antd/lib/button';

class ButtonNew extends Component {
  dialogOptionsProperties = () => ({
    handleClose: true,

    title: t1('new_survey_takes_for_enrolment_plan_credit_syllabus'),
    modal: true,
  });

  renderPreview = ({ showFull }) => (
    <AntButton type="primary" icon="plus" onClick={showFull}>
      {t1('new_survey_takes_for_enrolment_plan_credit_syllabus')}
    </AntButton>
  );

  requestSuccessful = (data) => {
    const { dispatch, node } = this.props;
    dispatch(
      dataNodeActions.storeDataUsingNamespace(data, getSearchFormId(node)),
    );
  };

  renderFull = ({ closeDialog }) => {
    const { node, surveyIid } = this.props;
    return (
      <NewForm
        node={node}
        surveyIid={surveyIid}
        requestSuccessful={this.requestSuccessful}
      />
    );
  };

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        renderPreview={this.renderPreview}
        renderFull={this.renderFull}
        dialogOptionsProperties={this.dialogOptionsProperties()}
      />
    );
  }
}

const mapStateToProps = createSelector(
  (state, props) =>
    formValueSelector(getSearchFormId(props.node))(state, 'survey_iid'),
  (surveyIid) => ({
    surveyIid,
  }),
);

export default connect(mapStateToProps)(ButtonNew);
