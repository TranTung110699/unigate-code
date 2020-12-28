import React from 'react';
import './PageWrapper.scss';
import { connect } from 'react-redux';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import { layouts } from 'configs/constants';

class Wrapper extends React.Component {
  render() {
    const { title, layout } = this.props;

    if (layout === layouts.GJ)
      return (
        <div className="gj-front-end-courses">
          <div className="col-md-12">
            <h3 className="uppercase">{title}</h3>
            <hr className="indicator" />
          </div>
          {this.props.children}
        </div>
      );

    return (
      <div className="front-end-courses">
        <div className="col-md-12">
          <h3 className="uppercase">{title}</h3>
          <hr className="indicator" />
        </div>
        {this.props.children}
      </div>
    );
  }
}

export default connect()(withSchoolConfigs(Wrapper));
