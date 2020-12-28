import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CollaboratingItemComment from 'components/common/comment/collaborating-item-comment';
import SyllabusComment from 'components/common/comment/syllabus-comment';
import { isSurvey } from 'components/admin/node/utils';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import { t1 } from 'translate';
import commentActions from 'actions/comment/index';

class CommentSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCommentMode: 'item',
    };
  }

  handleCommentSuccessfully = () => {
    const { dispatch } = this.props;
    dispatch(commentActions.notifyCommentChanged());
  };

  handleResolvedCommentSuccessfully = () => {
    const { dispatch } = this.props;
    dispatch(commentActions.notifyCommentChanged());
  };

  render() {
    const {
      course,
      isPreview,
      learnItem,
      location,
      syllabus,
      doingItem,
      className,
    } = this.props;

    const linkToItem = `${location.pathname}${location.search}`;

    return (
      <div className={`comment-syllabus ${className}`}>
        {isPreview ? (
          <RadioButtonGroup
            defaultSelected={'item'}
            onChange={(event, value) => {
              this.setState({ selectedCommentMode: value });
            }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <RadioButton
              value="item"
              label={t1('comment_on_collaborating_item')}
            />
            <RadioButton value="syllabus" label={t1('comment_on_syllabus')} />
          </RadioButtonGroup>
        ) : (
          ''
        )}
        {Object.keys(course).length !== 0 && course.constructor === Object ? (
          this.state.selectedCommentMode === 'syllabus' &&
          course.ntype === 'syllabus' ? (
            <div>
              <SyllabusComment
                syllabus={syllabus}
                syllabusIid={syllabus.iid}
                isLearn={!isPreview}
                onSendCommentSuccessfully={this.handleCommentSuccessfully}
                onResolvedCommentSuccessfully={
                  this.handleResolvedCommentSuccessfully
                }
              />
            </div>
          ) : !isSurvey(learnItem) ? (
            <CollaboratingItemComment
              syllabusIid={syllabus.iid}
              courseIid={course.iid}
              collaboratingItemId={doingItem && doingItem.id}
              collaboratingItem={learnItem}
              linkToItem={linkToItem}
              isLearn={!isPreview}
              onSendCommentSuccessfully={this.handleCommentSuccessfully}
              onResolvedCommentSuccessfully={
                this.handleResolvedCommentSuccessfully
              }
            />
          ) : null
        ) : null}
      </div>
    );
  }
}

export default connect()(withRouter(CommentSection));
