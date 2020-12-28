import React, { Component } from 'react';
import ImportForm from './ImportForm';
import PreviewForm from './Preview';

const importUserForNode = ({ importId = null, node = {} }) => {
  if (importId) {
    return <PreviewForm importId={importId} node={node} />;
  }
  return <ImportForm node={node} />;
};

export default importUserForNode;
