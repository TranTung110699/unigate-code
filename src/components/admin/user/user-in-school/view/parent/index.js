import React, { Component } from 'react';
import { t1 } from 'translate';
import BasicUserInfo from '../BasicUserInfo';
import ParentInfo from './ParentInfo';

import { connect } from 'react-redux';
import ChildrenOfParent from './ChildrenOfParent';
import Widget from 'components/common/Widget';

const styles = { minHeight: '150px' };

class ViewParentDashboard extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Widget title={t1('children_of_parent')}>
              <ChildrenOfParent user={user} />
            </Widget>
          </div>

          <div className="col-md-6">
            <Widget title={t1('parent_information')}>
              <BasicUserInfo user={user} />
              <ParentInfo user={user} />
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

export default ViewParentDashboard;
