import React from 'react';
import TreeSelect from 'components/common/tree-select';
import Form from 'antd/lib/form';
import { elementDisplayModes } from 'schema-form/constants';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';

const TreeSelectInRecapMode = ({ value, fromSelectionToText, label }) => {
  const recapContent = (value || []).map(fromSelectionToText).join(', ');
  if (!recapContent) {
    return null;
  }
  return <DefaultFormElementRecap label={label} content={recapContent} />;
};

const TreeSelectInDefaultMode = ({
  treeData,
  fullWidth,
  label,
  errorText,
  hintText,
  multiple,
  checkParentEqualCheckAllChildren,
  value,
  onChange,
  onBlur,
  allowClear,
  dropdownStyle,
  elementType,
}) => {
  const style = React.useMemo(
    () => ({
      width: fullWidth ? '100%' : undefined,
    }),
    [fullWidth],
  );

  return (
    <Form.Item
      validateStatus={errorText ? 'error' : ''}
      help={errorText || ''}
      label={label}
      colon={false}
    >
      <TreeSelect
        value={value || []}
        onChange={onChange}
        checkParentEqualCheckAllChildren={checkParentEqualCheckAllChildren}
        multiple={multiple}
        treeData={treeData}
        placeholder={hintText}
        style={style}
        onBlur={onBlur}
        allowClear={allowClear}
        dropdownStyle={dropdownStyle}
        elementType={elementType}
      />
    </Form.Item>
  );
};

const TreeSelectComponent = ({
  elementDisplayMode,
  onChange,
  multiple,
  label,
  treeData,
  hintText,
  fullWidth,
  errorText,
  value,
  checkParentEqualCheckAllChildren,
  fromSelectionToText,
  onBlur,
  allowClear,
  dropdownStyle,
  elementType,
}) => {
  switch (elementDisplayMode) {
    case elementDisplayModes.RECAP: {
      return (
        <TreeSelectInRecapMode
          treeData={treeData}
          value={value}
          fromSelectionToText={fromSelectionToText}
          label={label}
        />
      );
    }
    default: {
      return (
        <TreeSelectInDefaultMode
          onChange={onChange}
          multiple={multiple}
          label={label}
          treeData={treeData}
          hintText={hintText}
          fullWidth={fullWidth}
          errorText={errorText}
          value={value}
          checkParentEqualCheckAllChildren={checkParentEqualCheckAllChildren}
          onBlur={onBlur}
          allowClear={allowClear}
          dropdownStyle={dropdownStyle}
          elementType={elementType}
        />
      );
    }
  }
};

export default TreeSelectComponent;
