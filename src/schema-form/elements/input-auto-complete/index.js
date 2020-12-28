/* eslint-disable react/prop-types,jsx-a11y/anchor-is-valid,prefer-const,no-undef,react/sort-comp */
/**
 * Created by vohung on 18/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormSection } from 'redux-form';
import sagaActions from 'actions/node/saga-creators';
import actions from 'actions/node/creators';
import ChipInput from 'material-ui-chip-input';
import SearchBtn from 'material-ui/svg-icons/action/search';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { filterObjectKeys } from 'common/utils/object';
import selector, {
  getStateKey,
  transformDataFromServer,
} from './inputAutoCompleteSelector';
import './stylesheet.scss';
import { elementDisplayModes } from 'schema-form/constants';
import DefaultFormElementRecap from 'components/common/default-form-element-recap';
import addProps from 'components/common/addProps';
import isEqual from 'lodash.isequal';

const InputAutoCompleteInRecapMode = ({
  value,
  label,
  componentElementTextInRecapMode: ComponentElementTextInRecapMode,
}) => {
  if (!value || !Array.isArray(value) || value.length < 0) {
    return null;
  }

  return (
    <DefaultFormElementRecap
      label={label}
      content={value.map((v, index) => (
        <React.Fragment>
          <ComponentElementTextInRecapMode value={v} />
          {value.length > 1 && index < value.length - 1 ? ', ' : ''}
        </React.Fragment>
      ))}
    />
  );
};

class InputAutoComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
    };
    this.timeout = null;

    this.handleDeleteChip = this.handleDeleteChip.bind(this);
    this.handleChipRenderer = this.handleChipRenderer.bind(this);
    this.handleOnClickOpenSearchForm = this.handleOnClickOpenSearchForm.bind(
      this,
    );
  }

  componentWillMount() {
    const { doNotFetchDataWillMount, nameElement, defaultValue } = this.props;

    const currentValue = Array.isArray(defaultValue)
      ? defaultValue
      : !defaultValue
      ? []
      : [defaultValue];
    if (!doNotFetchDataWillMount || currentValue.length) {
      const params = {};
      params[nameElement] = currentValue;
      this.getDataByInput('', params);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      Array.isArray(nextProps.dataSource) &&
      nextProps.dataSource.length &&
      this.getCurrentValue().length &&
      !this.state.value.length
    ) {
      this.setDefaultValue(nextProps);
      return;
    }

    if (
      nextProps.input &&
      nextProps.input.value &&
      nextProps.input.value.length !== this.state.value.length
    ) {
      this.setDefaultValue(nextProps);
    }

    const value = this.getCurrentValue();
    const newValue = this.getCurrentValue(nextProps);
    if (value && !newValue.length) {
      this.setState({ value: [] });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { params: prevParams } = prevProps;
    const { params } = this.props;
    if (!isEqual(params, prevParams)) {
      this.setDataOnChange(null);
    }
  }

  getDataByInput(value = '', currentPaprams = {}) {
    const { baseUrl, dispatch, nameElement, fieldSearch } = this.props;
    const params = Object.assign(currentPaprams, this.props.params, {
      [fieldSearch || 'q']: value,
    });
    const keyState = getStateKey(nameElement);
    const timeDelay = value === '' ? 1 : 1000;
    // debound
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      dispatch(
        sagaActions.getDataRequest(
          {
            url: baseUrl,
            keyState,
          },
          params,
        ),
      );
    }, timeDelay);
  }

  getValueOnChange(value) {
    const dataSourceConfig = this.props.dataSourceConfig || {};

    if (Object.keys(dataSourceConfig).length && dataSourceConfig.value) {
      const result = value[dataSourceConfig.value];
      if (dataSourceConfig.valueKeys) {
        return filterObjectKeys(result, dataSourceConfig.valueKeys);
      }
      return result;
    }

    return value;
  }

  getCurrentValue(props) {
    const input = props ? props.input : this.props.input;
    if (input && input.onChange) {
      return input.value || [];
    }
    return [];
  }

  setDataOnChange = (value) => {
    const { input } = this.props;
    if (input && input.onChange) {
      input.onChange(value);
    }
  };

  setDefaultValue = (props) => {
    const { dataSourceConfig, dataSource } = props || {};
    let value = this.getCurrentValue(props);
    if (!Array.isArray(value)) {
      return;
    }
    if (value.length) {
      if (!Array.isArray(dataSource) || !dataSource.length) {
        return;
      }
      value = this.getDataSourceToSetDefaultValue(
        value,
        dataSource,
        dataSourceConfig,
      );
      this.setState({ value });
    }
  };

  getDataSourceToSetDefaultValue = (
    values,
    dataSource,
    dataSourceConfig = {},
  ) => {
    if (typeof values[0] === 'object') {
      return values;
    }

    const { value, transformData } = dataSourceConfig;
    const newDataSource = transformData
      ? transformDataFromServer(dataSource, dataSourceConfig)
      : dataSource;

    return newDataSource.filter((data) => {
      return values.includes(data[value]);
    });
  };

  checkDuplicate = (chip, values) => {
    const dataSourceConfig = this.props.dataSourceConfig;
    let key = null;
    if (
      dataSourceConfig &&
      Object.keys(dataSourceConfig).length &&
      dataSourceConfig.value
    ) {
      key = dataSourceConfig.value;
    }
    let duplicate = false;
    if (!values || !values.length) {
      return duplicate;
    }

    values.forEach((value) => {
      if (!key && value === chip) {
        duplicate = true;
      } else if (key && chip[key] === value) {
        duplicate = true;
      } else if (key && chip[key] === value[key]) {
        duplicate = true;
      } else if (key && typeof chip === 'object') {
        const dataChip = chip[key];
        const dataValue = value[key];

        // TODO: get key
        if (
          dataChip &&
          dataValue &&
          dataChip.id &&
          dataValue.id &&
          String(dataChip.id) === String(dataValue.id)
        ) {
          duplicate = true;
        } else if (
          dataChip &&
          dataValue &&
          dataChip.iid &&
          dataValue.iid &&
          String(dataChip.iid) === String(dataValue.iid)
        ) {
          duplicate = true;
        }
      }
    });
    return duplicate;
  };

  isChipDoesNotExist = (chip, dataSource) => {
    let notExist = true;
    const dataSourceConfig = this.props.dataSourceConfig;
    let key = null;
    if (
      dataSourceConfig &&
      Object.keys(dataSourceConfig).length &&
      dataSourceConfig.text
    ) {
      key = dataSourceConfig.text;
    }

    if (!dataSource || !dataSource.length || !chip) {
      return true;
    }
    dataSource.forEach((dataChip) => {
      if (key && chip[key] === dataChip[key]) {
        notExist = false;
      } else if (!key && chip === dataChip) {
        notExist = false;
      }
    });
    return notExist;
  };

  handleAddChip = (chip, checkExist = true) => {
    let value = this.state.value || [];

    const { dataSource, dispatch } = this.props;

    if (
      this.limitRequestAdd() ||
      (checkExist && this.isChipDoesNotExist(chip, dataSource))
    ) {
      return false;
    }
    if (this.checkDuplicate(chip, value)) {
      dispatch(actions.snackbar('error', t1('chip_exists')));
      return false;
    }

    value.push(chip);
    this.setState({
      ...value,
    });

    const valueSet = Object.assign([], this.getCurrentValue());
    valueSet.push(this.getValueOnChange(chip));
    this.setDataOnChange(valueSet);
    return true;
  };

  handleDeleteChip = (chip, index) => {
    const value = Object.assign([], this.getCurrentValue());
    if (value && value.length) {
      value.splice(index, 1);
    }
    this.setDataOnChange(value);
    this.setState({
      value,
    });
  };

  limitRequestAdd = () => {
    const limit = this.props.limit;
    const value = this.state.value;
    if (!limit || !value || !value.length) {
      return false;
    }
    return limit <= value.length;
  };

  handleChipRenderer(
    {
      value,
      text,
      chip,
      isFocused,
      isDisabled,
      handleClick,
      handleRequestDelete,
      defaultStyle,
    },
    key,
  ) {
    // TODO: Refactor componentElementEditor
    return null;
  }

  handleOnClickOpenSearchForm = () => {
    const {
      dispatch,
      componentElementSearch,
      elementSearchProps,
      elementSearchDialogOptionsProperties,
      params,
      shouldNotMergeParamsToSearchPropsHiddenFields,
    } = this.props;
    const Search = componentElementSearch;
    let realElementSearchProps = elementSearchProps || {};
    realElementSearchProps = {
      ...realElementSearchProps,
      hiddenFields: Object.assign(
        {},
        realElementSearchProps.hiddenFields,
        shouldNotMergeParamsToSearchPropsHiddenFields ? {} : params,
      ),
    };

    const contentDialog = (
      <Search
        {...realElementSearchProps}
        onAddChip={(chip) => {
          const status = this.handleAddChip(chip, false);
          const message = status !== false ? t1('successful') : t1('error');
          dispatch(actions.snackbar(true, message));
        }}
      />
    );
    const optionsProperties = {
      width: '90%',
      handleClose: true,

      ...(elementSearchDialogOptionsProperties || {}),
    };
    dispatch(
      actions.handleOpenDialog(
        { contentDialog, optionsProperties },
        'input-auto-complete-search',
      ),
    );
  };

  renderElementValueEditor = (ElementEditor) => {
    const { nameElement, optionsProperties } = this.props;
    const values = this.getCurrentValue();
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

  filterAutoComplete = () => true;

  autoCompleteSearch = (val) => {
    if (this.limitRequestAdd()) {
      return;
    }
    this.getDataByInput(val);
  };

  handleClickInput = () => this.autoCompleteSearch();

  handleUpdateInput = (val) => this.autoCompleteSearch(val);

  chipContainerStyle = { overflowY: 'auto', minHeight: '560px !important' };

  searchBtnStyle = {
    position: 'absolute',
    right: 2,
    top: 40,
    width: 30,
    height: 30,
    color: '#00BCD4',
    cursor: 'pointer',
    zIndex: 10,
  };

  render() {
    let {
      dataSource,
      dataSourceConfig,
      componentElementSearch,
      componentElementEditor,
      optionsProperties,
      fullWidth,
      hintText,
      floatingLabelText,
      meta,
      elementDisplayMode,
      componentElementTextInRecapMode,
    } = this.props;

    switch (elementDisplayMode) {
      case elementDisplayModes.RECAP: {
        return (
          <InputAutoCompleteInRecapMode
            value={this.getCurrentValue()}
            label={floatingLabelText}
            componentElementTextInRecapMode={componentElementTextInRecapMode}
          />
        );
      }
    }

    if (this.limitRequestAdd()) {
      dataSource = null;
    }

    const { value } = this.state;

    const { error } = meta || {};
    const propsRender = {
      value,
      fullWidth,
      dataSource,
      dataSourceConfig,
      hintText,
      floatingLabelText,
      clearOnBlur: this.props.clearOnBlur,
      openOnFocus: true,
      errorText: error,
      filter: this.filterAutoComplete,
    };

    if (componentElementEditor) {
      propsRender.chipRenderer = this.handleChipRenderer;
    }

    return (
      <div
        className={`\
          ${(optionsProperties && optionsProperties.classNameWrapper) || ''}\
          input-auto-complete\
          ${error ? 'input-auto-complete--error' : ''}\
         `}
        style={{ position: 'relative' }}
      >
        {componentElementSearch && (
          <SearchBtn
            onClick={this.handleOnClickOpenSearchForm}
            title={t1('find_targets')}
            style={this.searchBtnStyle}
          />
        )}
        <ChipInput
          {...propsRender}
          fullWidthInput
          chipContainerStyle={this.chipContainerStyle}
          onRequestAdd={this.handleAddChip}
          onRequestDelete={this.handleDeleteChip}
          onClick={this.handleClickInput}
          onUpdateInput={this.handleUpdateInput}
        />
        {componentElementEditor &&
          this.renderElementValueEditor(componentElementEditor)}
      </div>
    );
  }
}

InputAutoComplete.propTypes = {
  baseUrl: PropTypes.string,
  dataSet: PropTypes.arrayOf(PropTypes.array),
  defaultValue: PropTypes.arrayOf(PropTypes.array),
  dataSourceConfig: PropTypes.shape(),
  dispatch: PropTypes.func,
  formid: PropTypes.string,
  nameElement: PropTypes.string,
  clearOnBlur: PropTypes.bool,
  optionsProperties: PropTypes.shape(),
  params: PropTypes.shape(),
};

InputAutoComplete.defaultProps = {
  params: {},
  optionsProperties: {},
  baseUrl: '',
  defaultValue: [],
  nameElement: '',
  formid: '_',
  dispatch: () => {},
  dataSourceConfig: {
    text: 'autoCompleteText',
    value: 'autoCompleteValue',
  },
  dataSet: [],
  clearOnBlur: true,
};

const mapStateToProps = (state, props) => selector(state, props);

export default addProps(({ input, nameElement }) => ({
  nameElement: nameElement || (input && input.name),
}))(connect(mapStateToProps)(InputAutoComplete));
