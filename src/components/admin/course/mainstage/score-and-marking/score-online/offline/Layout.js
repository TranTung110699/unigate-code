import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from 'components/admin/course/mainstage/score-and-marking/score-online/form-filter/schema-form';
import Results from './Results';
import NodeNew from 'components/admin/node/new';
// import attachResultSchema from '../../../schema/attach_answer/schema-form';
import attachResultSchema from 'components/admin/course/schema/attach_answer/schema-form.js';
import './stylesheet.scss';

class Layout extends Component {
  renderResultComponent = (items, props, objects, searchValues, resultId) => {
    const { node, formid } = props;

    return (
      <Results
        items={items}
        node={node}
        formid={formid}
        resultId={resultId}
        searchValues={searchValues}
        hasPermUpdateTranscriptStatus={this.props.hasPermUpdateTranscriptStatus}
      />
    );
  };

  render() {
    const { node, hasPermSubmitFileTranscript } = this.props;
    const hiddenFields = {
      course_iid: node.iid,
      syllabus_iid: node.syllabus,
    };

    return (
      <div>
        {hasPermSubmitFileTranscript && (
          <NodeNew
            ntype="course"
            schema={attachResultSchema}
            formid={'attach_results'}
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

export default connect()(Layout);
