import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import translateSchema from 'components/admin/translate/schema/form';
import get from 'lodash.get';
import { getTranslateScope } from '../utils';

class Form extends Component {
  render() {
    const { mode, step, node, translateScope } = this.props;
    const title = this.props.title;
    const formid = this.props.formid || 'new_translate';

    let hiddenFields;

    if (translateScope === 'school') {
      hiddenFields = {
        site: this.props.school,
      };
    }

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'translate'}
          schema={translateSchema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          searchFormId="translate_search"
          formid={formid}
          hiddenFields={hiddenFields}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const pathname = window.location.pathname;

  // could be /system/translate or /school/conf/translate
  const translateScope = getTranslateScope(pathname);
  const school = get(state, 'domainInfo.school.slug');

  return { translateScope, school };
};

export default connect(mapStateToProps)(Form);
