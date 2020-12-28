import React from 'react';
import lodashGet from 'lodash.get';
import { required } from 'common/validators';
import apiUrls from 'components/temis/endpoints';

const LayoutFreeStyle = ({
  groups: {
    default: { fieldNames },
  },
}) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-sm-4">{fieldNames.rubric_iid}</div>
        <div className="col-sm-4">{fieldNames.tieu_chuan_iid}</div>
        <div className="col-sm-4">{fieldNames.tieu_chi_iid}</div>
      </div>
    </div>
  );
};

export default ({ getOnlyAssessmentThatUserCanDo = false } = {}) => ({
  schema: (formid, values, localStep, xpath) => {
    const rubricIid = lodashGet(values, `${xpath}.rubric_iid`);
    const tieuChuanIid = lodashGet(values, `${xpath}.tieu_chuan_iid`);

    return {
      rubric_iid: {
        validate: [required()],
        type: 'select',
        options: 'async',
        floatingLabelText: 'Loại đánh giá',
        fullWidth: true,
        populateValue: true,
        paramsasync: {
          __url__: apiUrls.get_assessment_options,
          key: `get_assessment_options_${getOnlyAssessmentThatUserCanDo}`,
          value: {
            get_only_assessment_that_user_can_do: getOnlyAssessmentThatUserCanDo
              ? 1
              : 0,
          },
          transformData: (data) => {
            return (data || []).map((d) => ({
              value: lodashGet(d, 'rubric_iid'),
              label: lodashGet(d, 'assessment_name'),
            }));
          },
        },
      },
      tieu_chuan_iid: {
        validate: [required()],
        type: 'select',
        options: 'async',
        floatingLabelText: 'Tiêu chuẩn',
        fullWidth: true,
        populateValue: true,
        paramsasync: {
          __url__: apiUrls.get_temis_tieu_chuan_options,
          key: `temis_tieu_chuan_${rubricIid}`,
          value: {
            rubric_iid: rubricIid,
          },
          transformData: (data) => {
            return (data || []).map((d) => ({
              value: lodashGet(d, 'iid'),
              label: lodashGet(d, 'name'),
            }));
          },
        },
      },
      tieu_chi_iid: {
        validate: [required()],
        type: 'select',
        options: 'async',
        floatingLabelText: 'Tiêu chí',
        fullWidth: true,
        populateValue: true,
        paramsasync: {
          __url__: apiUrls.get_temis_tieu_chi_options,
          key: `temis_tieu_chi_${tieuChuanIid}`,
          value: {
            tieu_chuan_iid: tieuChuanIid,
          },
          transformData: (data) => {
            return (data || []).map((d) => ({
              value: lodashGet(d, 'iid'),
              label: lodashGet(d, 'name'),
            }));
          },
        },
      },
    };
  },
  ui: (step, values, themeConfig, xpath) => {
    return [
      {
        id: 'default',
        fields: ['rubric_iid', 'tieu_chuan_iid', 'tieu_chi_iid'],
      },
    ];
  },
  layout: {
    freestyle: 1,
    component: LayoutFreeStyle,
  },
});
