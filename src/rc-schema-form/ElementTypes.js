import React from 'react';
import Select from 'antd/lib/select';

const Option = Select.Option;

export const ElementTypes = {
  SELECTION: 'selection',
};

export const generateElement = (element, props) => {
  const fragments = (props && props.fragments) || {};
  const form = (props && props.form) || {};
  let component = null;
  switch (element.type) {
    case ElementTypes.SELECTION: {
      const options = element.options || [];
      const value = options.value || 'value';
      const label = options.label || 'label';
      const selectAll = options.selectAll;
      component = (
        <element.component {...element.componentProps}>
          {Array.isArray(options) &&
            options.map((option, index) => {
              const key = `${element.name}-${option[value]}-${index}`;
              return (
                <Option key={key} value={option[value]}>
                  {option[label]}
                </Option>
              );
            })}

          {!selectAll ||
            (selectAll.display && (
              <Option value={undefined}>
                {(selectAll && selectAll.label) || 'elect data'}
              </Option>
            ))}

          {!Array.isArray(options) &&
            Array.isArray(options.data) &&
            options.data.map((option, index) => {
              return (
                <Option
                  key={`${option[options.value]}-${index}`}
                  value={option[value]}
                >
                  {option[label]}
                </Option>
              );
            })}
        </element.component>
      );
      break;
    }
    default:
      component = <element.component form={form} {...element.componentProps} />;
  }

  return component;

  const fragment = getFragment(fragments, element);
  if (!fragment) {
  }

  if (fragment.after || fragment.before) {
    return (
      <div key={`${element.name}-ab-panel-fragment`}>
        {fragment.after(props)}
        {component}
        {fragment.before(props)}
      </div>
    );
  }
  return (
    <div key={`${element.name}-panel-fragment`}>
      {component}
      {fragment(props)}
    </div>
  );
};

export const getFragment = (fragments, element) => {
  if (!fragments || !fragments[element.name]) {
    return null;
  }

  return fragments[element.name];
};

export default ElementTypes;
