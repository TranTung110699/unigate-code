import React from 'react';
import PropTypes from 'prop-types';
import Element from '../Element';

import Title from './Title';
import './stylesheet.scss';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class FieldSet extends React.PureComponent {
  render() {
    const {
      title,
      subTitle,
      isBlock,
      schema,
      node,
      params,
      readOnly,
      formid,
      formType,
      leftcol,
      rightcol,
      xpath,
      isFeatureEnabled,
      noNeedBackground,
    } = this.props;

    const wrapperClass = this.props.wrapperClass;
    const klass = formType === 'horizontal' ? 'horizontal-wrapper' : '';

    // console.log({wrapperClass, klass});

    if (Object.keys(schema).length === 0) return null;

    return (
      <div
        className={`${xpath ? xpath : 'elementGroup'} ${
          wrapperClass ? wrapperClass : ''
        } ${
          isFeatureEnabled(features.NEW_UI_JULY_2019)
            ? 'NEW_UI_JULY_2019-element-group m-b-0'
            : ''
        }`}
      >
        {!isBlock && <Title title={title} subTitle={subTitle} />}

        <div
          className={`${xpath ? xpath : 'elementGroupBody clearfix'} ${
            wrapperClass ? wrapperClass : ''
          } ${!noNeedBackground ? 'white-background' : ''}`}
        >
          {Object.keys(schema).map((fieldName) => {
            const fieldSchema = schema[fieldName];
            const elemKey = xpath ? `${xpath}-${fieldName}` : fieldName;
            return (
              <Element
                key={elemKey}
                fieldSchema={fieldSchema}
                fieldName={fieldName}
                node={node}
                params={params}
                readOnly={readOnly}
                formType={formType}
                wrapperClass={klass}
                leftcol={leftcol}
                rightcol={rightcol}
                formValues={this.props.formValues}
                formid={formid}
                xpath={xpath}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

FieldSet.propTypes = {
  title: PropTypes.string,
  schema: PropTypes.object,
  // stepping: PropTypes.bool, // if this should be divided into steps
  // maybe stepping should be string representing which layout (horizontal or vertical...)
  // to use
  // model of the whole form
  node: PropTypes.object,
};
export default withFeatureFlags()(FieldSet);
