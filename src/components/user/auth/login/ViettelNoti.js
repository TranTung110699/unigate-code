import React from 'react';

class ViettelNoti extends React.Component {
  render() {
    return (
      <div>
        <h1>
          Nhiệt liệt chào mừng Quý thầy, cô đã đến với khoá bồi dưỡng báo cáo
          viên nguồn!
        </h1>
        <br />
        <div>
          Khoá học được tổ chức bởi Dự án Hỗ trợ đổi mới giáo dục phổ thông
          (Renovation of General Education Project - RGEP), Bộ Giáo dục và Đào
          tạo. Nền tảng hỗ trợ học qua mạng được hỗ trợ bởi Tập đoàn Viettel.
        </div>
        <br />
        <div>
          Khoá học được tổ chức theo hình thức học kết hợp giữa qua mạng và trực
          tiếp với mục tiêu giúp Quý thầy, cô:
        </div>
        <ul>
          <li>
            Nâng cao hiểu biết về Chương trình giáo dục phổ thông tổng thể và
            Chương trình giáo dục phổ thông theo từng môn học.
          </li>
          <li>
            {' '}
            Phát triển được khả năng xây dựng nội dung, tài liệu, phương thức
            bồi dưỡng giáo viên và cán bộ quản lý giáo dục phổ thông để thực
            hiện Chương trình giáo dục phổ thông mới.
          </li>
          <li>
            Tổ chức được lớp bồi dưỡng theo hình thức học kết hợp giữa qua mạng
            và trực tiếp.
          </li>
        </ul>
        <div>
          Khoá học hỗ trợ Quý thầy, cô tự học qua mạng từ ngày{' '}
          <b>19/4/2019 đến ngày 22/4/2019</b>; hỗ trợ học trực tiếp từ ngày{' '}
          <b>23/4/2019 đến ngày 25/4/2019</b>.
        </div>
        <br />
        <br />
        Thông tin liên quan đến khoá học:
        <br />- Về mặt chuyên môn, Quý thầy, cô liên hệ với Ban quản lí Dự án
        RGEP qua email: <b>rgep@moet.gov.vn</b>
        <br />- Về mặt kĩ thuật, Quý thầy, cô liên hệ với số hotline:{' '}
        <b>0988 11 22 86</b>
        <br />
        <br />
        Trân trọng./.
        <br />
        Ban tổ chức lớp bồi dưỡng báo cáo viên nguồn.
      </div>
    );
  }
}

export default ViettelNoti;
