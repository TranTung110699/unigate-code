import React from 'react';
import { change, unregisterField } from 'redux-form';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import lodashGet from 'lodash.get';
import isEqual from 'lodash.isequal';
import { arrayDiff } from 'common/utils/Array';

import { isEqualIgnoreFunction, isShallowEqual } from 'common/utils/object';
import FieldSet from './field-set';
import Title from './field-set/Title';
// import HorizontalFieldSet from './field-set/horizontal';
import actionCreator from './actions';
import FormLayout from './FormLayout';
import FormLayoutFreestyle from './FormLayoutFreestyle';
import { extractGroupsMetadata } from './schema/utils';

class ViewRenderer extends React.PureComponent {
  componentDidMount() {
    // if we put this here, in case server data gets changed
    // and we wanna refresh the data, this is going to be a problem
    // because componentDidMount only get exec'ed once

    // TODO: put in other hook, for example componentWillReceiveProps,
    // Remember to check if nextProps.formSchemaConfigs
    // is different from prevProps.formSchemaConfigs
    // otherwise it will go into infinite fetching cycle
    // as of 20 April 2017, this is kinda fine enough for development

    this.fetchAsyncFieldsValues(this.props);

    if (this.props.mode === 'edit') {
      this.populateValuesToReduxFormStore();
    } else {
      // else populate defaultValues to ReduxFormStore
      this.populateValuesToReduxFormStore(true);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.unregisterFields(this.props, nextProps);
  }

  componentDidUpdate(prevProps) {
    if (
      Array.isArray(this.props.asyncFields) &&
      this.props.asyncFields.length
    ) {
      this.fetchAsyncFieldsValues(this.props, prevProps);
    }

    if (
      (prevProps.mode === 'edit' &&
        this.props.node &&
        prevProps.node &&
        !isShallowEqual(this.props.node, prevProps.node)) ||
      prevProps.formid !== this.props.formid
    ) {
      this.populateValuesToReduxFormStore(false, this.props);
    }

    this.unregisterFields(prevProps, this.props);
  }

  unregisterFields = (prevProps, props) => {
    if (!isEqual(prevProps.fields, props.fields)) {
      const { dispatch, formid } = props;
      const unFields = prevProps.fields.filter(
        (field) => !props.fields.includes(field),
      );
      unFields.forEach((field) => {
        dispatch(change(formid, field, null));
        // dispatch(untouch(formid, field));
        dispatch(unregisterField(formid, field));
      });

      const newFields = props.fields.filter(
        (field) => !prevProps.fields.includes(field),
      );
      this.populateValuesToReduxFormStore(true, props, newFields);
    }
  };

  fetchAsyncFieldsValues = (props, prevProps = {}) => {
    const { dispatch, formid, params, asyncFields } = props || this.props;

    if (Array.isArray(asyncFields) && asyncFields.length) {
      asyncFields.forEach((fieldName) => {
        const currentKey = lodashGet(
          prevProps,
          `mappingAsyncFields.${fieldName}.key`,
        );
        if (
          currentKey &&
          currentKey === lodashGet(props, `mappingAsyncFields.${fieldName}.key`)
        ) {
          return;
        } else if (
          !currentKey &&
          lodashGet(prevProps, 'asyncFields', []).includes(fieldName)
        ) {
          return;
        }
        dispatch(
          actionCreator.formSchemaConfigsRequest(
            fieldName,
            formid,
            params,
            lodashGet(props, `mappingAsyncFields.${fieldName}`),
          ),
        );
      });
    }
  };

  populateValuesToReduxFormStore(populateDefaultValues, props, fields) {
    // populate node's values to redux form
    const { dispatch, schema, node, formid, xpath } = this.props;
    const currentNode = props && props.node ? props.node : node;

    schema.forEach((group) => {
      Object.keys(group.schema).forEach((key) => {
        if (Array.isArray(fields) && !fields.includes(key)) {
          return;
        }
        const field = group.schema[key];
        const fieldName = xpath ? `${xpath}.${key}` : key;
        // const fieldSchema = group.schema[fieldName];
        let value = lodashGet(currentNode, fieldName.split('__').join('.'));

        if (
          typeof value === 'undefined' &&
          populateDefaultValues &&
          typeof field.defaultValue !== 'undefined'
        ) {
          value = field.defaultValue;
        }
        if (typeof value !== 'undefined') {
          dispatch(change(formid, fieldName, value));
          if (field.onChange) {
            field.onChange(null /* event */, value);
          }
        }
      });
    });
  }

  render() {
    const {
      formid,
      formType,
      hideSubmitButton,
      // isTesting,
      layout,
      message,
      readOnly,
      schema,
      addNewAndEditButton,
      showAddNewAndEditButton,
      xpath,
    } = this.props;

    const submitButton = !hideSubmitButton ? this.props.submitButton : null;

    // we have to return here, in stead of adding more switch
    // inside FormLayout because we don't need/want to render
    // the groupElement(s) in fieldset(s) as the freestyle layout
    // will deal with every single form element itself.
    if (layout && layout.freestyle) {
      return (
        <FormLayoutFreestyle
          {...Object.assign({}, this.props, {
            submitButton,
            layoutOptionsProperties: layout.optionsProperties,
          })}
        />
      );
    }

    const groupsMetadata = extractGroupsMetadata(schema);
    const groups = {};

    schema.forEach((group) => {
      const groupId = xpath ? `${group.id}-${xpath}` : group.id;

      let groupElement = (
        <FieldSet
          wrapperClass={group.wrapperClass}
          key={groupId}
          title={group.title}
          subTitle={group.subTitle}
          isBlock={group.isBlock}
          {...this.props}
          submitButton={submitButton}
          schema={group.schema}
        />
      );

      if (group.isBlock) {
        groupElement = (
          <div key={groupId}>
            <Title title={group.title} subTitle={group.subTitle} />
            <div>{groupElement}</div>
          </div>
        );
      }

      groups[group.id] = groupElement;
    });

    return (
      <FormLayout
        xpath={xpath}
        layout={layout}
        groups={{ ...groups }}
        groupsMetadata={groupsMetadata}
        submitButton={submitButton}
        addNewAndEditButton={addNewAndEditButton}
        showAddNewAndEditButton={showAddNewAndEditButton}
        formType={formType}
        readOnly={readOnly}
        message={message}
        formid={formid}
        hideSubmitButton={hideSubmitButton}
        formValues={this.props.formValues}
      />
    );
  }
}

ViewRenderer.propTypes = {
  // layout: PropTypes.any,
  asyncFields: PropTypes.array, // list of fields to fetch async
  fields: PropTypes.array, // list of fields to fetch async
};

export default connect()(ViewRenderer);
