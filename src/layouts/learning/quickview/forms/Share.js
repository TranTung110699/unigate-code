import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { t4 } from 'translate';

/**
 * Created by Ha Viet Duc
 * created date 23/04/2017
 **/
class Share extends React.Component {
  divStyle = { height: '1000px' };

  render() {
    const { bodyScreenSize } = this.props;
    return (
      <div>
        <div
          className="tab-panel"
          style={{ height: `${bodyScreenSize.height}px` }}
        >
          <div style={{ height: `${bodyScreenSize.height - 130}px` }}>
            <Scrollbars>
              <div className="content-panel" style={this.divStyle}>
                <h2>Tabs with slide effect</h2>
                Swipe to see the next slide.
                <br />
              </div>
            </Scrollbars>
          </div>
          <div className="footer">
            <button type="submit">{t4('share')}</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Share;
