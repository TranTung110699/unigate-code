import React from 'react';
import lodashGet from 'lodash.get';
import ArrayElement from 'schema-form/elements/array';
import DisplayHtml from 'components/common/html';
import { FormSection } from 'redux-form';
import { Element } from 'schema-form/elements';
import Form from './Form';

class ElementWrapper extends React.PureComponent {
  render() {
    const {
      fieldName,
      fieldSchema,
      node,
      params,
      formType,
      readOnly,
      leftcol,
      rightcol,
      xpath,
    } = this.props;

    // setup defaultValue
    const xpathByFieldName = xpath ? `${xpath}-${fieldName}` : fieldName;
    if (node && node[xpathByFieldName]) {
      fieldSchema.defaultValue = node[xpathByFieldName];
    }

    if (params && params[fieldName]) {
      fieldSchema.params = params[fieldName];
    }

    if (readOnly) {
      fieldSchema.readOnly = true;
    }

    // layout stuff
    fieldSchema.leftcol = leftcol || 0;
    fieldSchema.rightcol = fieldSchema.rightcol || rightcol || 0;
    if (formType === 'horizontal' && fieldSchema.leftcol === 0) {
      fieldSchema.leftcol = 2;
    }

    if (fieldSchema.type === 'hidden') {
      return null;
    } else if (fieldSchema.type === 'cascade' && fieldSchema.schema) {
      return (
        <Form
          {...this.props}
          isFormSection="1"
          hideSubmitButton
          schema={fieldSchema.schema}
        />
      );
    } else if (fieldSchema.type === 'section') {
      return (
        <div className={`formSection ${fieldSchema.classWrapper || ''}`}>
          <FormSection name={fieldSchema.name}>
            <Form
              {...this.props}
              isFormSection="1"
              hideSubmitButton
              schema={fieldSchema.schema}
              xpath={
                this.props.xpath
                  ? `${this.props.xpath}.${fieldName}`
                  : fieldName
              }
            />
          </FormSection>
        </div>
      );
    } else if (fieldSchema.type === 'array') {
      const readOnly = this.props.readOnly || fieldSchema.readOnly;

      const renderElementToAdd = ({ index, xpath }) => {
        let xpathEl = this.props.xpath ? `${this.props.xpath}.` : '';
        xpathEl = `${xpathEl}${xpath || `${fieldName}.${index}`}`;

        return (
          <Form
            {...this.props}
            readOnly={readOnly}
            isFormSection="1"
            hideSubmitButton
            schema={fieldSchema.schema}
            xpath={xpathEl}
          />
        );
      };

      return (
        <ArrayElement
          {...this.props}
          readOnly={readOnly}
          xpath={this.props.xpath && fieldSchema.name}
          depth={fieldSchema.depth || 1}
          node={lodashGet(this.props, `formValues.${fieldSchema.name}`) || []}
          elementToAdd={renderElementToAdd}
        />
      );
    }
    // Render the real element
    const suffix = fieldSchema.suffix && (
      <DisplayHtml content={fieldSchema.suffix} />
    );

    const el = <Element schema={fieldSchema} />;

    if (fieldSchema.leftcol === 0 && fieldSchema.rightcol === 0)
      return suffix ? (
        <div>
          {el} {suffix}
        </div>
      ) : (
        el
      );

    // either left or right col
    let label;

    if (fieldSchema.leftcol > 0) {
      fieldSchema.underlineStyle = { display: 'none' };

      label = fieldSchema.floatingLabelText
        ? fieldSchema.floatingLabelText
        : fieldSchema.hintText;
      delete fieldSchema.floatingLabelText;
    }

    const middleCol = 12 - fieldSchema.rightcol - fieldSchema.leftcol;

    return (
      <div className={`form-group row ${this.props.wrapperClass}`}>
        {fieldSchema.leftcol ? (
          <div className={`col-md-${fieldSchema.leftcol}`}>
            <label>{label}</label>
          </div>
        ) : null}
        <div className={`col-md-${middleCol}`}>
          {el}
          {fieldSchema.rightcol === 0 && suffix}
        </div>
        {fieldSchema.rightcol > 0 && (
          <div className={`col-md-${fieldSchema.rightcol} suffix`}>
            {suffix}
          </div>
        )}
      </div>
    );
  }
}

export default ElementWrapper;
