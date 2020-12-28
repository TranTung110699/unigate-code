import React, { Component } from 'react';
import nodeSagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import ImageBackGround from 'components/common/views/image-background';
import FlyPanel from 'components/common/views/fly-panel';
import Menu from 'components/common/views/menu';
import { DefinedUrlParams } from 'routes/links/common';
import { trackUserViewCourseOutline } from 'configs/facebook-event';
import LayoutHelper from 'layouts/LayoutHelper';
import { connect } from 'react-redux';
import Configuration from 'configs/configuration';
import sagaActions from 'actions/saga-creators';
import { layouts } from 'configs/constants';
import { t1 } from 'translate';
import { getThemeConfig } from 'utils/selectors';

import PathMenu from './menu';
import LearningItem from './items';
import './stylesheet.scss';

class Layout extends Component {
  divStyle = { minHeight: '500px' };

  componentDidMount() {
    LayoutHelper.setLayout(this);
    const currentPathIid = this.getPathId();
    this.fetchSnippet(currentPathIid);
    this.fetchProgress(currentPathIid);
    trackUserViewCourseOutline({
      courseId: currentPathIid,
    });
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { themeConfig } = this.props;
    const currentPathIid = this.getPathId();
    const newPathIid = this.getPathId(nextProps);
    if (currentPathIid !== newPathIid) {
      this.fetchSnippet(newPathIid);
      this.fetchProgress(newPathIid);
    }
  }

  getPathId = (nextProps) => {
    let { match, piid } = nextProps || this.props;
    if (piid) {
      return piid;
    }
    match = match || {};
    const params = match.params || {};
    let pathId = params[DefinedUrlParams.PATH_IID];
    if (pathId) {
      pathId = parseInt(pathId);
    }
    return pathId;
  };
  fetchSnippet = (pathIid) => {
    const { dispatch, formid, match } = this.props;

    const config = {
      url: apiUrls.get_snippet,
      keyState: formid,
    };
    const params = {
      iid: pathIid,
      ntype: 'path',
      depth: 3,
      editing_syllabus: 1,
    };
    dispatch(nodeSagaActions.getDataRequest(config, params));
  };

  fetchProgress = (pathIid) => {
    const { dispatch } = this.props;
    const data = {
      tcos: pathIid,
      children: 1,
      depth: 4,
    };
    dispatch(sagaActions.trackerProgressGet(data));
  };

  renderPathViewer = (rootPathIid, learningItem) => {
    const { themeConfig } = this.props;

    return (
      <div className="ui-path-viewer">
        {themeConfig.layout === layouts.LOTUS ? (
          <div className="m-t-20">
            <h1>{learningItem && learningItem.name}</h1>
          </div>
        ) : (
          <PathMenu rootPathIid={rootPathIid} learningItem={learningItem} />
        )}

        <div className="m-t-20" />
        <div className="row">
          {learningItem &&
            learningItem.children &&
            learningItem.children.map((item, index) => {
              let parentClassName =
                item.ntype === 'course'
                  ? 'col-md-4 col-lg-4 col-sm-6 col-xs-12'
                  : '';
              parentClassName =
                themeConfig.layout !== layouts.ETEC
                  ? parentClassName
                  : 'col-md-12';

              return (
                <LearningItem
                  key={`learn-item-${index}` || index}
                  rootPathIid={rootPathIid}
                  item={item}
                  parentClassName={parentClassName}
                />
              );
            })}
        </div>
        {(!learningItem || !learningItem.children) && (
          <div className="text-center" style={this.divStyle}>
            {t1('there_are_no_courses_yet')}
          </div>
        )}
      </div>
    );
  };

  render() {
    const { learningItem, screenSize, viewLanding, themeConfig } = this.props;
    const learningPathConfig = Configuration.getLearningPathConfigById(
      this.getPathId(),
      Configuration.learningPaths,
    );
    const rootPathIid = this.getPathId();
    const cover =
      learningPathConfig && learningPathConfig.cover
        ? learningPathConfig.cover
        : '';
    if (viewLanding) {
      return this.renderPathViewer(rootPathIid, learningItem);
    }
    const learningItemName =
      learningItem && learningItem.name ? learningItem.name : '';

    return (
      <div className="path-wrapper">
        {themeConfig.layout !== layouts.LOTUS && (
          <div>
            <FlyPanel breakPoint={250}>
              <Menu type="fly" />
            </FlyPanel>
            <ImageBackGround width={screenSize.width} height={250} src={cover}>
              <Menu />
              <div className="container">
                <div className="row">
                  <div className="col-sm-12 text-center">
                    {learningPathConfig && learningPathConfig.name && (
                      <h3 className="course-name">{learningPathConfig.name}</h3>
                    )}
                  </div>
                </div>
              </div>
            </ImageBackGround>
          </div>
        )}

        <div className="container">
          <div className="row">
            {this.renderPathViewer(rootPathIid, learningItem)}
          </div>
        </div>
      </div>
    );
  }
}

Layout.defaultProps = {
  formid: 'learning_path_snippet',
  iid: 55229,
};

function mapStateToProps(state, props) {
  const formid = 'learning_path_snippet';
  const learningItem = state.dataApiResults[formid];

  return {
    learningItem,
    screenSize: state.common.screenSize,
    themeConfig: getThemeConfig(state),
  };
}

export default connect(mapStateToProps)(Layout);
