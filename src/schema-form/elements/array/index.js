import React from 'react';
import get from 'lodash.get';
import isEqual from 'lodash.isequal';

import Addable from '../addable/Addable';

const renderElementToAdd = (
  { index, total, defaultValue, xpath, depth, level },
  props,
) => {
  const { fieldSchema, node, elementToAdd } = props;

  if (depth > 0) {
    return (
      <ArrayElement
        {...props}
        fieldSchema={{ ...fieldSchema, name: index }}
        depth={depth}
        node={node && node[index]}
        xpath={xpath}
        level={level}
      />
    );
  }

  return elementToAdd({ index, total, defaultValue, xpath, depth });
};

const getPropsByLabelConfigs = (fieldSchema, level) => {
  let addButtonLabel = fieldSchema && fieldSchema.addButtonLabel;
  let contextLabel = fieldSchema && fieldSchema.floatingLabelText;

  const labelConfig =
    fieldSchema && fieldSchema.labelConfigs && fieldSchema.labelConfigs[level];
  if (labelConfig) {
    addButtonLabel = labelConfig.addButtonLabel;
    contextLabel =
      typeof labelConfig.contextLabel === 'function'
        ? labelConfig.contextLabel(level)
        : labelConfig.contextLabel;
  }

  return {
    addButtonLabel,
    contextLabel,
    renderButtonAdd: labelConfig && labelConfig.renderButtonAdd,
  };
};

const ArrayElement = (props) => {
  const { fieldSchema, node, xpath, depth, readOnly } = props;
  const level = props.level || 0;

  let [currentValue, setCurrentValue] = React.useState(false);
  const onChange = get(fieldSchema, 'onChange');

  if (typeof onChange === 'function' && !isEqual(currentValue, node)) {
    setCurrentValue(node);
    onChange(node);
  }

  const {
    addButtonLabel,
    contextLabel,
    renderButtonAdd,
  } = getPropsByLabelConfigs(fieldSchema, level);

  return (
    <div className={fieldSchema.classWrapper}>
      {!fieldSchema.hiddenLabel && <h3>{contextLabel}</h3>}
      <Addable
        name={xpath || fieldSchema.name}
        renderButtonAdd={renderButtonAdd}
        addButtonLabel={addButtonLabel}
        renderElementToAdd={(propsToAdd) =>
          renderElementToAdd(propsToAdd, props)
        }
        hiddenAddButton={
          readOnly || fieldSchema.readOnly || fieldSchema.hiddenAddButton
        }
        hiddenRemoveButton={
          readOnly || fieldSchema.readOnly || fieldSchema.hiddenRemoveButton
        }
        node={node}
        sortable={fieldSchema.sortable}
        xpath={xpath}
        depth={depth}
        level={level}
        limit={fieldSchema.limit}
      />
    </div>
  );
};

export default ArrayElement;
