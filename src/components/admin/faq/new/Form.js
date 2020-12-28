import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import faq from 'components/admin/faq/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node, searchFormId } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'new_faq';
    const hiddenFields = {
      _sand_is_system: 1,
      site: 'edx',
    };
    return (
      <div>
        <NodeNew
          title={title}
          ntype={'faq'}
          schema={faq}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId={searchFormId}
          formid={formid}
          hiddenFields={hiddenFields}
        />
      </div>
    );
  }
}

export default connect()(Form);
