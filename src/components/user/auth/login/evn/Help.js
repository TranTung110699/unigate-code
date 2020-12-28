import React, { Component } from 'react';
import { createSelector } from 'reselect';

class EvnLoginHelp extends Component {
  render() {
    return (
      <p style={{ marginBottom: 0 }}>
        <div>
          Học viên có thể dùng 1 trong 3 thông tin sau để đăng nhập
          <ol>
            <li>
              <b>Email</b> (ví dụ thongnq@evn.com.vn) Áp dụng cho EVNHCM{' '}
            </li>
            <li>
              <b>AD</b> (ví dụ CPC\ThongNQ) : Áp dụng cho EVNHCM, EVNHN,{' '}
            </li>
            <li>
              <b>ns_number</b> là 1 số gồm <b>6 chữ số</b>, (ví dụ 342563): Đối
              với các đơn vị như SPC, các học viên có thể dùng số này sau khi
              chọn Tổng Công Ty
            </li>
          </ol>
          Lưu ý: Nếu chọn phương án 3) bạn phải chọn Tổng Công Ty trước
        </div>
      </p>
    );
  }
}

export default EvnLoginHelp;
