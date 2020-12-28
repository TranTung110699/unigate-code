import React, { Component } from 'react';
// import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import { t1 } from 'translate';

const style = { width: '500px', margin: '0 auto' };

class InitializeSchool extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  render() {
    return (
      <div style={style}>
        <h1>
          {t1('congratulations, you_have_set_up_your_school_successfully')}
        </h1>
        Links: <a href="/admin">admin</a>
      </div>
    );
  }
}

export default connect()(InitializeSchool);
