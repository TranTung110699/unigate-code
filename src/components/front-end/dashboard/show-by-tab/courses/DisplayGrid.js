import React from 'react';
import isEqual from 'lodash.isequal';
import { connect } from 'react-redux';
import sagaActions from 'actions/saga-creators';
import CourseItem from 'components/front-end/course/in-grid';

class DisplayGrid extends React.Component {
  componentDidMount() {
    const { items } = this.props;
    this.getProgressTracking(items);
  }

  componentWillReceiveProps(nextProps) {
    if (isEqual(this.props.items, nextProps.items)) {
      this.getProgressTracking(nextProps.items);
    }
  }

  getProgressTracking = (data) => {
    const { dispatch, node } = this.props;
    if (!Array.isArray(data) || !data.length) {
      return;
    }

    const params = {
      tcos: data.map((row) => row && row.iid),
      userIid: node && node.iid,
    };
    dispatch(sagaActions.trackerProgressGet(params));
  };

  render() {
    const {
      items,
      mode,
      display,
      hasAction,
      rootPathIid,
      viewUserIid,
      showDescription,
      renderAfter,
    } = this.props;

    return (
      <React.Fragment>
        {(items &&
          items.length > 0 &&
          items.map((item) => (
            <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
              <CourseItem
                showDescription={showDescription}
                item={item}
                rootPathIid={rootPathIid || ''}
                mode={mode}
                hasAction={hasAction}
                display={display}
                viewUserIid={viewUserIid}
              />
            </div>
          ))) ||
          null}
        {renderAfter && renderAfter()}
      </React.Fragment>
    );
  }
}

export default connect()(DisplayGrid);
