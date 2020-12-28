import React from 'react';

class MenuTopInfo extends React.Component {
  divStyle = { padding: 0 };

  render() {
    return (
      <div className="menu-top-info wu-top-info">
        <div className="container" style={this.divStyle}>
          <div className="row menu-top-info-content">
            <div className="col-md-7">
              <div className="top-bar-contact">
                <span>
                  <a href="tel:094.651.1010">
                    <i className="fa fa-phone" /> 094.651.1010
                  </a>
                </span>
                <span>
                  <a href="mailto:info@wu.edu.vn">
                    <i className="fa fa-envelope-o" /> info@wu.edu.vn
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
