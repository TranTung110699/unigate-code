import React from 'react';
import { connect } from 'react-redux';
import LayoutHelper from 'layouts/LayoutHelper';
import { t1, t3 } from 'translate';
import apiUrls from 'api-endpoints';
import { Link, NavLink } from 'react-router-dom';
import { getFrontendUrl } from 'routes/links/common';
import sagaActions from 'actions/node/saga-creators';
import { ntype } from 'configs/constants';
import './stylesheet.scss';
import Overview from './overview/index';
import Benefit from './benefit/index';
import ExamPapers from './exam-papers';
import Category from './category/index';
import Tip from './tip/index';
import Gallery from './gallery/index';

const slugOpenPaths = 'open_paths';

class Homepage extends React.Component {
  overviewStyle = { padding: '20px' };
  overviewStyle1 = { padding: '45px' };
  overviewStyle2 = { padding: '40px' };
  overviewStyle3 = { padding: '50px' };
  divStyle = { padding: '28px  0', alignItems: 'center' };
  divStyle1 = { margin: '0px auto 58px auto', textAlign: 'center' };
  divStyle2 = { margin: '30px auto', textAlign: 'center' };
  linkStyle = { display: 'block' };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.onFetchOpenPaths(this.props);
  }

  componentDidMount() {
    LayoutHelper.setLayout(this);
  }

  onFetchOpenPaths = (props) => {
    const { dispatch } = props;
    const params = {
      slug: slugOpenPaths,
      depth: -1,
      ntype: ntype.PATH,
      editing_syllabus: 1,
    };
    const url = apiUrls.fetch_node;
    dispatch(
      sagaActions.getDataRequest({ url, keyState: slugOpenPaths }, params),
    );
  };

  render() {
    const { path } = this.props;
    return (
      <div className="etec-index">
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-md-offset-4">
                <h1 className="title">LUYỆN THI TOEIC/IELTS KHÔNG HỀ KHÓ</h1>
                <div className="message">
                  Kiểm tra trình độ miễn phí, lập kế hoạch ôn thi TOEIC/IELTS
                  phù hợp với mục tiêu và năng lực bản thân. Hãy để chúng tôi
                  giúp bạn!
                </div>
              </div>
            </div>
          </div>
        </div>
        <Overview
          style={this.overviewStyle}
          title="KIỂM TRA TRÌNH ĐỘ CỦA BẠN"
          shortTitle={t3('free')}
          content="Những bài kiểm tra chất lượng kèm theo kết quả phân tích chi tiết giúp bạn nhận biết điểm mạnh/yếu để lên kế hoạch ôn thi TOEIC/IELTS phù hợp."
        />
        <div className="container" style={this.divStyle}>
          <Benefit />
        </div>
        <div style={this.divStyle1}>
          <Link to={getFrontendUrl('tests', { type: 'exam_shift' })}>
            <button className="button-green">KIỂM TRA NGAY</button>
          </Link>
        </div>
        <div className="exam-pagers">
          <div className="container">
            <Overview
              color="white"
              style={this.overviewStyle1}
              className
              title="VÀO THI (GIỐNG ĐỀ THI TOEIC THẬT 99%)"
              content="Trải nghiệm sức nóng phòng thi với những đề thi TOEIC thật đến 99%."
            />
            <div className="row">
              <ExamPapers />
            </div>
            <div style={this.divStyle2}>
              <Link style={this.linkStyle} to={getFrontendUrl('tests')}>
                <button>XEM TẤT CẢ CÁC ĐỀ</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <Overview
            style={this.overviewStyle2}
            title="DAILY TOEIC TIPS"
            content="BÍ KÍP TOEIC - Cập nhật những bí kíp TOEIC mới nhất tùy theo mục tiêu ôn luyện của bạn."
          />
          <Tip />
        </div>
        <div className="category">
          <Overview
            color="#5c5c5c"
            style={this.overviewStyle3}
            className
            title="HỌC HAY THI NGAY"
            content="Tất tần tật các mẹo hay, chiến lược + chiến thuật làm bài thi sẽ giúp bạn đạt điểm tối đa"
          />
          <div className="container">
            <Category path={path} />
            <div style={this.divStyle2}>
              <NavLink
                to={getFrontendUrl('tests', {
                  type: 'path',
                  iid: path && path.children ? path.children[0].iid : 0,
                })}
              >
                <button className="buttonLearn">Học ngay</button>
              </NavLink>
            </div>
          </div>
        </div>
        <div className="container">
          <Overview
            style={this.overviewStyle}
            className
            title="CÁC CÁ NHÂN TỔ CHỨC ĐÃ TIN DÙNG"
            content="ETEC hân hạnh trở thành người bạn đồng hành đáng tin cậy của nhiều cá nhân và các tổ chức trên con đường chinh phục tiếng Anh."
          />
          <Gallery />
        </div>
        <div className="test-footer">
          <div className="container">
            <Overview
              color="white"
              style={this.overviewStyle3}
              className
              title="READY TO GET STARTED?"
              content={t1('join_us_and_get_the_best_result_on_your_test')}
            />
            <Link
              style={this.linkStyle}
              to={getFrontendUrl('tests', { type: 'exam_shift' })}
            >
              <button name="submit">{t1('start_to_test_your_score')}</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

const mapPropsToState = (state) => ({
  userInfo: state.user.info,
  path: state.dataApiResults[slugOpenPaths],
  screenSize: state.common.screenSize,
});
export default connect(mapPropsToState)(Homepage);
