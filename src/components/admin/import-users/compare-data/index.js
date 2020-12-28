import React from 'react';
import get from 'lodash.get';
import ElementExportDataError from './ElementExportDataError';
import Tabs from 'components/common/tabs';
import contentTabsToImportUsersInTheSystem from './contentTabsToImportUsersInTheSystem';
import contentTabsToImportUsersInNode from './contentTabsToImportUsersInNode';

const compareData = ({ importUsersInNode = false, ...props } = {}) => {
  const valuesToCompare = props.valuesToCompare;
  const dataError = get(props, 'dataCompare.data_error');

  props.elementExportDataError =
    Array.isArray(dataError) && dataError.length ? (
      <ElementExportDataError valuesToCompare={valuesToCompare} />
    ) : null;

  const propsToRenderTabs = importUsersInNode
    ? contentTabsToImportUsersInNode(props)
    : contentTabsToImportUsersInTheSystem(props);
  return <Tabs {...propsToRenderTabs} />;
};

export default compareData;
