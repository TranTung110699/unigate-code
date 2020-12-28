import React from 'react';
import AntdTreeSelect from 'antd/lib/tree-select';
import hoistNonReactStatic from 'hoist-non-react-statics';
import Icon from 'antd/lib/icon';
import { ACADEMIC_CATEGORY } from 'configs/constants';

const TreeSelect = ({
  treeData,
  multiple,
  placeholder,
  value,
  onChange,
  valueAsArrayEvenWhenNotMultiple,
  treeCheckable,
  showCheckedStrategy,
  style,
  checkParentEqualCheckAllChildren,
  onDropdownVisibleChange,
  loading,
  className,
  onBlur,
  allowClear,
  dropdownStyle,
  elementType,
}) => {
  if (checkParentEqualCheckAllChildren) {
    treeCheckable = true;
    showCheckedStrategy = TreeSelect.SHOW_PARENT;
  }

  const treeSelectValue = React.useMemo(
    () => {
      if (!multiple && valueAsArrayEvenWhenNotMultiple) {
        return value && value[0];
      }
      return value;
    },
    [valueAsArrayEvenWhenNotMultiple, multiple, value],
  );

  const handleTreeSelectChange = React.useCallback(
    (newTreeSelectValue, label, extra) => {
      if (typeof newTreeSelectValue === 'undefined') {
        newTreeSelectValue = null;
        // because redux form onChange will ignore undefined value
        // so if we want to clear the value in redux form
        // we need to onChange(null)
      }

      if (!multiple && valueAsArrayEvenWhenNotMultiple) {
        onChange(
          newTreeSelectValue !== null ? [newTreeSelectValue] : null,
          label,
          extra,
        );
        return;
      }
      onChange(newTreeSelectValue, label, extra);
    },
    [valueAsArrayEvenWhenNotMultiple, multiple, onChange],
  );

  const handleDropdownVisibleChange = React.useCallback(
    (visible) => {
      if (typeof onDropdownVisibleChange === 'function') {
        onDropdownVisibleChange(visible);
      }
    },
    [onDropdownVisibleChange],
  );

  // we fake the tree data to render a loading icon
  if (loading) {
    treeData = [
      {
        value: Math.random(),
        title: <Icon type="loading" style={{ fontSize: 20 }} />,
        disabled: true,
      },
    ];
  }

  return (
    <AntdTreeSelect
      treeData={treeData}
      multiple={multiple}
      placeholder={placeholder}
      value={treeSelectValue}
      onChange={handleTreeSelectChange}
      treeCheckable={treeCheckable}
      showCheckedStrategy={showCheckedStrategy}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      style={style}
      className={className}
      onBlur={!(elementType === ACADEMIC_CATEGORY) ? onBlur : false}
      allowClear={allowClear}
      dropdownStyle={dropdownStyle}
    />
  );
};

hoistNonReactStatic(TreeSelect, AntdTreeSelect);

export default TreeSelect;
