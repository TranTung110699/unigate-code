import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import get from 'lodash.get';
import { t1 } from 'translate/index';
import SearchForm from './SearchForm';

class TCNNReport extends Component {
  render() {
    console.log(this.props);

    const type = get(this.props, 'match.params.type');

    return (
      <div className="whitebox">
        <h1>{t1('report_tcnn')}</h1>
        <SearchForm tcnn={`tcnn_${type}`} />
      </div>
    );
  }
}

export default connect()(withRouter(TCNNReport));
