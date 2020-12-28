import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import sagaActions from 'actions/saga-creators';
import DisplayHtml from 'components/common/html';
import LinearProgress from 'material-ui/LinearProgress';
import Links from 'routes/links';
import Perm from 'common/utils/Perm';
import Image from 'common/images/default-learning-material-avatar.png';
import './stylesheet.scss';

class CategoryCourseItem extends PureComponent {
  linkStyle = { background: 'white' };
  divStyle = { maxHeight: '80px', overflow: 'hidden' };

  constructor(props) {
    super(props);
    this.state = {
      pathActive: null,
      dataViewer: [],
    };
  }

  componentWillMount() {
    this.getProgressTracking();
  }

  componentWillReceiveProps(nextProps) {
    const { isGuest } = this.props;
    if (isGuest && nextProps && !nextProps.isGuest) {
      this.getProgressTracking();
    }
  }

  getProgressTracking = () => {
    const item = this.props.item || {};
    const { dispatch } = this.props;
    const params = {
      tcos: item.iid,
      children: 1,
      depth: 4,
    };
    dispatch(sagaActions.trackerProgressGet(params));
  };

  render() {
    const { item, index, isGuest } = this.props;
    const progress = this.props.progress || {};
    const p = progress[item && item.iid] || {};
    const colorDefault = '#47b5ff';
    const classInprogress = p.cp ? 'course-in-progress' : '';
    const style = {};
    if (item.bg_color) {
      style.backgroundColor = item.bg_color || colorDefault;
    } else if (item.avatar) {
      style.backgroundImage = `url(${item.avatar})`;
      style.backgroundSize = 'cover';
    } else {
      style.backgroundImage = `url(${Image})`;
      style.backgroundSize = 'cover';
      style.backgroundPosition = 'center';
      style.objectFit = 'cover';
    }

    const styleContent = {
      color: item.bg_color,
      textAlign: 'left',
      margin: 0,
      padding: '15px',
    };
    const styleItemProgress = { padding: '0px 15px 15px 15px' };
    return (
      <div className="ui-course-viewer" key={item.iid || index}>
        <Link
          className="link-wrap-item"
          to={Links.overviewCourseByPath(null, item)}
          style={this.linkStyle}
        >
          <div
            className={`course-header ${classInprogress}`}
            style={style}
            title={item.name}
          >
            {item.bg_color && (
              <div>
                <div className="title">{item.name_mobile || item.name}</div>
                <div className="content" style={this.divStyle}>
                  <DisplayHtml content={item.content_mobile || item.content} />
                </div>
              </div>
            )}
          </div>
          <p style={styleContent}>{item.name}</p>
          {!isGuest && (
            <div className="item-progress" style={styleItemProgress}>
              <div
                className="progress-title"
                style={{ width: `${p.cp || 0}%` }}
              >{`${p.cp || 0}%`}</div>
              <LinearProgress
                className="progress"
                color="#ffa14d"
                mode="determinate"
                value={p.cp}
              />
            </div>
          )}
        </Link>
      </div>
    );
  }
}

CategoryCourseItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  progress: PropTypes.objectOf(PropTypes.any),
};

CategoryCourseItem.defaultProps = {
  item: {},
  index: '',
  progress: {},
};

const mapStateToProps = (state) => ({
  isGuest: Perm.isGuest(),
  progress: state.trackerProgress,
});

export default connect(mapStateToProps)(CategoryCourseItem);
