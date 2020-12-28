import React from 'react';
import { Button as RadioButton, Group as RadioGroup } from 'antd/lib/radio';
import { connect } from 'react-redux';
import getLodash from 'lodash.get';

import sagaActions from 'actions/node/saga-creators';

class GroupAction extends React.PureComponent {
  handleAction = (e) => {
    const {
      dispatch,
      searchFormId,
      field,
      options,
      params,
      ...props
    } = this.props;

    params[field] = getLodash(e, 'target.value');

    dispatch(
      sagaActions.submitFormRequest('', {
        ...props,
        params,
        formidToSubmitOnSuccess: searchFormId,
      }),
    );
  };

  render() {
    const { options, defaultValue } = this.props;
    if (!Array.isArray(options) || !options.length) {
      return null;
    }
    return (
      <RadioGroup onChange={this.handleAction} defaultValue={defaultValue}>
        {options.map((row) => (
          <RadioButton value={row.value} disabled={row.disabled}>
            {row.label}
          </RadioButton>
        ))}
      </RadioGroup>
    );
  }
}

export default connect()(GroupAction);
