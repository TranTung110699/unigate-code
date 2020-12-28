import React from 'react';
import Paper from 'material-ui/Paper';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import Icon from 'components/common/Icon';
import { Link } from 'react-router-dom';
import './TeachersFeedback.scss';

class TeachersFeedback extends React.Component {
  render() {
    const { comments } = this.props;

    return (
      <div className="comments-feedback">
        <h3 className="title">Comments</h3>
        {comments.map((comment, cIndex) => (
          <Paper key={`comments-${cIndex}`} className="comment-feedback">
            <div className="row">
              <div className="col-md-2">
                <h3>{comment.u && comment.u.name}</h3>
              </div>
              <div className="col-md-10">
                {comment.content && <p>{comment.content}</p>}
                {comment.attachments && comment.attachments.length && (
                  <div>
                    <Icon icon="attachment" /> {t1('attachments')}
                    <ul>
                      {comment.attachments.map((attachment, i) => (
                        <li key={attachment.id || i}>
                          <Link to={attachment.link} target="_blank">
                            {attachment.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </Paper>
        ))}
      </div>
    );
  }
}

TeachersFeedback.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape()),
};

TeachersFeedback.defaultProps = {
  comments: [],
};

export default TeachersFeedback;
