import React, { Component } from 'react';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FAQ from 'components/front-end/faq';
import Alert from 'antd/lib/alert';

class EtepHelp extends Component {
  showHelp = ({ closeDialog }) => {
    return <FAQ isLogin />;
  };

  render() {
    return (
      <Alert
        message={
          <div className="row">
            Nếu có khó khăn về việc tài khoản để đăng nhập hệ thống, vui lòng
            tìm hỗ trợ:&nbsp;
            <DetailOnDialog
              renderPreview={({ showFull }) => (
                <span
                  onClick={showFull}
                  style={{
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    fontWeight: 'bold',
                  }}
                >
                  tại đây
                </span>
              )}
              renderFull={this.showHelp}
              dialogKey="loginHelpDialog"
              dialogOptionsProperties={{
                title: 'Trợ Giúp Đăng Nhập ',
                width: '90%',
                handleClose: true,
              }}
            />
          </div>
        }
        type="info"
        showIcon
      />
    );
  }
}

export default EtepHelp;
