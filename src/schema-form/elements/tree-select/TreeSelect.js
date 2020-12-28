import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { FormSection } from 'redux-form';
import ChipInput from 'material-ui-chip-input';
import TextField from 'material-ui/TextField';
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover';
import isEqual from 'lodash.isequal';

import { t1 } from 'translate';
import Tree from 'components/common/tree/TreeWithFilter';
import { filterValuesToKeepWhatTreeDataContains } from 'components/common/tree/parts/utils';

import './TreeSelect.scss';

class TreeSelectComponent extends React.Component {
  cssClass = 'tree-select-component';

  constructor(props) {
    super(props);
    this.state = {
      openPopover: false,
    };
    this.inputEl = null;
  }

  componentDidMount() {
    const inputEl = findDOMNode(this.input);
    this.inputEl = inputEl;

    this.changeSelectedNodesToKeepOnlyValuesInTreeData(
      this.props.selections,
      this.props.treeData,
    );
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.treeData, this.props.treeData)) {
      this.changeSelectedNodesToKeepOnlyValuesInTreeData(
        this.props.selections,
        this.props.treeData,
      );
    }
  }

  changeSelectedNodesToKeepOnlyValuesInTreeData = (selections, treeData) =>
    this.handleSelectedNodesChange(
      filterValuesToKeepWhatTreeDataContains(selections, treeData),
    );

  getSelectedValues = () => {
    const { selections, fromSelectionToNode } = this.props;

    return (
      selections &&
      Array.isArray(selections) &&
      selections.map(fromSelectionToNode)
    );
  };

  getDisplayedValues = () => {
    const { selections, fromSelectionToText, emptyChipText } = this.props;

    return (
      selections &&
      Array.isArray(selections) &&
      selections.map(fromSelectionToText).map((text) => text || emptyChipText)
    );
  };

  handleSelectedNodesChange = (newSelectedNodes) => {
    const { onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(newSelectedNodes);
    }
  };

  handleInputClick = (event) => {
    event.preventDefault();
    this.setState({
      openPopover: true,
      popoverAnchorEl: event.currentTarget,
    });
  };

  handlePopoverRequestClose = () => {
    this.setState({
      openPopover: false,
    });
  };

  handleDeleteChip = (chip, index) => {
    const { selections, onChange } = this.props;
    if (typeof onChange === 'function') {
      onChange(selections.slice(0, index).concat(selections.slice(index + 1)));
    }
  };

  renderElementValueEditor = (ElementEditor) => {
    const { nameElement, optionsProperties } = this.props;
    const values = this.getSelectedValues();

    if (!values || !values.length) {
      return <span />;
    }
    const elementEditorProps = this.props.elementEditorProps || {};
    return (
      <div
        className={
          optionsProperties && optionsProperties.classNameEditorWrapper
        }
        style={optionsProperties && optionsProperties.style}
      >
        {values &&
          values.map((value, index) => (
            <FormSection
              name={`${nameElement}[${index}]`}
              key={`element-editor-${nameElement}-${index}`}
            >
              <ElementEditor
                {...elementEditorProps}
                value={value}
                index={index}
                onDelete={this.handleDeleteChip}
              />
            </FormSection>
          ))}
      </div>
    );
  };

  render() {
    const {
      className,
      errorText,
      floatingLabelText,
      fullWidth,
      fullWidthInput,
      hintText,
      noFetchDataResultText,
      onBlur,
      onDragStart,
      onDrop,
      onFocus,
      readOnly,
      selections,
      treeData,
      treeProps,
      componentElementEditor,
    } = this.props;
    const componentClassName = `${className || ''} ${this.cssClass}`;

    const style = {
      marginTop: '-14px',
    };

    if (!Array.isArray(treeData) || treeData.length === 0) {
      return (
        <TextField
          floatingLabelText={floatingLabelText}
          floatingLabelFixed
          fullWidth={fullWidth}
          hintText={noFetchDataResultText || t1('there_are_no_data_to_select')}
          disabled
        />
      );
    }

    return (
      <div className={componentClassName}>
        <div style={style}>
          <ChipInput
            className={`${this.cssClass}__input`}
            floatingLabelText={floatingLabelText}
            hintText={hintText}
            fullWidth={fullWidth}
            fullWidthInput={fullWidthInput}
            onClick={this.handleInputClick}
            ref={(el) => {
              this.input = el;
            }}
            onRequestDelete={this.handleDeleteChip}
            errorText={errorText}
            onBlur={() => typeof onBlur === 'function' && onBlur()}
            onDragStart={onDragStart}
            onDrop={onDrop}
            onFocus={onFocus}
            readOnly={readOnly}
            style={{
              width: '100%',
            }}
          />
        </div>
        {componentElementEditor &&
          this.renderElementValueEditor(componentElementEditor)}
        <Popover
          className={`${this.cssClass}__popover`}
          open={this.state.openPopover}
          anchorEl={this.inputEl}
          style={{
            width: this.inputEl && this.inputEl.getBoundingClientRect().width,
          }}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handlePopoverRequestClose}
          animation={PopoverAnimationVertical}
        >
          <Tree
            {...treeProps}
            height={200}
            selectable
            selectedNodes={selections}
            onSelectedNodesChange={this.handleSelectedNodesChange}
            treeData={treeData}
          />
        </Popover>
      </div>
    );
  }
}

TreeSelectComponent.propTypes = {
  className: PropTypes.string,
  nameElement: PropTypes.string,
  emptyChipText: PropTypes.string,
  errorText: PropTypes.string,
  floatingLabelText: PropTypes.string,
  fromSelectionToText: PropTypes.func,
  fromSelectionToNode: PropTypes.func,
  fullWidth: PropTypes.bool,
  fullWidthInput: PropTypes.bool,
  hintText: PropTypes.string,
  selections: PropTypes.arrayOf(PropTypes.any),
  treeData: PropTypes.arrayOf(PropTypes.shape()),
  treeProps: PropTypes.shape(),
  noFetchDataResultText: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
  readOnly: PropTypes.bool,
  componentElementEditor: PropTypes.func,
  optionsProperties: PropTypes.shape(),
  elementEditorProps: PropTypes.shape(),
};

TreeSelectComponent.defaultProps = {
  className: '',
  nameElement: '',
  emptyChipText: '...',
  errorText: '',
  floatingLabelText: '',
  fromSelectionToText: (f) => f,
  fromSelectionToNode: (f) => f,
  fullWidth: false,
  fullWidthInput: false,
  hintText: '',
  selections: [],
  treeData: [],
  treeProps: {},
  noFetchDataResultText: '',
  onChange: (f) => f,
  onBlur: (f) => f,
  onDragStart: (f) => f,
  onDrop: (f) => f,
  onFocus: (f) => f,
  readOnly: false,
  componentElementEditor: null,
  optionsProperties: {},
  elementEditorProps: {},
};

export default TreeSelectComponent;
