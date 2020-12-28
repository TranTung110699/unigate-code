import React from 'react';
import PropTypes from 'prop-types';

import Element from './Element';

class FormLayoutFreestyle extends React.PureComponent {
  render() {
    const {
      formType,
      formid,
      layout,
      leftcol,
      node,
      params,
      readOnly,
      rightcol,
      schema,
      xpath,
    } = this.props;

    const groups = {};

    const wrapperClass = this.props.wrapperClass || '';
    const klass =
      formType === 'horizontal'
        ? `horizontal-wrapper ${wrapperClass}`
        : wrapperClass;

    // loop all groups
    schema.forEach((group) => {
      const groupSchema = group.schema;
      const fieldNames = {};
      for (const fieldName in groupSchema) {
        const fieldSchema = groupSchema[fieldName];

        fieldNames[fieldName] = (
          <Element
            fieldSchema={fieldSchema}
            fieldName={fieldName}
            node={node}
            params={params}
            readOnly={readOnly}
            formType={formType}
            wrapperClass={klass}
            leftcol={leftcol}
            rightcol={rightcol}
            formid={formid}
            xpath={xpath}
          />
        );
      }
      groups[group.id] = {
        title: group && group.title,
        subTitle: group && group.subTitle,
        fieldNames,
      };
    });

    // console.log({layout});
    const Layout = layout.component;
    return <Layout {...this.props} groups={groups} />;
  }
}

FormLayoutFreestyle.propTypes = {
  // layout: PropTypes.string, string or object
  asyncFields: PropTypes.array, // list of fields to fetch async
  fields: PropTypes.array, // list of fields to fetch async
};

export default FormLayoutFreestyle;
