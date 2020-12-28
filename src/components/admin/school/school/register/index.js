import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import { t2 } from 'translate';
import schoolSchema from '../schema/form';

const style = { width: '500px', margin: '0 auto' };

class Register extends Component {
  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  onRequestSuccessful = (json) => {
    if (json.success) {
      const redirectTo = `http://${json.result.slug}.${
        window.APP_SAAS_DOMAIN
      }/initialize`;
      window.location.assign(redirectTo);
    }
  };

  render() {
    const mode = 'new';
    const step = '';
    const title = t2('new_school');
    const formid = 'new_school';

    return (
      <div style={style}>
        <NodeNew
          schema={schoolSchema}
          title={title}
          ntype={'school'}
          mode={mode}
          step={step}
          closeModal
          formid={formid}
          requestSuccessful={this.onRequestSuccessful}
        />
      </div>
    );
  }
}

export default connect()(Register);
