import React from 'react';
import get from 'lodash.get';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';

const LayoutFreestyle = (props) => {
  const { submitButton } = props;
  const style = {
    padding: 20,
    width: '100%',
  };

  const fieldNames = get(props, 'groups.default.fieldNames');
  if (!fieldNames) {
    return null;
  }

  return (
    <Paper zDepth={1} style={style}>
      <h3>{t1('import_rubrics')}</h3>
      <div className="row">
        <div className="col-md-8">{fieldNames.import_file}</div>
        <div className="col-md-4  m-t-25">{submitButton}</div>
      </div>
    </Paper>
  );
};

export default LayoutFreestyle;
