import React from 'react';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import Card from 'antd/lib/card';
import { t1 } from 'translate';
import './style.scss';
import lodashGet from 'lodash.get';
import styled from 'styled-components';
import Warning from '../../../common/Warning';

const Container = styled(Row)`
  label,
  .ant-form-item-no-colon {
    color: rgba(0, 0, 0, 0.85) !important;
  }
  label.ant-radio-wrapper {
    color: rgba(0, 0, 0, 0.7) !important;
  }
`;

const FormFreeStyle = ({
  groups,
  submitButton,
  layout,
  invalid,
  submitSucceeded,
}) => {
  const title = lodashGet(layout, 'title');

  return (
    <div className="temis-profile-container">
      {title && (
        <div className="text-center">
          <h1>{title}</h1>
        </div>
      )}
      <div>
        Trường được đánh dấu <strong>(*)</strong> là trường bắt buộc
      </div>
      <Container type="flex" justify="center">
        <Row
          type="flex"
          justify="space-between"
          gutter={{ md: 10 }}
          className="w-100"
        >
          <Col md={12} span={24} className="m-t-10">
            <Card title={groups.basic.title}>
              <Row>{groups.basic.fieldNames.giaovien_code}</Row>
              <Row gutter={24}>
                <Col>{groups.basic.fieldNames.name}</Col>
              </Row>
              <Row gutter={24}>
                <Col>{groups.basic.fieldNames.sex}</Col>
              </Row>
              <Row gutter={24}>
                <Col className="d-flex">
                  {groups.basic.fieldNames.ethnicity}
                  {groups.basic.fieldNames.other_ethnicity}
                </Col>
              </Row>
              <Row>
                <Col>{groups.basic.fieldNames.birthday}</Col>
              </Row>
              <Row gutter={24}>
                <Col md={12} span={24}>
                  {groups.basic.fieldNames.mail}{' '}
                  {groups.basic.fieldNames.mail.props.fieldSchema.readOnly && (
                    <span
                      style={{
                        clear: 'both',
                        color: 'rgba(0,0,0,0.45)',
                        fontSize: 12,
                      }}
                    >
                      <em>Bạn không thể thay đổi địa chỉ email!</em>
                    </span>
                  )}
                </Col>
                <Col md={12} span={24}>
                  {groups.basic.fieldNames.phone}
                </Col>
              </Row>
            </Card>
          </Col>
          <Col md={12} span={24} className="m-t-10">
            <Card title="Trình độ chuyên môn">
              <Row>{groups.basic.fieldNames.qualifications}</Row>
              <Row>
                {groups.basic.fieldNames.teaching_specialization_select}
              </Row>
              <Row>{groups.basic.fieldNames.teaching_specialization}</Row>
            </Card>
          </Col>
        </Row>
        <Row
          type="flex"
          justify="space-between"
          gutter={{ md: 10 }}
          className="w-100"
        >
          <Col md={12} span={24} className="m-t-10">
            <Card title={t1('organization')}>
              <Row>{groups.org.fieldNames.org_sub_type}</Row>
              <Row>{groups.org.fieldNames.org_province_id}</Row>
              <Row>{groups.org.fieldNames.org_district_id}</Row>
              <Row>{groups.org.fieldNames.user_organizations}</Row>
              <Row>{groups.org.fieldNames.other_user_organizations}</Row>
              <Row>{groups.org.fieldNames.other_user_organizations_name}</Row>
            </Card>
          </Col>

          <Col md={12} span={24} className="m-t-10">
            <Card title={'Kinh nghiệm giảng dạy'}>
              <Row>{groups.exp.fieldNames.giaovien_cotcan}</Row>
              <Row>{groups.exp.fieldNames.leader_position}</Row>
              <Row>{groups.exp.fieldNames.phongban_id}</Row>
              <Row className="d-flex">
                <Col>{groups.exp.fieldNames.current_position}</Col>
                {groups.exp.fieldNames.other_current_position && (
                  <Col>{groups.exp.fieldNames.other_current_position}</Col>
                )}
              </Row>
              <Row>{groups.exp.fieldNames.teaching_exp_years}</Row>
              <Row>{groups.exp.fieldNames.managing_exp_years}</Row>
              <Row>{groups.exp.fieldNames.grade}</Row>
              <Row>{groups.exp.fieldNames.academic_categories}</Row>
            </Card>
          </Col>
        </Row>
        <div className="m-t-10 text-center">
          {invalid ? (
            <div className="m-b-10">
              <Warning>
                Không thể lưu, hãy kiểm tra lại thông tin đã nhập.
                <br />
                Lưu ý: các trường được đánh dấu (*) là trường bắt buộc nhập!
              </Warning>
            </div>
          ) : submitSucceeded ? (
            <div className="m-b-10">
              <span style={{ color: '#28A745' }}>
                Đã lưu dữ liệu thành công!
              </span>
            </div>
          ) : null}

          <div
            className={`submit-btn-wrapper ${invalid ? 'invalid-button' : ''}`}
          >
            {submitButton}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FormFreeStyle;
