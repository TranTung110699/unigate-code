import React, { Component } from 'react';
import { change, formValueSelector } from 'redux-form';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import schema from '../schema/form';
import fetchData from 'components/common/fetchData';
import apiUrls from 'api-endpoints';
import epApiUrls from 'components/admin/enrolment-plan/endpoints';
import tpApiUrls from 'components/admin/training-plan/endpoints';

import lodashGet from 'lodash.get';
import { createSelector } from 'reselect';
import { getDataApiResultSelector } from 'components/admin/node/selectors/data-api-results';
import routes from 'routes';
import { filterObjectKeys } from 'common/utils/object';

const getFormId = (props) => props.formid || 'new_enrolment_plan';

class Form extends Component {
  componentDidMount() {
    const { suggestedCode } = this.props;
    if (suggestedCode) {
      this.autoPopulateSuggestedCode(suggestedCode);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suggestedCode !== this.props.suggestedCode) {
      this.autoPopulateSuggestedCode(this.props.suggestedCode);
    }
  }

  autoPopulateSuggestedCode = (suggestedCode) => {
    const { dispatch } = this.props;
    dispatch(change(getFormId(this.props), 'code', suggestedCode));
  };

  getLinkToEditPage = (post) =>
    routes.url('node_edit', {
      iid: lodashGet(post, 'result.iid'),
      ntype: 'enrolment_plan',
      step: 'dashboard',
    });

  render() {
    const {
      mode,
      step,
      node,
      trainingPlan,
      trainingPlansForOptions,
      isTrainingPlanGivenByParentComponent,
      learningItems,
      dialogKey,
      // readOnly,
      redirectToEditPage,
    } = this.props;
    const alternativeApi = this.props.alternativeApi;
    const searchFormId = this.props.searchFormId || 'enrolment_plan_search';

    let params = this.props.params || {};

    if (trainingPlan) {
      params = {
        ...params,
        training_plan_start_date: lodashGet(trainingPlan, 'start_date'),
        training_plan_end_date: lodashGet(trainingPlan, 'end_date'),
      };
    }

    if (isTrainingPlanGivenByParentComponent) {
      params = {
        ...params,
        training_plan_iid: lodashGet(trainingPlan, 'iid'),
      };
    } else {
      params = {
        ...params,
        trainingPlansForOptions,
      };
    }

    if (Array.isArray(learningItems) && learningItems.length > 0) {
      params = {
        ...params,
        enrolment_plan_learning_items: (learningItems || []).map((pro) =>
          filterObjectKeys(pro, ['iid', 'ntype']),
        ),
      };
    }

    return (
      <NodeNew
        ntype={'enrolment_plan'}
        schema={schema}
        mode={mode}
        step={step}
        node={node}
        closeModal
        hideSubmitButton={redirectToEditPage}
        showAddNewAndEditButton={redirectToEditPage}
        getEditItemUrl={redirectToEditPage ? this.getLinkToEditPage : undefined}
        dialogKey={dialogKey}
        alternativeApi={alternativeApi}
        formid={getFormId(this.props)}
        searchFormId={searchFormId}
        params={params}
        submitLabel={this.props.submitLabel}
      />
    );
  }
}

const checkIfTrainingPlanGivenByParentComponent = (outermostProps) =>
  typeof outermostProps.trainingPlan !== 'undefined';

const fetchTrainingPlansForOptionsKeyState =
  'new_enrolment_plan_training_plan_for_options';

const mapStateToProps = createSelector(
  (state, props) => {
    if (checkIfTrainingPlanGivenByParentComponent(props)) {
      return props.trainingPlan;
    }

    const trainingPlanIid = formValueSelector(getFormId(props))(
      state,
      'training_plan_iid',
    );

    const trainingPlansForOptions = getDataApiResultSelector(state)(
      fetchTrainingPlansForOptionsKeyState,
    );

    return (trainingPlansForOptions || []).find(
      (trainingPlan) =>
        String(lodashGet(trainingPlan, 'iid')) === String(trainingPlanIid),
    );
  },
  (state, props) => checkIfTrainingPlanGivenByParentComponent(props),
  (trainingPlan, isTrainingPlanGivenByParentComponent) => ({
    trainingPlan,
    isTrainingPlanGivenByParentComponent,
  }),
);

const fetchTrainingPlansForOptions = fetchData((props) => ({
  baseUrl: tpApiUrls.training_plan_search,
  fetchCondition: !props.isTrainingPlanGivenByParentComponent,
  // if training plan is given by parent component, we do not need to select it in form
  // => there no need to fetch training plan options
  params: {
    not_ended: 1,
  },
  method: 'get',
  propKey: 'trainingPlansForOptions',
  keyState: fetchTrainingPlansForOptionsKeyState,
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}));

const fetchSuggestedCode = fetchData((props) => ({
  baseUrl: epApiUrls.get_suggested_enrolment_plan_code,
  fetchCondition:
    lodashGet(props, 'mode') === 'new' && lodashGet(props, 'trainingPlan.iid'),
  params: {
    training_plan_iid: lodashGet(props, 'trainingPlan.iid'),
  },
  method: 'get',
  propKey: 'suggestedCode',
  keyState: 'enrolment_plan_suggested_code',
}));

export default connect(mapStateToProps)(
  fetchTrainingPlansForOptions(fetchSuggestedCode(Form)),
);
