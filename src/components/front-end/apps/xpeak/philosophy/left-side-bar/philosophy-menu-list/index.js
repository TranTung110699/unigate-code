import React from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import './stylesheet.scss';
import './mobile.scss';

class PhilosophyMenuList extends React.Component {
  getActiveClassByMode(currentMode, mode) {
    if (currentMode === mode) {
      return 'active';
    }

    return '';
  }

  render() {
    let { mode } = this.props;
    mode = mode || 'symptoms';
    return (
      <div className="xpeak-philosophy">
        <ul>
          <li>
            <Link
              to="/philosophies/symptoms"
              className={`symptom ${this.getActiveClassByMode(
                mode,
                'symptoms',
              )}`}
            >
              <p>Triệu chứng căn bệnh</p>
            </Link>
          </li>
          <br />
          <li>
            <Link
              to="/philosophies/habits"
              className={`blood-plus ${this.getActiveClassByMode(
                mode,
                'habits',
              )}`}
            >
              <p>Tiếng anh nhìn một đằng đọc một nẻo</p>
            </Link>
          </li>
          <li>
            <Link
              className={`blood-plus ${this.getActiveClassByMode(
                mode,
                'forgot-to-pronounce-the-last-consonant',
              )}`}
              to="/philosophies/forgot-to-pronounce-the-last-consonant"
            >
              <p>quên phát âm phụ âm cuối</p>
            </Link>
          </li>
          <li>
            <Link
              className={`blood-plus ${this.getActiveClassByMode(
                mode,
                'speaking-english-fasts',
              )}`}
              to="/philosophies/speaking-english-fasts"
            >
              <p>vội vàng nói hết cả câu</p>
            </Link>
          </li>
          <li>
            <Link
              className={`blood-plus ${this.getActiveClassByMode(
                mode,
                'practices',
              )}`}
              to="/philosophies/practices"
            >
              <p>học từ vựng nhiều nhưng không áp dụng được vào giao tiếp</p>
            </Link>
          </li>
          <li>
            <Link
              className={`blood-plus ${this.getActiveClassByMode(
                mode,
                'environments',
              )}`}
              to="/philosophies/environments"
            >
              <p>thiếu môi trường thực hành</p>
            </Link>
          </li>
          <br />
          <li>
            <Link
              className={`pill ${this.getActiveClassByMode(mode, 'solutions')}`}
              to="/philosophies/solutions"
            >
              <p>Thuốc chữa</p>
            </Link>
          </li>
          <li>
            <Link
              className={`faq ${this.getActiveClassByMode(
                mode,
                'frequently-asked-questions',
              )}`}
              to="/philosophies/frequently-asked-questions"
            >
              <p>câu hỏi thường gặp</p>
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = () => {
  const location = window.location.pathname;
  const tmp = location.split('/').splice(2, 2);
  const mode = tmp[0];
  return {
    mode,
  };
};

export default connect(mapStateToProps)(PhilosophyMenuList);
