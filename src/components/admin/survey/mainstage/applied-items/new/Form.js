import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import schema from './schema';
import apiUrls from 'api-endpoints';
import sApiUrls from 'components/admin/survey/endpoints';
import lodashGet from 'lodash.get';
import { surveyTargetTypes } from 'configs/constants/survey';

class Form extends Component {
  render() {
    const {
      survey,
      appliedItem,
      appliedItemType,
      node,
      step,
      mode,
      params,
      searchFormId,
    } = this.props;
    const formid = this.props.formid || 'new_survey_applied_items';
    const defaultApi =
      mode === 'new'
        ? sApiUrls.add_survey_applied_items
        : sApiUrls.update_survey_applied_item;
    const alternativeApi = this.props.alternativeApi || defaultApi;

    return (
      <NodeNew
        ntype="survey_applied_item"
        step={step}
        mode={mode}
        schema={schema}
        node={node}
        closeModal
        hiddenFields={{
          ...(survey ? { survey_iids: [lodashGet(survey, 'iid')] } : {}),
          ...(lodashGet(survey, 'survey_target_type') ===
          surveyTargetTypes.SEMESTER
            ? { type: 'semester' }
            : {}),
          ...(appliedItem
            ? { item_iids: [lodashGet(appliedItem, 'iid')] }
            : {}),
          ...(appliedItemType ? { type: appliedItemType } : {}),
        }}
        alternativeApi={alternativeApi}
        formid={formid}
        searchFormId={searchFormId}
        params={params}
      />
    );
  }
}

export default Form;
