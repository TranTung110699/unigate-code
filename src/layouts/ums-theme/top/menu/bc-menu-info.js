import React from 'react';

class MenuTopInfo extends React.Component {
  divStyle = { padding: 0 };

  render() {
    return (
      <div className="menu-top-info bc-top-info">
        <div className="container" style={this.divStyle}>
          <div className="row menu-top-info-content">
            <div className="col-md-7">
              <div className="top-bar-contact">
                <span>
                  <a href="tel:(028) 73 011 880">
                    <i className="fa fa-phone" />
                    (028) 73 011 880
                  </a>
                </span>
                <span>
                  <a href="mailto:info@broward.edu.vn">
                    <i className="fa fa-envelope-o" />
                    info@broward.edu.vn
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
