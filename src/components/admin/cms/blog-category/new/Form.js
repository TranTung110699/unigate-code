import React, { Component } from 'react';
import NodeNew from 'components/admin/node/new';
import { connect } from 'react-redux';
import blog from 'components/admin/cms/blog-category/schema/form';

class Form extends Component {
  render() {
    const { mode, step, node } = this.props;
    const formid = this.props.formid || 'new_blog';
    const alternativeApi = this.props.alternativeApi;

    return (
      <div>
        <NodeNew
          ntype={'blog'}
          schema={blog}
          mode={mode}
          step={step}
          node={node}
          closeModal
          alternativeApi={alternativeApi}
          searchFormId="blog_search"
          formid={formid}
        />
      </div>
    );
  }
}

export default connect()(Form);
