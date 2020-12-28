import React from 'react';
import { t1 } from 'translate';
import AntdTable from 'antd/lib/table';
import { timestampToDateTimeString } from 'common/utils/Date';
import lodashGet from 'lodash.get';
import Link from 'components/common/router/Link';
import routes from 'routes';

const SpecializedWorkTimeSheetSearchResults = ({ items }) => (
  <AntdTable
    className={'white-background'}
    columns={[
      {
        width: '10%',
        title: t1('type'),
        key: 'ntype',
        render: (row) => t1(lodashGet(row, 'ntype')),
      },
      {
        width: '10%',
        title: t1('created_time'),
        key: 'created_time',
        render: (row) => {
          const ts = lodashGet(row, 'ts');
          return ts ? timestampToDateTimeString(ts) : '';
        },
      },
      {
        title: t1('name'),
        key: 'name',
        render: (row) => (
          <Link
            to={routes.url(
              'node_edit',
              Object.assign(
                {
                  ntype: lodashGet(row, 'ntype'),
                },
                lodashGet(row, 'item'),
              ),
            )}
          >
            {lodashGet(row, 'item.name')}
          </Link>
        ),
      },
      {
        title: t1('organizations'),
        key: 'name',
        render: (row) =>
          (lodashGet(row, 'organization_names') || []).join(', '),
      },
      {
        title: t1('information'),
        key: 'information',
        render: (row) => {
          switch (lodashGet(row, 'ntype')) {
            case 'contest': {
              return (
                <div>
                  <b>{t1('number_of_contestants')}</b>:{' '}
                  {lodashGet(row, 'item.number_of_contestants')}
                </div>
              );
            }
            case 'enrolment_plan': {
              return (
                <div>
                  <b>{t1('number_of_members')}</b>:{' '}
                  {lodashGet(row, 'item.number_of_members')}
                </div>
              );
            }
          }
        },
      },
      {
        title: t1('author'),
        key: 'author',
        render: (row) => {
          const name = lodashGet(row, 'u.name');
          const code = lodashGet(row, 'u.code');
          return `${name}${code ? ` (${code})` : ''}`;
        },
      },
    ]}
    dataSource={items}
    pagination={false}
    bordered
  />
);

export default SpecializedWorkTimeSheetSearchResults;
