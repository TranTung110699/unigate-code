import React from 'react';
import { connect } from 'react-redux';
import { getFormValues } from 'redux-form';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import contestApiUrls from 'components/admin/contest/endpoints';
// import ConfirmFinishTask from '../../dashboard/ConfirmFinishTask';
// import get from 'lodash.get';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  exportExamResults() {
    const { dispatch, examResultSearchValues } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        contestApiUrls.export_exam_results,
        examResultSearchValues,
      ),
    );
  }

  render() {
    const { groups, message, readOnly, examRound } = this.props;
    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className={`col-md-3 element-item`}>
            {groups.id.fieldNames.exam_round_iid}
          </div>
          <div className={`${'col-md-3'} element-item`}>
            {groups.id.fieldNames.exam_shift_iid}
          </div>
          <div className={`${'col-md-3'} element-item m-t-30`}>
            {groups.id.fieldNames.filter_passed_exam_result}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 element-item">{groups.id.fieldNames.q}</div>
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.codes}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.job_positions}
          </div>
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.equivalent_job_positions}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.advancing_criterion}
          </div>
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.number_of_advancing_contestants}
            {groups.id.fieldNames.min_score}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 element-item">
            {groups.id.fieldNames.organizations}
          </div>
          <div className="col-md-12 element-item">
            {groups.id.fieldNames.include_sub_organizations}
          </div>
        </div>
        <div className="row">
          <div className="col-md-8 m-t-10 m-b-10">
            <RaisedButton
              type="submit"
              name="search"
              id="search"
              icon={<Icon icon={'search'} />}
              label={t1('search')}
              primary
            />
            <RaisedButton
              name="export"
              id="export"
              label={t1('export')}
              className="m-l-10"
              primary
              icon={<Icon icon={'export'} />}
              onClick={() => {
                this.exportExamResults();
              }}
            />
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const examResultSearchValues = getFormValues(props.formid)(state);
  let examRound = {};

  const itemAncestors = state.editing.itemAncestors || [];
  const nodes = state.tree;

  const examRoundItem = itemAncestors[1];
  if (examRoundItem && examRoundItem.iid && nodes[examRoundItem.iid]) {
    examRound = nodes[examRoundItem.iid];
  }

  return {
    examResultSearchValues,
    examRound,
  };
}

export default connect(mapStateToProps)(SearchFormDetailFreestyle);
