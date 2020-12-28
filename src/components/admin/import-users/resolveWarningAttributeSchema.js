import React, { Component } from 'react';
import get from 'lodash.get';
import Button from 'antd/lib/button';
import { t, t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import FormNewOrg from 'components/admin/organization/new/Form';
import Store from 'store';
import { change, submit } from 'redux-form';

const schema = (formid, values) => {
  const importId = get(values, 'import_id');
  const resolveField = get(values, 'resolve_field');
  const valueToResolve = get(values, 'value_to_resolve');

  return {
    value_to_resolve: {
      type: 'text',
      classWrapper: 'flex-item',
      floatingLabelText: t1('value'),
      readOnly: true,
    },
    resolved_value: {
      type: 'select',
      classWrapper: 'flex-item',
      floatingLabelText: t1(`${resolveField}_mapping`),
      fullWidth: true,
      options: 'async',
      showSearch: true,
      optionFilterProp: 'children',
      filterOption: (input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0,
      paramsasync: {
        __url__: '/import/data/get-data-to-resolve-warning-attribute',
        value: {
          import_id: importId,
          field: resolveField,
          name: valueToResolve,
        },
        transformData: ['organization_name'].includes(resolveField)
          ? (data) => {
              if (!Array.isArray(data)) {
                return [];
              }

              return data.map((org) => ({
                value: org.iid,
                label: org.name,
                primaryText: org.name,
              }));
            }
          : null,
      },
    },
    extra_element: {
      type: 'cascade',
      classWrapper: 'flex-item m-t-30 text-center',
      styleWrapper: { maxWidth: 200 },
      component: (
        <DetailOnDialog
          renderPreview={({ showFull }) => (
            <Button
              type="primary"
              shape="circle"
              icon="plus"
              onClick={showFull}
            />
          )}
          renderFull={({ closeDialog }) => {
            let node = {};
            let fieldsNotAllowedToEdit = [];
            if (resolveField === 'org_code') {
              fieldsNotAllowedToEdit = ['code'];
              node = {
                code: valueToResolve,
              };
            } else {
              fieldsNotAllowedToEdit = ['name'];
              node = {
                name: valueToResolve,
              };
            }
            return (
              <FormNewOrg
                mode="new"
                node={node}
                params={{
                  type: 'organization',
                }}
                fieldsNotAllowedToEdit={fieldsNotAllowedToEdit}
                requestSuccessful={({ success, result }) => {
                  if (success) {
                    Store.dispatch(
                      change(formid, 'resolved_value', get(result, 'iid')),
                    );
                    closeDialog();
                    Store.dispatch(submit(formid));
                  }
                }}
              />
            );
          }}
        />
      ),
    },
  };
};

const ui = (step, values) => {
  const resolveField = get(values, 'resolve_field');
  const fields = ['value_to_resolve'];
  if (resolveField !== 'org_code') {
    fields.push('resolved_value');
  }
  if (['organization_name', 'org_code'].includes(resolveField)) {
    fields.push('extra_element');
  }
  return [
    {
      id: 'default',
      wrapperClass: 'flex-container-wrap',
      fields,
    },
  ];
};

export default {
  schema,
  ui,
};
