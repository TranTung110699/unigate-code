import { required } from 'common/validators';
import { t1 } from 'translate';
import get from 'lodash.get';
import organizationApiUrls from 'components/admin/organization/endpoints';
import Store from 'store';
import { change } from 'redux-form';
import {
  org_district_id,
  org_province_id,
} from 'components/admin/pds/schema/elements';
import { organizationHasDistrict, organizationHasProvince } from 'common/conf';
import React from 'react';
import styled from 'styled-components';

const defaultRequire = true;

const addRquiredTick = (string, cond) => `${string}${cond ? ' (*)' : ''}`;

const schema = (formid, values, step, xpath, { allOrgTypes }, domainInfo) => {
  return {
    sub_type: {
      type: 'select',
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      floatingLabelText: addRquiredTick('Loại đơn vị', defaultRequire),
      options: allOrgTypes,
      defaultValue: '',
      validate: [...(defaultRequire ? [required('Hãy chọn loại đơn vị')] : [])],
    },
    user_organization: {
      type: 'select',
      floatingLabelText: addRquiredTick(t1('organization'), defaultRequire),
      options: 'async',
      allowClear: true,
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      disabled: values.other_user_organizations,
      paramsasync: {
        __url__: organizationApiUrls.get_organizations_for_select_options,
        value: {
          sub_type: values.sub_type,
          province_id: values.province_id,
          district_id: values.district_id,
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
        key: `user_organization_${values.sub_type}_${values.province_id}_${
          values.district_id
        }`,
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
    },
    other_user_organizations: {
      type: 'checkbox',
      label: 'Khác (nếu không tìm thấy trong danh sách)',
      onChange: (event, v) => {
        if (v) {
          Store.dispatch(change(formid, 'user_organization', []));
        }
      },
    },
    province_id: org_province_id({
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
    }),
    district_id: org_district_id(
      { org_province_id: values.province_id },
      {
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
      },
    ),
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
      id: 'org',
      fields: [
        'sub_type',
        ...(organizationHasProvince(domainInfo, values.sub_type) &&
        values.sub_type !==
          get(window, 'ETEP_CONFIG.etep_boGiaoDucVaDaoTaoSubType') //settings.js
          ? ['province_id']
          : []),
        ...(values.province_id &&
        organizationHasDistrict(domainInfo, values.sub_type) &&
        values.sub_type !==
          get(window, 'ETEP_CONFIG.etep_soGiaoDucVaDaoTaoSubType') //2 là id của sở
          ? ['district_id']
          : []),
        ...((typeof values.sub_type !== 'undefined' &&
          (values.province_id ||
            !organizationHasProvince(domainInfo, values.sub_type)) &&
          (values.district_id ||
            !organizationHasDistrict(domainInfo, values.sub_type))) ||
        values.sub_type ===
          get(window, 'ETEP_CONFIG.etep_boGiaoDucVaDaoTaoSubType')
          ? ['user_organization']
          : []),
        ...(!values.user_organization ||
        !Array.isArray(values.user_organization) ||
        !values.user_organization.length
          ? ['other_user_organizations']
          : []),
      ],
    },
  ];
};

const FormContainer = styled.div`
  .search-faq-support {
    .ant-form-item {
      margin-bottom: 10px;
    }
  }
`;

const FormFreeStyle = ({ groups, submitButton }) => {
  return (
    <FormContainer>
      <div className="search-faq-support">
        {groups.org.fieldNames.sub_type}
        <div className="flex-container-wrap">
          <div className="flex-item p-0">
            {groups.org.fieldNames.province_id}
          </div>
          {groups.org.fieldNames.district_id ? (
            <div className="flex-item p-0 m-l-10">
              {groups.org.fieldNames.district_id}
            </div>
          ) : null}
        </div>
        {groups.org.fieldNames.user_organization}
        <div className="text-center m-t-10">{submitButton}</div>
      </div>
    </FormContainer>
  );
};

export default {
  schema,
  ui,
  layout: { component: FormFreeStyle, freestyle: 1 },
};
