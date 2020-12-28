import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFormValues, reset } from 'redux-form'; // ES6
import { createSelector } from 'reselect';
import { getThemeConfig } from 'utils/selectors';
import { t1 } from 'translate';
import actions from 'actions/node/creators';
import { buildSchema } from './schema/builder';
import withETEP from 'common/hoc/withETEP';
import { searchFormIdPrefix as searchEnrolmentPlanMembersFormIdPrefix } from 'components/admin/enrolment-plan/mainstage/members/common';
import { searchFormId as searchUserToInviteToCourseFormId } from 'components/admin/invite/new/common/index.js';

import { getDefaultValuesToPopulateSearchForm } from 'components/common/forms/selector';

import SchemaForm from './SchemaForm';
import ViewRenderer from './ViewRenderer';

import SubmitBtn from './SubmitBtn';

import './styles.scss';
import lodashGet from 'lodash.get';

class Form extends Component {
  componentWillMount() {
    const { dispatch, resetForm, formid } = this.props;
    if (resetForm) {
      dispatch(reset(formid));
      dispatch(actions.setFormSchemaConfigs(null, null, formid));
    }
  }

  render() {
    const schema = buildSchema(this.props);

    const {
      formid,
      formType, // horizontal or ''
      hideSubmitButton, // TODO
      // isTesting, // TODO
      leftcol, // if form is horizontal
      rightcol,
      message,
      mode,
      node,
      params, // extra params to
      readOnly,
      onChange,
      formValues, // passed from redux store by redux-form
      valuesToSubmit,
      onSubmit,
      controls, // will be deprecated
      submitLabels,
      submitLabel,
      notShowErrorMessageOnButton,
      isSearch, // if form is a search form.
      hiddenFields,
      xpath,
      classGroupElementName,
      showSearchButton,
      showAddNewAndEditButton,
      getEditItemUrl,
      step,
      simpleMode,
      oldSubmitButton,
      noNeedBackground,
    } = this.props;
    // inject schema
    // const { onSubmit } = this.props;
    // console.log('Form', {schema, props: this.props});

    // submit button
    const onSubmitNew = (data) => {
      let fullData = Object.assign({}, params, data, hiddenFields);

      if (
        schema &&
        schema.finalProcessBeforeSubmit &&
        typeof schema.finalProcessBeforeSubmit === 'function'
      ) {
        // console.log('hellofinalProcessBeforeSubmit');
        fullData = schema.finalProcessBeforeSubmit(
          fullData,
          node || {},
          schema,
          mode,
          step,
        );
      }

      if (typeof onSubmit === 'function') {
        onSubmit(fullData);
      }
    };
    let { submitButton, addNewAndEditButton, submitBtnType } = this.props;
    const addNewAndEditLabel =
      this.props.addNewAndEditLabel || t1('add_new_and_edit');

    if (typeof submitButton === 'function') {
      submitButton = submitButton(formValues);
    } else if (oldSubmitButton) {
      submitButton = (
        <SubmitBtn
          mode={mode}
          formid={formid}
          values={formValues}
          params={params}
          controls={controls}
          labels={submitLabels}
          label={submitLabel}
          notShowErrorMessage={notShowErrorMessageOnButton}
          isSearch={isSearch}
          className="submit-open-ended-question"
          oldButton
        />
      );
    } else if (!submitButton) {
      submitButton = (
        <SubmitBtn
          mode={mode}
          formid={formid}
          values={formValues}
          params={params}
          controls={controls}
          labels={submitLabels}
          label={submitLabel}
          notShowErrorMessage={notShowErrorMessageOnButton}
          isSearch={isSearch}
        />
      );
    }

    if (!addNewAndEditButton && showAddNewAndEditButton) {
      addNewAndEditButton = (
        <SubmitBtn
          mode={mode}
          formid={formid}
          values={formValues}
          params={params}
          controls={controls}
          labels={{ new: addNewAndEditLabel }}
          label={submitLabel}
          notShowErrorMessage={notShowErrorMessageOnButton}
          getEditItemUrl={getEditItemUrl}
          isSearch={isSearch}
        />
      );
    }

    return (
      <div className={this.props.isFormSection && this.props.classWrapper}>
        {this.props.isFormSection && (
          <ViewRenderer
            asyncFields={schema.asyncFields}
            fields={schema.fields}
            finalProcessBeforeSubmit={schema.finalProcessBeforeSubmit}
            form={formid}
            formid={formid}
            formType={formType}
            simpleMode={simpleMode}
            hideSubmitButton={hideSubmitButton}
            layout={schema.layout}
            leftcol={leftcol}
            mappingAsyncFields={schema.mappingAsyncFields}
            message={message}
            mode={mode}
            node={node}
            paramsToFilter={params}
            readOnly={readOnly}
            rightcol={rightcol}
            schema={schema.groupsSchema}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
            onChange={onChange}
            formValues={formValues}
            valuesToSubmit={valuesToSubmit}
            hiddenFields={hiddenFields}
            xpath={xpath}
            classGroupElementName={classGroupElementName}
            noNeedBackground={noNeedBackground}
          />
        )}
        {!this.props.isFormSection && (
          <SchemaForm
            asyncFields={schema.asyncFields}
            fields={schema.fields}
            finalProcessBeforeSubmit={schema.finalProcessBeforeSubmit}
            validate={schema.validate}
            form={formid}
            formid={formid}
            formType={formType}
            hideSubmitButton={
              hideSubmitButton ||
              (typeof showSearchButton !== 'undefined' && !showSearchButton)
            }
            layout={schema.layout}
            leftcol={leftcol}
            mappingAsyncFields={schema.mappingAsyncFields}
            message={message}
            mode={mode}
            node={node}
            onSubmit={onSubmitNew}
            params={params}
            readOnly={readOnly}
            simpleMode={simpleMode}
            rightcol={rightcol}
            schema={schema.groupsSchema}
            submitButton={submitButton}
            addNewAndEditButton={addNewAndEditButton}
            showAddNewAndEditButton={showAddNewAndEditButton}
            onChange={onChange}
            isSearch={isSearch}
            formValues={formValues}
            valuesToSubmit={valuesToSubmit}
            hiddenFields={hiddenFields}
            classGroupElementName={classGroupElementName}
            noNeedBackground={noNeedBackground}
          />
        )}
      </div>
    );
  }
}

Form.defaultProps = {
  step: '',
  mode: 'new',
};

Form.propTypes = {
  ntype: PropTypes.string,
  // handleSubmit: PropTypes.func.isRequired,
  mode: PropTypes.string, // [new|edit]
  // isSearch: PropTypes.boolean, whether this is a search form
  // params: PropTypes.object, // todo; clarify on which cases we put things in hiddenFields, params or formValues or initialValues???
  // leftcol & rightcol: for horizontal form layout, leftcol is the bootstrap-grid width of label, rightcol is the width of input
  step: PropTypes.string,
  // node: PropTypes.shape(NodeShape),
  // serverData
  // formType: PropTypes.string, ['horizontal'|undefined]
  // formValues: PropTypes.object, // gotten from redux-form
  // xpath: PropTypes.string, // the xpath of the nested form element like 'comment[0].author', exactly like the dom xpath
  // xpath is necessary as a form might have an 'author' field and 'comment[0].author' field. In case we do need to perform
  // some logic and we don't know where this 'author' element is, we will mess things up
};

// how this works: https://github.com/reactjs/reselect
// Tutorial video : https://www.youtube.com/watch?v=6Xwo5mVxDqI

const formSchemaConfigsSelector = (state, props) =>
  state.formSchemaConfigs[props.formid] || null;
const formValuesSelector = (state, props) => getFormValues(props.formid)(state);
const getFormId = (state, props) => lodashGet(props, 'formid');
const getDomainInfo = (state) => lodashGet(state, 'domainInfo');
const userOrgIids = (state) => lodashGet(state, 'user.info.user_organizations');

const schemaFormSelector = createSelector(
  formSchemaConfigsSelector,
  formValuesSelector,
  getThemeConfig,
  getFormId,
  getDomainInfo,
  userOrgIids,
  (state, props) => props.etep_isGVDHSP,
  (state, props) => props.etep_boGiaoDucVaDaoTaoIid,
  getDefaultValuesToPopulateSearchForm,
  (
    formSchemaConfigs,
    formValues,
    themeConfig,
    formid,
    domainInfo,
    orgIids,
    etep_isGVDHSP,
    etep_boGiaoDucVaDaoTaoIid,
    defaultValues,
  ) => {
    if (etep_isGVDHSP) {
      if (
        formid.includes(searchEnrolmentPlanMembersFormIdPrefix) ||
        formid.includes(searchUserToInviteToCourseFormId)
      ) {
        orgIids = undefined;
      }
    }

    return {
      // form: props.formid,
      formid,
      formValues,
      // theForm: form[formid], // just so it will receive new props if any thing changes
      formSchemaConfigs,
      themeConfig,
      domainInfo,
      orgIids,
      defaultValues,
    };
  },
);

export default withETEP()(connect(schemaFormSelector)(Form));
