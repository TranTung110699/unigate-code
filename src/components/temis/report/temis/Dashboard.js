import React, { Component } from 'react';
import Widget from 'components/common/Widget';
import { Link } from 'react-router-dom';

class AdminTemisDashboard extends Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <Widget title="TCNNGV & TCNN HT">
              <div>
                <Link to="/admin/temis/tcnn-report?type=gv">Giáo Viên</Link>
              </div>
              <div>
                <Link to="/admin/temis/tcnn-report?type=ht">
                  Hiệu Trưởng & Phó Hiệu Trưởng
                </Link>
              </div>
            </Widget>
          </div>

          <div className="col-md-6">
            <Widget title="Nhu Cầu Bồi Dưỡng Thường Xuyên ">
              <div>
                <Link to="/admin/temis/bdtx/2019-2020">Năm học 2019-2020</Link>
              </div>
            </Widget>
          </div>
          {/*
            <div className="col-md-6">
              <Widget title="Thông Tin Nghề Nghiệp GV">
                <div>
                  <Link to="#">Thông Tin Nghề Nghiệp GV</Link>
                </div>
              </Widget>
            </div>
*/}
        </div>
        <div className="row">
          <div className="col-md-6">
            <Widget title="Thông tin tổ chức">
              <div>
                <div>
                  <Link to="/admin/temis/organization-learning-report">
                    Báo cáo tình trạng học tập của tổ chức
                  </Link>
                </div>
                <div>
                  <Link to="/admin/temis/organization-can-bo-cot-can-report">
                    Báo cáo tình trạng cán bộ cốt cán của tổ chức
                  </Link>
                </div>
              </div>
            </Widget>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminTemisDashboard;
