import React from 'react';
import Icon from 'components/common/Icon';
import { t1 } from 'translate';
import PropTypes from 'prop-types';

const Index = ({
  title,
  item,
  label,
  totalComment,
  handleExpandComment,
  showDetailComments,
}) => (
  <div className="action-bar" onClick={handleExpandComment}>
    {title || (
      <div className="action-bar__left">
        {label}
        :&nbsp;
        <span> {item && (item.name || item.help_text)}</span>{' '}
        {/*-{' '}
        <span className="text-muted">#{item && item.iid}</span>*/}
        <div className="number-comment-wrapper--mobile">
          <span className="number-comment">
            &nbsp;&nbsp;({totalComment || 0} {t1('comments')})
          </span>
        </div>
      </div>
    )}
    <div className="action-bar__right">
      <div className="number-comment-wrapper--desktop">
        <span className="number-comment">
          &nbsp;&nbsp;({totalComment || 0} {t1('comments')})
        </span>
      </div>
      <div className="expand-icon">
        <Icon icon={showDetailComments ? 'angle_down' : 'angle_up'} />
      </div>
    </div>
  </div>
);

Index.propTypes = {
  item: PropTypes.shape(),
  title: PropTypes.string,
  label: PropTypes.string,
  totalComment: PropTypes.number,
  handleExpandComment: PropTypes.shape(),
  showDetailComments: PropTypes.bool,
};

Index.defaultProps = {
  item: null,
  title: '',
  label: '',
  totalComment: 0,
  handleExpandComment: () => {},
  showDetailComments: false,
};

export default Index;
