import React from 'react';
import Table from 'antd/lib/table';
import { t, t1 } from 'translate';
import { Link } from 'react-router-dom';
import routes from 'routes';
import lodashGet from 'lodash.get';
import { displayVNMoney } from 'common/utils/money';
import Icon from 'antd/lib/icon';
import Typography from 'antd/lib/typography';
import { getBuyPackageUrl } from 'routes/links/common';
import { withRouter } from 'react-router';
import { packageStatus } from 'configs/constants/sales-package';
import { connect } from 'react-redux';
import api from '../endpoints';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import PackageControl from '../edit/PackageControl';

function Results({ items, location, dispatch, formid }) {
  const columns = [
    {
      title: t1('name'),
      key: 'name',
      dataIndex: 'name',
      render: (name, { iid }) => (
        <Link
          to={routes.url('node_edit', {
            ntype: 'sales-package',
            iid,
            step: 'dashboard',
          })}
        >
          {name}
        </Link>
      ),
    },
    {
      title: t1('price'),
      key: 'price',
      dataIndex: 'price',
      render: (price) => displayVNMoney(price),
    },
    {
      title: t1('reduced_price'),
      key: 'reduced_price',
      dataIndex: 'reduced_price',
      render: (reducedPrice) =>
        reducedPrice !== undefined ? displayVNMoney(reducedPrice) : '-',
    },
    {
      title: t1('duration'),
      key: 'duration',
      dataIndex: 'duration',
      render: (duration) => `${duration} ${t('month')}`,
    },
    {
      title: t1('enrolment_plan'),
      key: 'enrolment_plan',
      dataIndex: 'enrollment_plans',
      render: (enrollmentPlans) => {
        if (Array.isArray(enrollmentPlans) && enrollmentPlans.length) {
          return (
            <div>
              {enrollmentPlans.map((enrollmentPlan) => (
                <div>
                  <Link
                    to={routes.url(
                      'node_edit',
                      Object.assign({}, enrollmentPlan, {
                        ntype: 'enrolment_plan',
                      }),
                    )}
                    target="_blank"
                  >
                    {lodashGet(enrollmentPlan, 'name')}
                  </Link>
                </div>
              ))}
            </div>
          );
        }
        return null;
      },
    },
    {
      title: t1('approve'),
      key: 'status',
      dataIndex: 'status',
      align: 'center',
      render: (status, item) => <PackageControl item={item} formid={formid} />,
    },
    {
      title: t1('actions'),
      key: 'actions',
      className: 'text-center',
      render: ({ iid, status, name }) => {
        if (status === packageStatus.deleted) {
          return null;
        }

        return (
          <div className="d-flex justify-content-center">
            <Link
              to={routes.url('node_edit', {
                ntype: 'sales-package',
                iid,
                step: 'info',
              })}
              title={t1('edit')}
            >
              <Icon type="edit" />
            </Link>
            <Typography.Paragraph
              copyable={{
                text: `${window.location.protocol}//${
                  window.location.hostname
                }${
                  window.location.port ? `:${window.location.port}` : ''
                }${getBuyPackageUrl(`cart/${iid}`)}`,
              }}
              className="m-r-5"
            />
            <DeleteItem
              title={t1('remove')}
              alternativeApi={api.changeStatus}
              textConfirm={t1('are_you_sure_you_want_to_delete_%s?', [name])}
              formid={formid}
              params={{
                iid: iid,
                status: packageStatus.deleted,
              }}
              icon="delete"
              iconButton
            />
          </div>
        );
      },
    },
  ];

  return (
    <Table
      dataSource={items}
      columns={columns}
      className="white-background"
      rowKey="iid"
      pagination={false}
      childrenColumnName={null}
      bordered
    />
  );
}

export default connect()(withRouter(Results));
