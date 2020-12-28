import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
import IndeterminateCheckboxIcon from 'material-ui/svg-icons/toggle/indeterminate-check-box';
import { pushToSet, remove } from 'common/utils/Array';
import isEqual from 'lodash.isequal';
import { t1 } from 'translate';
import {
  filterSelectedNodesWhenCheckParentEqualCheckAllChildren,
  getNodesThatCanBeSelected,
} from './utils';
import './addSelect.scss';

const getValueSubChildByNode = (
  node,
  doNotSelectChildrenWhenParentSelected,
) => {
  if (!node) {
    return [];
  }

  let result = doNotSelectChildrenWhenParentSelected ? [node.value] : [];
  if (Array.isArray(node.children) && node.children.length) {
    node.children.forEach((child) => {
      result = result.concat(
        getValueSubChildByNode(child, doNotSelectChildrenWhenParentSelected),
      );
    });
  } else if (!doNotSelectChildrenWhenParentSelected) {
    result.push(node.value);
  }

  return result;
};

const addSelect = (Tree) => {
  class TreeWithSelect extends React.PureComponent {
    cssClass = 'tree-with-select-component';

    handleNodeCheck = (checked, node, selectedNodes, treeData) => {
      const {
        onSelectedNodesChange,
        multiSelectable,
        checkParentEqualCheckAllChildren,
        doNotSelectChildrenWhenParentSelected,
        setValueIsChildrenOnly,
      } = this.props;
      if (node) {
        if (typeof onSelectedNodesChange === 'function') {
          let newSelectedNodes = Array.isArray(selectedNodes)
            ? selectedNodes
            : [];
          if (
            multiSelectable &&
            (setValueIsChildrenOnly || doNotSelectChildrenWhenParentSelected)
          ) {
            const subChil = getValueSubChildByNode(
              node,
              doNotSelectChildrenWhenParentSelected,
            );
            if (checked) {
              newSelectedNodes = doNotSelectChildrenWhenParentSelected
                ? newSelectedNodes
                    .filter((val) => !subChil.includes(val))
                    .concat([node.value])
                : newSelectedNodes
                    .concat(subChil)
                    .reduce(
                      (result, val) =>
                        result.includes(val) ? result : result.concat([val]),
                      [],
                    );
            } else {
              newSelectedNodes = newSelectedNodes.filter(
                (val) => !subChil.includes(val) && val !== node.vale,
              );
            }
          } else if (multiSelectable) {
            newSelectedNodes = newSelectedNodes.includes(node.value)
              ? remove(newSelectedNodes, node.value)
              : pushToSet(newSelectedNodes, node.value);
          } else {
            newSelectedNodes = newSelectedNodes.includes(node.value)
              ? []
              : [node.value];
          }
          if (checkParentEqualCheckAllChildren) {
            newSelectedNodes = filterSelectedNodesWhenCheckParentEqualCheckAllChildren(
              newSelectedNodes,
              treeData,
              setValueIsChildrenOnly,
            );
          }
          onSelectedNodesChange(newSelectedNodes);
        }
      }
    };

    addSelectToTreeData = (
      treeData = [],
      selectedNodes = [],
      rootTreeData,
      parentSelected = false,
    ) => {
      const {
        multiSelectable,
        multiSelectableLimit,
        checkParentEqualCheckAllChildren,
        doNotSelectChildrenWhenParentSelected,
        defaultNodeSelectable,
        setValueIsChildrenOnly,
      } = this.props;
      if (!Array.isArray(treeData)) {
        return {};
      }
      return treeData.reduce(
        ({ newTreeData, isAnyNodeSelected }, node) => {
          if (!node) {
            return { newTreeData, isAnyNodeSelected };
          }
          if (typeof node.value === 'undefined') {
            throw new Error(
              "every node in selectable tree must have 'value' attribute",
            );
          }
          const realRootTreeData = rootTreeData || treeData;

          const selected =
            Array.isArray(selectedNodes) && selectedNodes.includes(node.value);

          let selectable =
            typeof node.selectable === 'undefined'
              ? defaultNodeSelectable
              : node.selectable;

          if (
            multiSelectable &&
            Array.isArray(selectedNodes) &&
            selectedNodes.length >= multiSelectableLimit &&
            !selected
          ) {
            selectable = false;
          }

          let childrenTreeData;
          let isAnyChildSelected = false;
          if (
            !(checkParentEqualCheckAllChildren && !setValueIsChildrenOnly) ||
            !selected
          ) {
            ({
              newTreeData: childrenTreeData,
              isAnyNodeSelected: isAnyChildSelected,
            } = this.addSelectToTreeData(
              node.children,
              selectedNodes,
              realRootTreeData,
              parentSelected ||
                (selectedNodes && selectedNodes.includes(node.value)),
            ));
          }

          let checked;
          let checkedIcon;
          if (checkParentEqualCheckAllChildren) {
            checked = selected || isAnyChildSelected;
            checkedIcon =
              !selected && isAnyChildSelected ? (
                <IndeterminateCheckboxIcon />
              ) : null;
          } else {
            checked = selected;
          }

          let title = node.title;
          const titleAsString =
            typeof node.title === 'string' ? node.title : '';

          if (!doNotSelectChildrenWhenParentSelected || !parentSelected) {
            const checkboxWithLabelIfTitleIsString = (
              <Checkbox
                checked={checked}
                checkedIcon={checkedIcon}
                disabled={!selectable || node.disabled}
                onCheck={(ev, isChecked) =>
                  this.handleNodeCheck(
                    isChecked,
                    node,
                    selectedNodes,
                    realRootTreeData,
                  )
                }
                label={titleAsString}
              />
            );

            title = titleAsString
              ? checkboxWithLabelIfTitleIsString
              : [
                  <div className={`${this.cssClass}__title-checkbox-wrapper`}>
                    {checkboxWithLabelIfTitleIsString}
                  </div>,
                  node.title,
                ];
          }

          return {
            newTreeData: newTreeData.concat([
              {
                ...node,
                title: <div className={`${this.cssClass}__title`}>{title}</div>,
                children: childrenTreeData,
              },
            ]),
            isAnyNodeSelected:
              isAnyNodeSelected || isAnyChildSelected || selected,
          };
        },
        { newTreeData: [], isAnyNodeSelected: false },
      );
    };

    handleCheckAll = (event, isChecked) => {
      const {
        treeData,
        onSelectedNodesChange,
        checkParentEqualCheckAllChildren,
        doNotSelectChildrenWhenParentSelected,
        setValueIsChildrenOnly,
      } = this.props;

      if (!onSelectedNodesChange) {
        return;
      }

      const selectedNodes = isChecked
        ? getNodesThatCanBeSelected(
            treeData,
            checkParentEqualCheckAllChildren,
            [],
            setValueIsChildrenOnly,
            doNotSelectChildrenWhenParentSelected,
          )
        : [];

      onSelectedNodesChange(selectedNodes);
    };

    isAllNodesChecked = () => {
      const {
        treeData,
        checkParentEqualCheckAllChildren,
        doNotSelectChildrenWhenParentSelected,
        setValueIsChildrenOnly,
        selectedNodes,
      } = this.props;

      if (!selectedNodes && !selectedNodes.length) {
        return false;
      }

      const canBeSelected = getNodesThatCanBeSelected(
        treeData,
        checkParentEqualCheckAllChildren,
        [],
        setValueIsChildrenOnly,
        doNotSelectChildrenWhenParentSelected,
      ).sort();

      return isEqual(canBeSelected, selectedNodes.sort());
    };

    render() {
      const {
        className,
        treeData,
        selectable,
        selectedNodes,
        multiSelectable,
        multiSelectableLimit,
        doNotSelectChildrenWhenParentSelected,
        ...rest
      } = this.props;

      if (selectable) {
        const { newTreeData } = this.addSelectToTreeData(
          treeData,
          selectedNodes,
        );
        const componentClassName = `${className || ''} ${this.cssClass}`;
        return [
          multiSelectable &&
            multiSelectableLimit === Infinity &&
            treeData &&
            treeData.length > 0 && (
              <Checkbox
                checked={this.isAllNodesChecked()}
                onCheck={this.handleCheckAll}
                label={t1('select_all')}
              />
            ),
          <Tree
            {...rest}
            className={componentClassName}
            treeData={newTreeData}
          />,
        ];
      }

      return <Tree {...this.props} />;
    }
  }

  TreeWithSelect.propTypes = {
    setValueIsChildrenOnly: PropTypes.bool,
    doNotSelectChildrenWhenParentSelected: PropTypes.bool,
    checkParentEqualCheckAllChildren: PropTypes.bool,
    className: PropTypes.string,
    defaultNodeSelectable: PropTypes.bool,
    multiSelectable: PropTypes.bool,
    multiSelectableLimit: PropTypes.number,
    onSelectedNodesChange: PropTypes.func,
    selectable: PropTypes.bool,
    selectedNodes: PropTypes.arrayOf(PropTypes.any),
    treeData: PropTypes.arrayOf(PropTypes.shape()),
  };

  TreeWithSelect.defaultProps = {
    setValueIsChildrenOnly: false,
    doNotSelectChildrenWhenParentSelected: false,
    checkParentEqualCheckAllChildren: true,
    className: '',
    defaultNodeSelectable: true,
    multiSelectable: true,
    multiSelectableLimit: Infinity,
    onSelectedNodesChange: null,
    selectable: false,
    selectedNodes: [],
    treeData: [],
  };

  return TreeWithSelect;
};

export default addSelect;
