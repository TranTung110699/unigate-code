import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AntdTable from 'antd/lib/table';
import { t1 } from 'translate';
import routes from 'routes';
import { Link } from 'react-router-dom';

class Results extends Component {
  showContestResultBaseOnTopEquivalentPositionsData = () => {
    let contestResultBaseOnTopEquivalentPositionsData = [];
    const topEquivalentPositions = this.props.topEquivalentPositions || [];

    for (
      let keyIndex = 0;
      keyIndex < topEquivalentPositions.length;
      ++keyIndex
    ) {
      contestResultBaseOnTopEquivalentPositionsData.push({
        title: `${topEquivalentPositions[keyIndex].CDANHTDUONG_EVN}`,
        render: (text, row) => {
          return (
            <div>
              {row &&
              row[
                `numbers_of_joined_users_` +
                  topEquivalentPositions[keyIndex].iid
              ] ? (
                <span>
                  {Number(
                    (
                      row[
                        `score_per_100_` + topEquivalentPositions[keyIndex].iid
                      ] /
                      row[
                        `numbers_of_joined_users_` +
                          topEquivalentPositions[keyIndex].iid
                      ]
                    ).toFixed(1),
                  )}
                </span>
              ) : (
                <span>0</span>
              )}
            </div>
          );
        },
      });
    }

    return contestResultBaseOnTopEquivalentPositionsData;
  };

  render() {
    const { items } = this.props;
    const columns = [
      {
        title: t1('stt'),
        key: 'id',
        render: (text, row, index) => ({
          children: index + 1,
        }),
      },
      {
        title: t1('organization'),
        key: 'id',
        render: (text, row) => {
          return (
            <Link
              to={routes.url(
                'node_edit',
                Object.assign({}, row && row.organization, {
                  ntype: 'category',
                  type: 'organization',
                }),
              )}
            >
              {row && row.organization && row.organization.name}
            </Link>
          );
        },
      },
      {
        title: t1('contest_result'),
        key: 'id',
        render: (text, row) => {
          return (
            <span>
              {row.passed} / {row.failed}
            </span>
          );
        },
      },
      {
        title: t1('participant_rate'),
        key: 'id',
        render: (text, row) => {
          return (
            <span>{Number((row.participant_rate * 100).toFixed(1))}%</span>
          );
        },
      },
      {
        title: t1('average_test_score'),
        children: this.showContestResultBaseOnTopEquivalentPositionsData(),
      },
    ];

    return (
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
        className="report-contest-result"
      />
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
