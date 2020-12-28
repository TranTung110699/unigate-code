import {
  birthday,
  ethnicity,
  mail,
  name,
  phone,
  sex,
} from 'components/admin/user/schema/elements';
import { t1 } from 'translate';
import { inRange, required } from 'common/validators';
import React from 'react';
import {
  org_district_id,
  org_province_id,
} from 'components/admin/pds/schema/elements';
import get from 'lodash.get';
import FormFreeStyle from './FormFreeStyle';
import {
  leaderPositionOptions,
  userGradeOptions,
} from 'configs/constants/user';
import Tooltip from 'antd/lib/tooltip';
import Icon from 'antd/lib/icon';
import organizationApiUrls from 'components/admin/organization/endpoints';
import { change } from 'redux-form';
import Store from 'store';
import { organizationHasDistrict, organizationHasProvince } from 'common/conf';
import apiUrls from 'components/temis/endpoints';

const defaultRequire = false;
const defaultReadOnlyField = {
  mail: true,
  other: false,
};
const addRquiredTick = (string, cond) => `${string}${cond ? ' (*)' : ''}`;

const schema = (formid, values, step, xpath, { allOrgTypes }, domainInfo) => {
  const orgTypes = get(domainInfo, 'school.org_types');

  console.log('-------', values);

  return {
    name: name({
      floatingLabelText: addRquiredTick('Họ và tên', defaultRequire),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập đầy đủ họ tên')] : []),
      ],
    }),
    birthday: birthday({
      readOnly: false,
      floatingLabelText: addRquiredTick('Ngày sinh', defaultRequire),
      validate: [...(defaultRequire ? [required('Hãy nhập ngày sinh')] : [])],
      formatDate: 'DD/MM/YYYY', // kinda hacky, maybe we should have a global config for this
    }),
    mail: mail({
      required: defaultRequire,
      readOnly: defaultReadOnlyField.mail,
      style: {
        fontFamily: 'Roboto',
      },
    }),
    phone: phone({
      floatingLabelText: addRquiredTick('Số điện thoại', defaultRequire),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập số điện thoại')] : []),
      ],
    }),
    sex: sex({
      inline: true,
      validate: [...(defaultRequire ? [required('Hãy chọn giới tính')] : [])],
      floatingLabelText: addRquiredTick('Giới tính', defaultRequire),
    }),
    ethnicity: {
      type: 'radio',
      options: [
        {
          value: 'kinh',
          label: t1('kinh'),
        },
        {
          value: 'dtts',
          label: <span title="Dân tộc thiểu số">DTTS</span>,
        },
      ],
      validate: [...(defaultRequire ? [required('Hãy chọn dân tộc')] : [])],
      label: addRquiredTick('Dân tộc', defaultRequire),
      inline: true,
    },
    other_ethnicity: ethnicity({
      floatingLabelText: addRquiredTick('Tên dân tộc', defaultRequire),
      validate: [
        ...(defaultRequire ? [required('Hãy điền dân tộc của bạn')] : []),
      ],
    }),
    qualifications: {
      type: 'radio',
      label: addRquiredTick(
        'Trình độ học vấn/học hàm/học vị (chọn trình độ cao nhất',
        defaultRequire,
      ),
      validate: [
        ...(defaultRequire
          ? [required('Hãy chọn trình độ đào tạo cao nhất')]
          : []),
      ],
      options: [
        {
          value: 'tc',
          label: 'Trung cấp',
        },
        {
          value: 'college',
          label: 'Cao đẳng',
        },
        {
          value: 'university',
          label: 'Đại học, Cử nhân hoặc tương đương',
        },
        { value: 'master', label: 'Thạc sĩ / MA' },
        { value: 'doctorate', label: 'Tiến sĩ / Dr' },
        {
          value: 'assoc_prof_doctorate',
          label: 'Phó giáo sư, Tiến sĩ / Assoc.Prof.Dr',
        },
        { value: 'prof_doctorate', label: 'Giáo sư, Tiến sĩ / Prof.Dr' },
      ],
    },
    teaching_specialization_select: {
      type: 'select',
      floatingLabelText: addRquiredTick('Chuyên ngành đào tạo', defaultRequire),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập chuyên ngành đào tạo')] : []),
      ],
      options: [
        {
          value: 'giao_duc_hoc',
          primaryText: 'Giáo dục học',
          label: 'Giáo dục học',
        },
        {
          value: 'quan_ly_giao_duc',
          primaryText: 'Quản lý giáo dục',
          label: 'Quản lý giáo dục',
        },
        {
          value: 'other',
          primaryText: 'Khác (ghi rõ)',
          label: 'Khác (ghi rõ)',
        },
      ],
    },
    teaching_specialization: {
      type: 'text',
      floatingLabelText: addRquiredTick(
        'Ghi rõ chuyên ngành đào tạo',
        defaultRequire,
      ),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập chuyên ngành đào tạo')] : []),
      ],
    },
    org_sub_type: {
      type: 'select',
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      floatingLabelText: addRquiredTick('Loại đơn vị', defaultRequire),
      options: allOrgTypes,
      defaultValue: '',
      validate: [...(defaultRequire ? [required('Hãy chọn loại đơn vị')] : [])],
      readOnly: defaultReadOnlyField.other,
    },
    user_organizations: {
      type: 'select',
      floatingLabelText: addRquiredTick(t1('organization'), defaultRequire),
      options: 'async',
      allowClear: true,
      format: (v) => get(v, [0]),
      normalize: (v) => (v ? [v] : []),
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      disabled: values.other_user_organizations,
      paramsasync: {
        __url__: organizationApiUrls.get_organizations_for_select_options,
        value: {
          sub_type: values.org_sub_type,
          province_id: values.org_province_id,
          district_id: values.org_district_id,
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((val) => ({
            value: get(val, 'iid'),
            label: get(val, 'name'),
            primaryText: get(val, 'name'),
          }));
        },
        key: `user_organization_${values.org_sub_type}_${
          values.org_province_id
        }_${values.org_district_id}`,
      },
      validate: [
        ...(defaultRequire
          ? [
              (value, values) => {
                if (values.other_user_organizations) {
                  return undefined;
                }
                return required('Hãy chọn đơn vị')(value);
              },
            ]
          : []),
      ],
      readOnly: defaultReadOnlyField.other,
    },
    other_user_organizations: {
      type: 'checkbox',
      label: 'Khác (nếu không tìm thấy trong danh sách)',
      onChange: (event, v) => {
        if (v) {
          Store.dispatch(change(formid, 'user_organizations', []));
        }
      },
      readOnly: defaultReadOnlyField.other,
      className: defaultReadOnlyField.other ? 'checkbox-read-only' : '',
    },
    org_province_id: org_province_id({
      floatingLabelText: addRquiredTick('Tỉnh/thành phố', defaultRequire),
      validate: [
        ...(defaultRequire
          ? [
              (value, values) => {
                if (values.other_user_organizations) {
                  return undefined;
                }
                return required('Hãy chọn tỉnh/thành phố')(value);
              },
            ]
          : []),
      ],
      readOnly: defaultReadOnlyField.other,
    }),
    other_user_organizations_name: {
      type: 'text',
      hintText: 'Nhập tên đơn vị',
      fullWidth: true,
      validate: [
        ...(defaultRequire
          ? [
              (value, values) => {
                if (!values.other_user_organizations) {
                  return undefined;
                }
                return required('Hãy nhập tên đơn vị')(value);
              },
            ]
          : []),
      ],
      readOnly: defaultReadOnlyField.other,
    },
    org_district_id: org_district_id(values, {
      floatingLabelText: addRquiredTick('Quận/huyện', defaultRequire),
      validate: [
        ...(defaultRequire
          ? [
              (value, values) => {
                if (values.other_user_organizations) {
                  return undefined;
                }
                return required('Hãy chọn quận/huyện')(value);
              },
            ]
          : []),
      ],
      readOnly: defaultReadOnlyField.other,
    }),
    giaovien_code: {
      type: 'text',
      floatingLabelText: 'Mã giáo viên (nếu có)',
      defaultValue: '',
      errorText: '',
    },
    giaovien_cotcan: {
      type: 'radio',
      label: (
        <span>
          Thuộc nhóm đối tượng cốt cán nào?{' '}
          <Tooltip title="Nếu là GV/CBQLCSGD cốt cán thì chọn 1 trong 2 nhóm (nếu không được chọn là cốt cán thì bỏ qua)">
            <Icon type="question-circle" />
          </Tooltip>
        </span>
      ),
      options: [
        { value: 'highschool', label: 'Giáo viên cốt cán' },
        {
          value: 'official',
          label: 'Cán bộ quản lý cơ sở giáo dục cốt cán',
        },
        {
          value: '',
          label: 'Không là cốt cán',
        },
      ],
      readOnly: defaultReadOnlyField.other,
    },
    teaching_exp_years: {
      type: 'number',
      min: 0,
      max: 40,
      floatingLabelText: addRquiredTick(
        'Số năm kinh nghiệm giảng dạy ở trường',
        defaultRequire,
      ),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập số năm kinh nghiệm')] : []),
        inRange(0, 40, 'Số năm kinh nghiệm nằm trong khoảng 0-40'),
      ],
      fullWidth: true,
    },
    current_position: {
      type: 'radio',
      label: 'Chức vụ khác',
      options: [
        { value: 'leader', label: 'Tổ trưởng' },
        { value: 'vice_leader', label: 'Tổ phó chuyên môn' },
        { value: 'other', label: t1('other') },
      ],
      inline: true,
    },
    other_current_position: {
      type: 'text',
      floatingLabelText: addRquiredTick('Chức vụ khác', defaultRequire),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập chức vụ khác')] : []),
      ],
    },
    grade: {
      type: 'radio',
      floatingLabelText: addRquiredTick(
        'Khối/lớp đang giảng dạy hoặc tham gia đào tạo tại khóa tập huấn',
        defaultRequire,
      ),
      options: userGradeOptions(),
      validate: [
        ...(defaultRequire ? [required('Hãy chọn khối lớp giảng dạy')] : []),
      ],
    },
    academic_categories: {
      type: 'select',
      multiple: true,
      limit: 1,
      options: 'async',
      floatingLabelText: addRquiredTick(
        'Môn tham gia bồi dưỡng theo phân công của sở/phòng',
        defaultRequire,
      ),
      validate: [
        ...(defaultRequire
          ? [required('Hãy chọn môn học tham gia bồi dưỡng')]
          : []),
      ],
      paramsasync: {
        __url__: apiUrls.temis_get_academic_categories_for_select_options,
        value: {
          grade: values.grade,
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((val) => ({
            value: get(val, 'iid'),
            label: get(val, 'name'),
            primaryText: get(val, 'name'),
          }));
        },
        key: `academic_categories_${values.grade}`,
      },
    },

    // subject: {
    //   type: 'select',
    //   floatingLabelText: t1('subject'),
    // },
    managing_exp_years: {
      type: 'number',
      min: 0,
      max: 40,
      floatingLabelText: addRquiredTick(
        'Số năm kinh nghiệm quản lý trường',
        defaultRequire,
      ),
      validate: [
        ...(defaultRequire ? [required('Hãy nhập số năm kinh nghiệm')] : []),
        inRange(0, 40, 'Số năm nằm trong khoảng 0 đến 40'),
      ],
      fullWidth: true,
    },
    leader_position: {
      type: 'select',
      floatingLabelText: addRquiredTick('Chức vụ hiện tại', defaultRequire),
      options: leaderPositionOptions(values.org_sub_type),
      inline: true,
      validate: [
        ...(defaultRequire ? [required('Hãy chọn chức vụ hiện tại')] : []),
      ],
      readOnly: defaultReadOnlyField.other,
    },
    phongban_id: {
      type: 'select',
      floatingLabelText: 'Tổ bộ môn',
      options: 'async',
      allowClear: true,
      showSearch: true,
      hiddenWhenOptionEmpty: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      paramsasync: {
        __url__: organizationApiUrls.get_organizations_for_select_options,
        value: {
          ancestor_iids: values.user_organizations,
          sub_type: Array.isArray(orgTypes)
            ? orgTypes
                .filter(({ is_phongban }) => is_phongban)
                .map(({ type }) => type)
            : [], //Tổ bộ môn
        },
        transformData: (data) => {
          if (!Array.isArray(data) || !data.length) {
            return [];
          }
          return data.map((val) => ({
            value: get(val, 'iid'),
            label: get(val, 'name'),
            primaryText: get(val, 'name'),
          }));
        },
        key: `phongban_id_by_${
          Array.isArray(values.user_organizations)
            ? values.user_organizations.join('-')
            : ''
        }`,
      },
    },
  };
};

const ui = (
  step,
  values,
  themeConfig,
  xpath,
  formid,
  props,
  mode,
  domainInfo,
) => {
  return [
    {
      title: t1('basic_information'),
      id: 'basic',
      fields: [
        'giaovien_code',
        'name',
        'birthday',
        'mail',
        'phone',
        'sex',
        'ethnicity',
        ...(get(values, 'ethnicity') === 'dtts' ? ['other_ethnicity'] : ''),
        'qualifications',
        'teaching_specialization_select',
        ...(values.teaching_specialization_select == 'other'
          ? ['teaching_specialization']
          : []),
      ],
    },
    {
      title: t1('school_information'),
      id: 'org',
      fields: [
        'org_sub_type',
        ...(typeof values.org_sub_type !== 'undefined' &&
        (values.org_province_id ||
          !organizationHasProvince(domainInfo, values.org_sub_type)) &&
        (values.org_district_id ||
          !organizationHasDistrict(domainInfo, values.org_sub_type))
          ? ['user_organizations']
          : []),
        ...(!values.user_organizations ||
        !Array.isArray(values.user_organizations) ||
        !values.user_organizations.length
          ? ['other_user_organizations']
          : []),
        ...(values.other_user_organizations
          ? ['other_user_organizations_name']
          : []),
        ...(organizationHasProvince(domainInfo, values.org_sub_type)
          ? ['org_province_id']
          : []),
        ...(values.org_province_id &&
        organizationHasDistrict(domainInfo, values.org_sub_type) &&
        values.org_sub_type !== 2 //2 là id của sở
          ? ['org_district_id']
          : []),
      ],
    },
    {
      title: t1('experience'),
      id: 'exp',
      fields: [
        'giaovien_cotcan',
        'teaching_exp_years',
        'leader_position',
        ...(get(values, 'leader_position') === 'teacher'
          ? ['current_position']
          : []),
        ...(get(values, 'leader_position') === 'teacher'
          ? ['phongban_id']
          : []),
        ...(get(values, 'current_position') === 'other'
          ? ['other_current_position']
          : []),
        'grade',
        ...(get(values, 'grade') ? ['academic_categories'] : []),
        ...(get(values, 'leader_position') !== 'teacher'
          ? ['managing_exp_years']
          : []),
      ],
    },
  ];
};

const validate = (values) => {
  if (values.name && typeof values.name === 'string' && !values.name.trim())
    return {
      name: t1('Hãy nhập tên của bạn!'),
    };
  return undefined;
};

export default ({ title }) => ({
  schema,
  ui,
  layout: {
    component: FormFreeStyle,
    title,
    freestyle: true,
  },
  validate,
});
