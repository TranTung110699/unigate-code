import React from 'react';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import RaisedButton from 'components/common/mui/RaisedButton';
import commonSagaActions from 'actions/saga-creators';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import contestApiUrls from 'components/admin/contest/endpoints';
import DetailOnDialog from 'components/common/detail-on-dialog';

class SearchFormDetailFreestyle extends React.PureComponent {
  h3Style = {
    margin: 0,
    background: 'white',
    color: 'red',
    textAlign: 'center',
  };

  divStyle = { textAlign: 'center' };

  exportContestants() {
    const { formid, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.exportDataRequest(
        contestApiUrls.export_contestants_list,
        form[formid].values,
      ),
    );
  }

  generateOTPForContestants() {
    const { formid, dispatch, form } = this.props;

    dispatch(
      commonSagaActions.generateOTPForContestants(
        contestApiUrls.generate_otp_for_contestants,
        form[formid].values,
        formid,
      ),
    );
  }

  render() {
    const { groups, message, readOnly, contest } = this.props;

    let { submitButton } = this.props;
    if (readOnly) {
      submitButton = null;
    }
    const otpDialogOptionsProperties = {
      handleClose: true,

      title: t1(
        'are_you_sure_you_want_to_reset_and_regenerate_all_otp_tokens?',
      ),
      modal: true,
    };

    return (
      <div className="container-fluid elementGroup">
        {message && (
          <div className="row">
            <h3 style={this.h3Style}>{message}</h3>
          </div>
        )}
        <div className="row">
          <div className={`col-md-6 element-item`}>
            {groups.id.fieldNames.exam_round_iid}
          </div>
          <div className={`${'col-md-6'} element-item`}>
            {groups.id.fieldNames.exam_shift_iid}
          </div>
          <div className="col-md-6 element-item">{groups.id.fieldNames.q}</div>
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.codes}
          </div>
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.user_organizations}
            {groups.id.fieldNames.include_sub_organizations}
          </div>
          <div className="col-md-6 element-item">
            {groups.id.fieldNames.positions}
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 m-b-15 p-t-15">
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
                this.exportContestants();
              }}
            />
            {contest && contest.require_otp === 1 && (
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <RaisedButton
                    name="export"
                    label={t1('generate_otp')}
                    className="m-l-10"
                    secondary
                    icon={<Icon icon={'generate'} />}
                    onClick={showFull}
                  />
                )}
                renderFull={({ closeDialog }) => (
                  <div className="text-center">
                    <RaisedButton
                      primary
                      id="generate_otp"
                      label={t1('ok_generate_new_tokens')}
                      onClick={() => {
                        closeDialog();
                        this.generateOTPForContestants();
                      }}
                    />
                  </div>
                )}
                dialogOptionsProperties={otpDialogOptionsProperties}
              />
            )}
          </div>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let contest = {};
  let examRound = {};

  const itemAncestors = state.editing.itemAncestors || [];
  const nodes = state.tree;

  const contestItem = itemAncestors[0];
  if (contestItem && contestItem.iid && nodes[contestItem.iid]) {
    contest = nodes[contestItem.iid];
  }

  const examRoundItem = itemAncestors[1];
  if (examRoundItem && examRoundItem.iid && nodes[examRoundItem.iid]) {
    examRound = nodes[examRoundItem.iid];
  }

  return {
    examRound,
    contest,
    form: state.form,
  };
}

export default connect(mapStateToProps)(
  fetchData((props) => ({
    baseUrl: apiUrls.get_snippet,
    fetchCondition:
      !get(props, 'examRound.iid') && get(props, 'formValues.exam_round'),
    refetchCondition: (prevProps) =>
      !get(props, 'examRound.iid') &&
      get(props, 'formValues.exam_round') &&
      get(props, 'formValues.exam_round') !==
        get(prevProps, 'formValues.exam_round'),
    params: (() => {
      const code = get(props, 'formValues.exam_round');
      return {
        ntype: 'ExamRound',
        code,
        depth: 0,
        editing_syllabus: 1,
      };
    })(),
    formatDataResult: (examRound = {}) =>
      get(examRound, 'iid') ? { examRound } : {},
  }))(SearchFormDetailFreestyle),
);
