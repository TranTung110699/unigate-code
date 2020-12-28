import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import { isK12 } from 'common/k12';

import NodeNew from 'components/admin/node/new';
import schema from 'components/admin/course/mainstage/score-and-marking/score-online/form-filter/schema-form';
import { connect } from 'react-redux';
import { skillScaleOptionsSelector } from 'components/admin/skill/skill/utils';
import Results from './Results';
import attachResultSchema from 'components/admin/course/schema/attach_answer/schema-form.js';
import './stylesheet.scss';
// import attachResultSchema from '../../../schema/attach_answer/schema-form';

class Layout extends Component {
  renderResultComponent = (
    graduationUsers,
    props,
    objects,
    searchValues,
    resultId,
  ) => {
    const { node, formid } = props;

    return (
      <Results
        node={node}
        formid={formid}
        resultId={resultId}
        searchValues={searchValues}
        {...graduationUsers}
        permissions={this.props.permissions}
        hasPermission={this.props.hasPermission}
        hasPermUpdateTranscriptStatus={this.props.hasPermUpdateTranscriptStatus}
      />
    );
  };

  render() {
    const { node, hasPermSubmitFileTranscript, k12 } = this.props;

    const hiddenFields = {
      course_iid: node.iid,
      syllabus_iid: node.syllabus,
    };

    return (
      <div>
        {!k12 && hasPermSubmitFileTranscript && (
          <NodeNew
            ntype="course"
            schema={attachResultSchema}
            formid={'attach_results_of_normal_course'}
            mode={'edit'}
            step={'attach_result_files'}
            node={node}
            closeModal
          />
        )}
        <SearchWrapper
          formid="get_graduation_users"
          showResult
          schema={schema}
          hiddenFields={hiddenFields}
          {...this.props}
          renderResultsComponent={this.renderResultComponent}
          showQueryField={false}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  k12: isK12(state),
  scaleOptions: skillScaleOptionsSelector(state),
});

export default connect(mapStateToProps)(Layout);
