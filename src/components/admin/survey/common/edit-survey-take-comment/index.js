import React, { Component } from 'react';
import PropTypes from 'prop-types';
import lodashGet from 'lodash.get';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Form from './Form';
import { t1 } from 'translate';

class Comment extends Component {
  getComment = () => {
    const { take } = this.props;
    return lodashGet(take, `comment`);
  };

  renderFull = () => {
    const { take, takeIdsToSaveAnswer, searchFormId } = this.props;
    return (
      <Form
        searchFormId={searchFormId}
        formid={`edit_survey_comment_${lodashGet(take, 'id')}`}
        comment={this.getComment()}
        takeIdsToSaveAnswer={takeIdsToSaveAnswer || [lodashGet(take, 'id')]}
      />
    );
  };

  textPreview = () => this.getComment() || '...';

  dialogOptionsProperties = () => ({
    title: t1('save_survey_comment'),
  });

  render() {
    return (
      <DetailOnDialog
        {...this.props}
        dialogOptionsProperties={this.dialogOptionsProperties()}
        textPreview={this.textPreview()}
        renderFull={this.renderFull}
      />
    );
  }
}

Comment.propTypes = {
  take: PropTypes.shape(),
  takeIdsToSaveAnswer: PropTypes.arrayOf(PropTypes.string),
  searchFormId: PropTypes.string,
};

export default Comment;
