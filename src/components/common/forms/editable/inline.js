/**
 * Created by hungvo on 19/12/17.
 */

import React from 'react';
import { connect } from 'react-redux';
import Request from 'common/network/http/Request';
import actions from 'actions/node/creators';
import {
  RIEInput,
  RIENumber,
  RIESelect,
  RIETags,
  RIETextArea,
  RIEToggle,
} from 'riek';

class InlineEditTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      label: null,
    };
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleSubmit = (value) => {
    const { url, dispatch, name, propName } = this.props;
    const params = Object.assign(this.props.params || {}, value);
    Request.post(url, params).then((res) => {
      dispatch(actions.snackbar(true, res.message));
    });
  };

  handleOnChange = (value) => {
    const { url, handleOnChange } = this.props;
    if (url) {
      this.handleSubmit(value);
      return;
    }
    if (handleOnChange) {
      handleOnChange(value);
    }
  };

  render() {
    const { type, ...props } = this.props;
    const { propName, value } = this.props;
    props.propName = propName || 'content';
    props.value = value || '...';
    props.editProps = props.editProps || {
      style: {
        borderBottom: '2px solid #00BCD4',
      },
    };
    props.defaultProps = props.editProps || {
      style: {
        borderBottom: '2px solid #00BCD4',
      },
    };
    props.change = this.handleOnChange;
    switch (type) {
      case 'number': {
        return <RIENumber {...props} />;
      }
      case 'toggle': {
        return <RIEToggle {...props} />;
      }
      case 'textArea': {
        return <RIETextArea {...props} />;
      }
      case 'tags': {
        return <RIETags {...props} />;
      }
      case 'select': {
        return <RIESelect {...props} />;
      }
      default:
        return <RIEInput {...props} />;
    }
  }
}

export default connect()(InlineEditTable);
