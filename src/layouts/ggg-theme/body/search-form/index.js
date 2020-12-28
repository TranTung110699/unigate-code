import React from 'react';
import './stylesheet.scss';

class SearchForm extends React.Component {
  render() {
    return (
      <div className="search-form">
        <div className="container">
          <div className="row">
            <div className="col-xs-5ths search-course">
              <h3>Tìm kiếm</h3>
              <h4>Khóa học</h4>
            </div>
            <div className="col-xs-5ths">
              <p>Chủ đề</p>
              <select name="">
                <option value="">select</option>
              </select>
            </div>
            <div className="col-xs-5ths">
              <p>Ngân hàng</p>
              <select name="">
                <option value="">select</option>
              </select>
            </div>
            <div className="col-xs-5ths">
              <p>Vị trí công việc</p>
              <select name="">
                <option value="">select</option>
              </select>
            </div>
            <div className="col-xs-5ths">
              <button>Tìm kiếm</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchForm;
