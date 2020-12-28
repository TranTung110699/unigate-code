import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import { t2 } from 'translate';
import { getThemeConfig } from 'utils/selectors';
import { layouts } from 'configs/constants';
import schema from 'components/admin/school/school/schema/form';

class Form extends Component {
  render() {
    const { mode, node, themeConfig } = this.props;
    let { step } = this.props;
    const title = this.props.title || t2('new_school');
    const formid = this.props.formid || 'new_school';

    if (step === 'info' && themeConfig.layout === layouts.UMS) {
      step = 'info_ums';
    }

    return (
      <div>
        <NodeNew
          title={title}
          ntype={'school'}
          schema={schema}
          mode={mode}
          step={step}
          node={node}
          closeModal
          formid={formid}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    themeConfig: getThemeConfig(state),
  };
};
export default connect(mapStateToProps)(Form);
