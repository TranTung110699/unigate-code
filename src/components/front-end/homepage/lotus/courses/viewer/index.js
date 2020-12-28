/**
 * Created by hungvo on 17/07/17.
 */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FlatButton from 'components/common/mui/FlatButton';
import sagaActions from 'actions/saga-creators';
import DisplayHtml from 'components/common/html';
import { t, t1 } from 'translate';
import LinearProgress from 'material-ui/LinearProgress';
import { goToAnchor } from 'react-scrollable-anchor';
import Perm from 'common/utils/Perm';
import Links from 'routes/links';
import VirtualClass from './class';

class ExampleCourses extends React.Component {
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
    this.setDataViewer();
    this.getProgressTracking();
  }

  componentWillReceiveProps(nextProps) {
    const { isGuest } = this.props;
    if (isGuest && nextProps && !nextProps.isGuest) {
      this.getProgressTracking();
    }
  }

  setDataViewer = (pathId) => {
    let pathActive = null;
    let dataViewer = [];
    if (pathId) {
      pathActive = pathId;
    }
    const data = this.props.data || {};
    const children = data.children || [];
    children.forEach((chil = {}) => {
      if (!pathActive && chil.iid) {
        pathActive = chil.iid;
      }
      if (pathActive === chil.iid) {
        if (chil.children && chil.children.length) {
          dataViewer = chil.children;
        } else {
          dataViewer = [chil];
        }
      }
    });
    if (!pathActive || !dataViewer.length) {
      pathActive = 'virtual-class';
    }
    this.setState({
      pathActive,
      dataViewer,
    });
    if (pathId) {
      goToAnchor('example-courses');
    }
  };

  getProgressTracking = () => {
    const data = this.props.data || {};
    const { dispatch } = this.props;
    const params = {
      tcos: data.iid,
      children: 1,
      depth: 4,
    };
    dispatch(sagaActions.trackerProgressGet(params));
  };

  render() {
    const data = this.props.data || {};
    const progress = this.props.progress || {};
    const children = data.children || [];
    const { pathActive, dataViewer } = this.state;
    return (
      <div>
        <div className="ui-paths-menu">
          <ul className="paths-menu">
            {children.map((path, index) => (
              <li
                key={`path-${path.iid}` || index}
                className={path.iid === pathActive ? `active ${path.iid}` : ''}
              >
                <FlatButton
                  label={path.name}
                  onTouchTap={() => {
                    this.setDataViewer(path.iid);
                  }}
                />
              </li>
            ))}
            <li className={pathActive === 'virtual-class' ? 'active' : ''}>
              <FlatButton
                label={t1('virtual_class')}
                onTouchTap={() => {
                  this.setDataViewer('virtual-class');
                }}
                flatButton
              />
            </li>
          </ul>
        </div>
        {pathActive === 'virtual-class' ? (
          <div>
            <div className="bg-secondary lotus-live-intro">
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3>{t('LotusLMS_Virtual_Class')}</h3>
                  </div>
                </div>
                <div className="row mb32 mb-xs-24">
                  <div className="col-md-12 col-sm-12 text-center">
                    <p>
                      {t1('virtual_classes_are_a_totally_new_way_to_learn_to')}
                      {t('.')} <br />
                      {t1(
                        'via_the_Internet,_you_can_interact_with_teachers_&_classmates_just_like_a_traditional_classroom',
                      )}
                      {t('.')}
                    </p>
                  </div>
                  <div className="col-md-12 text-center trial-to-learn-btn">
                    <a href="#lotus-class" className="uppercase">
                      {t1('try_the_virtual_class')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <VirtualClass />
          </div>
        ) : (
          <div className="ui-path-viewer container">
            <div className="col-md-12 col-lg-12 col-sm-12 col-xs-12">
              {dataViewer &&
                dataViewer.length &&
                dataViewer.map((item, index) => {
                  const p = progress[item && item.iid] || {};
                  const colorDefault = '#47b5ff';
                  const classInprogress = p.cp ? 'course-in-progress' : '';
                  const style = {};
                  if (item.bg_color) {
                    style.backgroundColor = item.bg_color || colorDefault;
                  } else if (item.avatar) {
                    style.backgroundImage = `url(${item.avatar})`;
                    style.backgroundSize = 'cover';
                  }

                  const styleContent = {
                    color: item.bg_color,
                    textAlign: 'left',
                    margin: 0,
                    padding: '15px 15px 0px 15px',
                  };
                  const styleItemProgress = { padding: '0px 15px 15px 15px' };
                  return (
                    <div className="col-md-4 col-lg-4 col-sm-6 col-xs-12 item">
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
                                <div className="title">
                                  {item.name_mobile || item.name}
                                </div>
                                <div className="content" style={this.divStyle}>
                                  <DisplayHtml
                                    content={
                                      item.content_mobile || item.content
                                    }
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                          <p style={styleContent}>{item.name}</p>
                          {
                            <div
                              className="item-progress"
                              style={styleItemProgress}
                            >
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
                          }
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isGuest: Perm.isGuest(),
  progress: state.trackerProgress || {},
});

export default connect(mapStateToProps)(ExampleCourses);
