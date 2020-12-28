import React from 'react';
import {
  isHieuTruong,
  isLeader,
  isReviewApprover,
} from 'components/admin/user/utils';
import withTemisConfig from 'common/hoc/withTemisConfig';
import Tabs from 'antd/lib/tabs';
import MyAssessment from './MyAssessment';
import AssessmentOfPeersInPhongBan from 'components/temis/report/temis/tcnn-in-phongban-report';
import Widget from 'components/common/Widget';
import TCNNReportSearch from 'components/temis/assessment/organization-report/SearchForm';
import AssessmentsInOrganization from 'components/temis/assessment/assessments-in-organization/overview';

const TemisReport = ({ userRoot, temisConfig, rubricToAssessment }) => {
  const tabs = [
    (!isLeader(userRoot) || isHieuTruong(userRoot)) && {
      key: 'my-assessment',
      title: 'KẾT QUẢ TỰ ĐÁNH GIÁ ',
      content: <MyAssessment user={userRoot} rubricIid={rubricToAssessment} />,
    },
    isReviewApprover(userRoot) &&
      !isLeader(userRoot) && {
        key: 'assessment_in_phongban',
        title: 'BÁO CÁO TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ TRONG TỔ CHUYÊN MÔN',
        content: <AssessmentOfPeersInPhongBan />,
      },
    isLeader(userRoot) && {
      key: 'tcnn_gv',
      title: 'BÁO CÁO TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ GIÁO VIÊN',
      content: [
        <Widget title="Kết quả tự đánh giá">
          <TCNNReportSearch tcnn="tcnn_gv" type="self_assessment" />
        </Widget>,
        <Widget title="Kết quả đánh giá được phê duyệt">
          <TCNNReportSearch tcnn="tcnn_gv" type="approve_reviews" />
        </Widget>,
      ],
    },
    isLeader(userRoot) &&
      !isHieuTruong(userRoot) && {
        key: 'tcnn_ht',
        title: 'BÁO CÁO TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ HIỆU TRƯỞNG/PHÓ HIỆU TRƯỞNG',
        content: [
          <Widget title="Kết quả tự đánh giá" type="self_assessment">
            <TCNNReportSearch tcnn="tcnn_ht" />
          </Widget>,
          <Widget title="Kết quả đánh giá được phê duyệt">
            <TCNNReportSearch tcnn="tcnn_ht" type="approve_reviews" />
          </Widget>,
        ],
      },
    isLeader(userRoot) && {
      key: 'assessments_in_organization',
      title: 'BẢNG TỔNG HỢP KẾT QUẢ ĐÁNH GIÁ CỦA CƠ SỞ GIÁO DỤC',
      content: <AssessmentsInOrganization />,
    },
  ].filter(Boolean);

  return (
    <div className="container-fluid">
      {(() => {
        switch (tabs.length) {
          case 0: {
            return <div>Không có mẫu báo cáo!</div>;
          }
          case 1: {
            return tabs[0].content;
          }
          default: {
            return (
              <Tabs defaultActiveKey={tabs[0].key}>
                {tabs.map(({ content, title, key }) => {
                  return (
                    <Tabs.TabPane tab={title} key={key}>
                      <div style={{ margin: 5 }}>{content}</div>
                    </Tabs.TabPane>
                  );
                })}
              </Tabs>
            );
          }
        }
      })()}
    </div>
  );
};

export default withTemisConfig(TemisReport);
