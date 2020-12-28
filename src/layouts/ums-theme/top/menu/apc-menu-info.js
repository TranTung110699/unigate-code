import React from 'react';
import { t1 } from 'translate';

class MenuTopInfo extends React.Component {
  divStyle = { padding: 0 };

  render() {
    return (
      <div className="menu-top-info">
        <div className="container" style={this.divStyle}>
          <div className="row menu-top-info-content">
            <div className="col-md-7">
              <div className="top-bar-contact">
                <span>
                  <a href="tel:(028) 5433 6888">
                    <i className="fa fa-phone" /> (028) 5433 6888
                  </a>
                </span>
                <span>
                  <a href="mailto:info@caodangvietmy.edu.vn">
                    <i className="fa fa-envelope-o" /> info@caodangvietmy.edu.vn
                  </a>
                </span>
              </div>
            </div>
            <div className="col-md-5">
              <div className="top-bar-menu">
                <ul id="menu-top-menu" className="topnav">
                  <a
                    href="http://www.caodangvietmy.edu.vn/thong-bao-tuyen-sinh/?utm_source=website_menu"
                    target="_blank"
                  >
                    {t1('admission')}
                  </a>
                  <a
                    href="http://www.caodangvietmy.edu.vn/category/chuyen-nganh-dao-tao/"
                    target="_blank"
                  >
                    {t1('Major')}
                  </a>
                  <a
                    href="http://www.caodangvietmy.edu.vn/category/su-kien/"
                    target="_blank"
                  >
                    {t1('event')}
                  </a>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuTopInfo;
