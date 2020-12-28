import React from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import Checkbox from 'antd/lib/checkbox';
import Tooltip from 'antd/lib/tooltip';

const Results = ({ items, objects }) => {
  let [showPercent, setShowPercent] = React.useState(false);
  let toggleShowPercent = () => setShowPercent((v) => !v);

  const { cp_ranges: cpRanges } = objects || {};

  const columns = [
    {
      title: t1('organization'),
      key: 'organization.name',
      dataIndex: 'organization.name',
    },
    {
      title: t1('progress'),
      key: 'progress',
      children: !Array.isArray(cpRanges)
        ? []
        : cpRanges.filter(Boolean).map((rangeConf) => {
            const { range, key } = rangeConf;
            const [lowerBound, upperBound] = range;

            let title = upperBound == 0 ? t1('not_started') : `${upperBound}%`;

            let tooltip =
              upperBound == 0
                ? t1('students_who_have_not_started_learning')
                : `${lowerBound}% - ${upperBound}%`;

            title = <Tooltip title={tooltip}>{title}</Tooltip>;

            return {
              title: title,
              key,
              dataIndex: key,
              render: (n, row) => {
                if (showPercent) {
                  const total = lodashGet(row, 'total');
                  return `${((n / total) * 100).toFixed(2)}`;
                }
                return n;
              },
            };
          }),
    },
    {
      title: t1('number_of_sinvites'),
      key: 'total',
      dataIndex: 'total',
    },
    {
      title: t1('number_of_users'),
      key: 'unique_user_iids',
      dataIndex: 'unique_user_iids',
      render: (uniqueUserIids) => {
        return lodashGet(uniqueUserIids, 'length') || 0;
      },
    },
  ];

  return (
    <div>
      <Checkbox
        checked={showPercent}
        onChange={toggleShowPercent}
        className="p-b-15"
      >
        {t1('show_percentage')}
      </Checkbox>
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        className="report-contest-result"
      />
    </div>
  );
};

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
