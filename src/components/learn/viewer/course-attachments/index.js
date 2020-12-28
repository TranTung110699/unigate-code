import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import { connect } from 'react-redux';
import {
  ListAttachmentsToDownload,
  ListAttachmentsToDownloadAsTable,
} from 'components/common/attachment/DownloadAttachments';
import { t1 } from 'translate';

class CourseAttachments extends Component {
  render() {
    const { syllabus, type } = this.props;
    const attachments = lodashGet(syllabus, 'download_materials');

    return (
      <div>
        {Array.isArray(attachments) && attachments.length ? (
          type === 'table' ? (
            <ListAttachmentsToDownloadAsTable attachments={attachments} />
          ) : (
            <ListAttachmentsToDownload attachments={attachments} />
          )
        ) : (
          <div>{t1('no_downloadable_materials_for_course')}</div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    syllabus: lodashGet(state, `tree.${props.syllabusIid}`),
  };
};

CourseAttachments.propTypes = {
  syllabusIid: PropTypes.number,
};

CourseAttachments.defaultProps = {
  syllabusIid: -1,
};

// takes syllabusIid as attribute
export default connect(mapStateToProps)(CourseAttachments);
