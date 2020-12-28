import React from 'react';
import PropTypes from 'prop-types';
import { t3 } from 'translate';
import Icon from 'components/common/Icon';
import Links from 'routes/links';
import { Link } from 'react-router-dom';
import SubmitButton from '../submit-button';
import './stylesheet.scss';

class ExamShiftNoSelectPaper extends React.Component {
  cssClass = 'etec-exam-shift-no-select-paper';

  render() {
    const { className, iid } = this.props;
    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <div className={`${this.cssClass}__title-section`}>
          <h1 className={`${this.cssClass}__title`}>
            THI THỬ (TEST YOUR TOEIC)
          </h1>
          <hr className={`${this.cssClass}__title-separator`} />
          <Icon
            icon="star"
            className={`${this.cssClass}__title-separator-icon`}
          />
        </div>
        <div className={`${this.cssClass}__body-section`}>
          <div className="row">
            <div className="col-sm-4">
              <div className={`${this.cssClass}__body-overview`}>
                <p>
                  Bạn đang lựa chọn bài thi TOEIC giản lược được mô phỏng giống
                  bài thi thật kết quả điểm thi chỉ được sử dụng để đánh giá kết
                  quả học tập, ôn luyện tạm thời hoặc để tham khảo trong nội bộ
                  các công ty, đơn vị tuyển dụng trường đại học, tổ chức có liên
                  kết với ETEC
                </p>
                <p>
                  Để chắc chắn việc hệ thống sẽ ghi nhận được toàn bộ quá trình
                  làm bài và báo cáo kết quả chính xác, bạn cần:
                </p>
                <ul className={`${this.cssClass}__body-list`}>
                  <li className={`${this.cssClass}__body-list-item`}>
                    <Icon
                      icon="check"
                      className={`${this.cssClass}__body-list-bullet`}
                    />
                    Đảm bảo việc kết nói internet liên tục trong suốt quá trình
                    làm bài thi
                  </li>
                  <li className={`${this.cssClass}__body-list-item`}>
                    <Icon
                      icon="check"
                      className={`${this.cssClass}__body-list-bullet`}
                    />
                    Tai nghe/loa để làm phần nghe hiểu.
                  </li>
                  <li className={`${this.cssClass}__body-list-item`}>
                    <Icon
                      icon="check"
                      className={`${this.cssClass}__body-list-bullet`}
                    />
                    Trình duyệt tiện dụng: Chrome, Firefox, Cốc cốc
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-sm-8">
              <div className={`${this.cssClass}__body-structure`}>
                <table className={`${this.cssClass}__body-table`}>
                  <thead className={`${this.cssClass}__body-table-thead`}>
                    <tr
                      className={`${this.cssClass}__body-table-row ${
                        this.cssClass
                      }__body-table-row--first`}
                    >
                      <th
                        className={`${this.cssClass}__body-table-th ${
                          this.cssClass
                        }__body-table-th--1`}
                      >
                        Cấu trúc (Format)
                      </th>
                      <th
                        className={`${this.cssClass}__body-table-th ${
                          this.cssClass
                        }__body-table-th--2`}
                      >
                        Phần thi (Part)
                      </th>
                      <th
                        className={`${this.cssClass}__body-table-th ${
                          this.cssClass
                        }__body-table-th--3`}
                      >
                        Hình thức câu hỏi (Questions)
                      </th>
                      <th
                        className={`${this.cssClass}__body-table-th ${
                          this.cssClass
                        }__body-table-th--4`}
                      >
                        Số câu hỏi (Number of questions)
                      </th>
                      <th
                        className={`${this.cssClass}__body-table-th ${
                          this.cssClass
                        }__body-table-th--5`}
                      >
                        Thời gian (Time)
                      </th>
                      <th
                        className={`${this.cssClass}__body-table-th ${
                          this.cssClass
                        }__body-table-th--6`}
                      >
                        Điểm (Scores)
                      </th>
                    </tr>
                  </thead>
                  <tbody className={`${this.cssClass}__body-table-tbody`}>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--left`}
                        rowSpan={4}
                      >
                        NGHE HIỂU (Listening Comprehension)
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>1</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        Photographs
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>5</td>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--right`}
                        rowSpan={4}
                      >
                        25 phút
                      </td>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--right`}
                        rowSpan={4}
                      >
                        495 điểm (Điểm chuyển đổi)
                      </td>
                    </tr>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td className={`${this.cssClass}__body-table-td`}>2</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        Question-Response
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>15</td>
                    </tr>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td className={`${this.cssClass}__body-table-td`}>3</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        Short Conversations
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>15</td>
                    </tr>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td className={`${this.cssClass}__body-table-td`}>4</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        Talks
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>15</td>
                    </tr>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--left`}
                        rowSpan={3}
                      >
                        ĐỌC HIỂU (Reading Comprehension)
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>5</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        Incomplete sentences
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>20</td>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--right`}
                        rowSpan={3}
                      >
                        40 phút
                      </td>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--right`}
                        rowSpan={3}
                      >
                        495 điểm (Điểm chuyển đổi)
                      </td>
                    </tr>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td className={`${this.cssClass}__body-table-td`}>6</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        Incomplete passages
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>6</td>
                    </tr>
                    <tr className={`${this.cssClass}__body-table-row`}>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--before-last`}
                      >
                        7
                      </td>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--before-last`}
                      >
                        <p>Single passages</p>
                        <p>Double passages</p>
                      </td>
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--before-last`}
                      >
                        <p>14</p>
                        <p>10</p>
                      </td>
                    </tr>
                    <tr
                      className={`${this.cssClass}__body-table-row ${
                        this.cssClass
                      }__body-table-row--last`}
                    >
                      <td
                        className={`${this.cssClass}__body-table-td ${
                          this.cssClass
                        }__body-table-td--left`}
                      >
                        Tồng số/Total
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        7 parts
                      </td>
                      <td className={`${this.cssClass}__body-table-td`} />
                      <td className={`${this.cssClass}__body-table-td`}>100</td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        65 phút
                      </td>
                      <td className={`${this.cssClass}__body-table-td`}>
                        990 điểm
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p>*Cấu trúc định dạng bài thi TOEIC – Sample Test*</p>
              </div>
            </div>
          </div>
        </div>
        <div className={`${this.cssClass}__action-section`}>
          <SubmitButton
            component={Link}
            to={Links.startExam({ iid })}
            className={`${this.cssClass}__action-button`}
          >
            {t3('start_your_test')}
          </SubmitButton>
        </div>
      </div>
    );
  }
}

ExamShiftNoSelectPaper.propTypes = {
  className: PropTypes.string,
  iid: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

ExamShiftNoSelectPaper.defaultProps = {
  className: '',
  iid: null,
};

export default ExamShiftNoSelectPaper;
