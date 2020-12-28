import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import lGet from 'lodash.get';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from '../../endpoints';
import { connect } from 'react-redux';
import RaisedButton from 'components/common/mui/RaisedButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes';
import Link from 'components/common/router/Link';
import Icon from 'antd/lib/icon';

function Results({ node, items, formid, mode = 'delete', dispatch }) {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleButtonClick = (addAll = true, iid) => {
    if (mode === 'new') {
      dispatch(
        sagaActions.submitFormRequest('', {
          params: {
            sales_package_iid: node.iid,
            enrollment_plan_iids: addAll ? selectedRowKeys.join(',') : iid,
          },
          url: apiUrls.addEnrolmentPlans,
          closeModal: addAll,
          formidToSubmitOnSuccess: addAll
            ? `search-EP-sale-package-${node.iid}`
            : `new_enrolment_plan_${node.iid}`,
          modalKey: `new_enrolment_plan_${node.iid}`,
          executeOnSuccess: () => {
            if (addAll) {
              setSelectedRowKeys([]);
            }
          },
        }),
      );
    }
  };

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const columns = [
    {
      title: t1('name'),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t1('status'),
      key: 'status',
      dataIndex: 'status',
      render: (status) => t1(status),
    },
    {
      title: t1('actions'),
      key: 'action',
      className: 'text-center',
      render: (item) => (
        <>
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, { ntype: 'enrolment_plan' }),
            )}
            target="_blank"
          >
            <Icon type="eye" />
          </Link>
          {mode !== 'new' ? (
            <DeleteItem
              title={t1('delete')}
              textConfirm={t1(
                'are_you_sure_you_want_to_delete_%s_from_sales_package?',
                [item.name],
              )}
              formid={formid}
              itemId={item.id}
              alternativeApi={apiUrls.deleteEnrolmentPlans}
              params={{
                sales_package_iid: node.iid,
                enrollment_plan_iids: item.iid,
              }}
              className="m-l-20"
            />
          ) : (
            <Icon
              type="plus"
              onClick={() => handleButtonClick(false, item.iid)}
              className="m-l-20"
            />
          )}
        </>
      ),
    },
  ];

  const idInCurrentPage = Array.isArray(items)
    ? items.map(({ iid }) => iid)
    : [];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={items}
        rowKey="iid"
        className="white-background"
        pagination={false}
        childrenColumnName={null}
        bordered
        rowSelection={{
          selectedRowKeys,
          hideDefaultSelections: true,
          onChange: onSelectChange,
          selections: [
            {
              key: 'select_current_page',
              text: t1('select_data_in_current_page'),
              onSelect: () => {
                setSelectedRowKeys((state) => {
                  let currentSelectedRowKeys = lGet(
                    state,
                    'selectedRowKeys',
                    [],
                  );
                  currentSelectedRowKeys = currentSelectedRowKeys.concat(
                    idInCurrentPage
                      .map(
                        (iid) => !currentSelectedRowKeys.includes(iid) && iid,
                      )
                      .filter(Boolean),
                  );

                  return currentSelectedRowKeys;
                });
              },
            },
            {
              key: 'invert_current_page',
              text: t1('invert_data_in_current_page'),
              onSelect: () => {
                setSelectedRowKeys(
                  idInCurrentPage.filter(
                    (iid) => !selectedRowKeys.includes(iid),
                  ),
                );
              },
            },
            Array.isArray(selectedRowKeys) &&
              !!selectedRowKeys.length &&
              !selectedRowKeys.every((iid) =>
                idInCurrentPage.includes(iid),
              ) && {
                key: 'remove_all',
                text: t1('remove_all_data_selected'),
                onSelect: () => {
                  setSelectedRowKeys([]);
                },
              },
          ].filter(Boolean),
        }}
      />
      {mode !== 'new' ? (
        <DeleteItem
          title={t1('delete')}
          textConfirm={t1(
            'are_you_sure_you_want_to_delete_%s_selected_enrolment_plans_from_sales_package?',
            [selectedRowKeys.length],
          )}
          formid={formid}
          itemId={node.id}
          alternativeApi={apiUrls.deleteEnrolmentPlans}
          params={{
            sales_package_iid: node.iid,
            enrollment_plan_iids: selectedRowKeys.join(','),
          }}
          onRequestSuccessful={() => setSelectedRowKeys([])}
          renderComponent={({ onClick }) => (
            <RaisedButton
              disabled={
                !Array.isArray(selectedRowKeys) || !selectedRowKeys.length
              }
              onClick={onClick}
              icon={'plus'}
              label={t1(`delete_%s_selected_enrolment_plans`, [
                Array.isArray(selectedRowKeys) ? selectedRowKeys.length : 0,
              ])}
              className="m-t-10"
              buttonType="danger"
            />
          )}
        />
      ) : (
        <RaisedButton
          disabled={!Array.isArray(selectedRowKeys) || !selectedRowKeys.length}
          onClick={handleButtonClick}
          icon={'plus'}
          label={t1(`add_%s_selected_enrolment_plans`, [
            Array.isArray(selectedRowKeys) ? selectedRowKeys.length : 0,
          ])}
          className="m-t-10"
        />
      )}
    </div>
  );
}

export default connect()(Results);

Results.propTypes = {
  dispatch: PropTypes.func,
  formid: PropTypes.string,
  items: PropTypes.array.isRequired,
  mode: PropTypes.string,
};

Results.defaultProps = {
  mode: 'delete',
};
