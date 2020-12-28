/**
 * Created by Peter Hoang Nguyen on 4/6/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars';
import UserLeftMenuItem from './UserLeftMenuItem';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class LeftMenuApp extends React.Component {
  style = { height: '1000px' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { scrollStyle, scrollSpeed } = this.props;

    return (
      <div className="ui-left-menu-body" style={this.style}>
        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <UserLeftMenuItem />
          <div className="ui-left-menu-list">
            <div className="menu-header menu-panel">{t1('functions')}</div>
          </div>
        </Scrollbars>
      </div>
    );
  }
}

LeftMenuApp.childContextTypes = {
  muiTheme: PropTypes.shape().isRequired,
};

export default connect()(LeftMenuApp);
