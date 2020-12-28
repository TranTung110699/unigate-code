import React from 'react';
import { connect } from 'react-redux';
import apiUrls from 'api-endpoints';
import sagaActions from 'actions/node/saga-creators';
import { layouts } from 'configs/constants';
import { t1 } from 'translate';
import { getThemeConfig } from 'utils/selectors';
import ItemRender from './item';
import './stylesheet.scss';

class InProgress extends React.Component {
  className = 'course-in-progress';

  componentWillMount() {
    this.fetchMenuItems(this.props);
  }

  fetchMenuItems(params) {
    const { dispatch, mode } = params;
    const url = apiUrls.dashboard_configs(mode);
    dispatch(sagaActions.getDataRequest({ url, keyState: mode }, {}));
  }

  render() {
    const { coursesInProgress, rootPathIid, themeConfig } = this.props;

    return (
      <div className={this.className}>
        <div>
          {coursesInProgress && coursesInProgress.length > 0 && (
            <div className="col-md-12 col-sm-12 padding-b-40">
              <h4 className="uppercase mb40 text-center">
                {t1('courses_in_progress')}
              </h4>
              {coursesInProgress &&
                coursesInProgress.map((item, index) => (
                  <ItemRender
                    key={`${this.className}-${item.iid}-${index}`}
                    item={item}
                    rootPathIid={rootPathIid}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const mode = 'coursesInProgress';
  const coursesInProgress = state.dataApiResults[mode] || [];

  return {
    mode,
    coursesInProgress,
    themeConfig: getThemeConfig(state),
  };
};

export default connect(mapStateToProps)(InProgress);
