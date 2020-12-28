import React, { Component } from 'react';
import { t1 } from 'translate';
// import PropTypes from 'prop-types';
// import VarDump from 'components/common/VarDump';
import { connect } from 'react-redux';
import { change, getFormValues } from 'redux-form';
import FlatButton from 'components/common/mui/FlatButton';
import Request from 'common/network/http/Request';
// import Store from 'store';
import actions from 'actions/node/creators';
import Viewer from './Viewer';

// import king from './king';

class DictionaryViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      term: null,
      show: false,
    };
    this.copyFromDictionary = this.copyFromDictionary.bind(this);
    this.addExample = this.addExample.bind(this);
  }

  copyFromDictionary(key, val) {
    this.props.dispatch(change(this.props.formid, key, val));
    this.props.dispatch(actions.snackbar(true, t1('added')));
  }

  addExample(example) {
    const examples = this.props.values.examples || [];
    // check if example already exists
    let exists;
    if (examples.length) {
      examples.map((ex) => {
        if (ex.name === example.name && ex.vname === example.vname)
          exists = true;
      });
    }
    if (!exists) {
      this.props.dispatch(
        change(this.props.formid, 'examples', [...examples, example]),
      );
      this.props.dispatch(actions.snackbar(true, t1('example_added')));
    }
  }

  view() {
    // simple hide if it's currently shown
    if (this.state.show) {
      this.setState({ show: false });
      return;
    }

    const { values } = this.props;
    const name = (values && values.name) || '';
    if (name) {
      Request.get('/dictionary/api/get', { q: name }).then((response) => {
        if (response.success) {
          this.setState({ term: response.result, show: true });
        }
      });
    }
  }

  render() {
    return (
      <div>
        {this.props.values && this.props.values.name && (
          <FlatButton
            primary={this.state.show}
            onClick={() => {
              this.setState({ show: !this.state.show });
              this.view();
            }}
          >
            {this.state.show ? '-' : '+'} View Dictionary
          </FlatButton>
        )}
        {this.state.show && this.state.term && (
          <Viewer
            term={this.state.term}
            copyFromDictionary={this.copyFromDictionary}
            addExample={this.addExample}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    values: getFormValues(props.formid)(state),
  };
};

export default connect(mapStateToProps)(DictionaryViewer);
