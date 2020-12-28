/**
 * Created by hungvo on 21/10/17.
 */
import React from 'react';
import { createSelector } from 'reselect';
import { hasSubmitFailed, isSubmitting } from 'redux-form';
import CircularProgress from 'material-ui/CircularProgress';
import MenuItem from 'material-ui/MenuItem';
import { t1 } from 'translate';

export const getStateKey = (nameElement) =>
  `${nameElement}_input_auto_complete`;

export const transformDataFromServer = (dataSource, dataSourceConfig = {}) => {
  const { text, value, transformData } = dataSourceConfig;

  if (!Array.isArray(dataSource) || !dataSource.length) {
    return [];
  }

  const typeofTransFormData = typeof transformData;
  if (typeofTransFormData === 'function') {
    return transformData(dataSource);
  }

  return dataSource.map((data) => {
    const ret = {};
    ret[text] = data[transformData] || data.name;
    ret[value] = data;
    return ret;
  });
};

const getProps = (state, props) => props;

const getFormValue = (state, props) => {
  const { nameElement, formid } = props;

  const valuesForm = state.form || {};
  const dataForm = valuesForm[formid] || {};
  const values = dataForm.values || {};
  return values[nameElement];
};

const getDataSource = (state, props) => {
  const { nameElement, dataSourceConfig } = props;
  const stateKey = getStateKey(nameElement);
  const loadingDataSource = [
    {
      [dataSourceConfig.text]: String(new Date().getTime()),
      [dataSourceConfig.value]: (
        <MenuItem disabled>
          <CircularProgress />
        </MenuItem>
      ),
    },
  ];
  const noResultDataSource = [
    {
      [dataSourceConfig.text]: String(new Date().getTime()),
      [dataSourceConfig.value]: <MenuItem disabled>{t1('no_result')}</MenuItem>,
    },
  ];
  if (isSubmitting(stateKey)(state)) {
    return loadingDataSource;
  } else if (hasSubmitFailed(stateKey)(state)) {
    return noResultDataSource;
  }
  let dataSource = state.dataApiResults[stateKey] || [];
  if (dataSourceConfig && dataSourceConfig.transformData) {
    dataSource = transformDataFromServer(dataSource, dataSourceConfig);
  }
  return (
    (Array.isArray(dataSource) && dataSource.length > 0 && dataSource) ||
    noResultDataSource
  );
};

const getEditingItemSelector = createSelector(
  getProps,
  getFormValue,
  getDataSource,
  (props, formValue, dataSource) => ({
    formid: props.formid,
    formValue,
    dataSource,
  }),
);

export default getEditingItemSelector;
