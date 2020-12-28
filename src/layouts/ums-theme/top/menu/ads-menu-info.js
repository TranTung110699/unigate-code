import React from 'react';

class MenuTopInfo extends React.Component {
  divStyle = { padding: 0 };

  render() {
    return (
      <div className="menu-top-info ads-top-info">
        <div className="container" style={this.divStyle}>
          <div className="row menu-top-info-content">
            <div className="col-md-7">
              <div className="top-bar-contact">
                <span>
                  <a href="tel:+84 911 139 776">
                    <i className="fa fa-phone" />
                    +84 911 139 776
                  </a>
                </span>
                <span>
                  <a href="mailto:ads@adsvietnam.edu.vn">
                    <i className="fa fa-envelope-o" />
                    ads@adsvietnam.edu.vn
                  </a>
                </span>
              </div>
            </div>
            <div className="col-md-5" />
          </div>
        </div>
      </div>
    );
  }
}

export default MenuTopInfo;
