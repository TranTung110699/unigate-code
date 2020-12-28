import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/common/Icon';
import Warning from 'components/common/Warning';
import Alert from 'antd/lib/alert';

const FrontendTemis = ({ location }) => {
  return (
    <div>
      <h1>
        <Link to="/temis">
          <Icon icon="profile" antIcon /> TEMIS - Hệ quản trị thông tin nghề
          nghiệp & bồi dưỡng giáo viên{' '}
        </Link>
      </h1>
      <div>
        <Alert
          type="info"
          showIcon
          style={{ width: 'fit-content', margin: '0 auto' }}
          message={
            <span>
              Nếu bạn gặp khó khăn khi điền biểu mẫu và cần trợ giúp, hãy tìm số
              điện thoại liên hệ ở đường dẫn sau:&nbsp;
              <br />
              <a href="https://taphuan.csdl.edu.vn/faq" target="_blank">
                <u>https://taphuan.csdl.edu.vn/faq</u>
              </a>
              {/*
                <br />
                Hoặc bạn có thể trao đổi ở diễn dàn:
                <br />
                <a href="https://taphuan-forum.csdl.edu.vn/" target="_blank">
                  https://taphuan-forum.csdl.edu.vn/
                </a>
             */}
            </span>
          }
        />
      </div>
    </div>
  );
};

export default FrontendTemis;
