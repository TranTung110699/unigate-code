import React, { Component } from 'react';
import PropTypes from 'prop-types';
import fetchData from 'components/common/fetchData';
import get from 'lodash.get';
import apiUrls from 'components/admin/enrolment-plan/endpoints/index';
import AntTable from 'antd/lib/table';
import Loading from 'components/common/loading';

// import { t1 } from 'translate';

const parseDataColumns = (organizations, stats, creditSyllabusIid = 0) => {
  let ret = organizations
    .map((org) => {
      if (!get(stats, `org_total.${org.iid}.total`)) return null;

      return {
        title: (
          <div>
            <b>{org.name}</b>
            <br />
            (đã xếp / tổng)
          </div>
        ),
        key: org.iid,
        render: (item) => {
          if (item.iid) {
            //syllabus
            return (
              <div>
                {get(stats, `${item.iid}.${org.iid}.arranged`) || '0'} /
                {get(stats, `${item.iid}.${org.iid}.total`)}
              </div>
            );
          }
        },
      };
    })
    .filter(Boolean);

  if (!creditSyllabusIid) {
    ret.unshift({
      title: 'Môn',
      key: 'syllabus_name',
      render: (item) => {
        return item.name;
      },
    });
  }

  ret.push({
    title: (
      <div>
        <b>Tổng số người học môn</b>
        <br />
        (đã xếp / tổng)
      </div>
    ),
    key: 'credit_syllabus_total',
    render: (item) => {
      let total = 0;
      let arranged = 0;
      // const syllabusIid = item.iid;
      const syllabusStats = get(stats, item.iid);
      for (let orgIid in syllabusStats) {
        total = total + (get(syllabusStats, `${orgIid}.total`) || 0);
        arranged = arranged + (get(syllabusStats, `${orgIid}.arranged`) || 0);
      }

      return (
        <span>
          {arranged}/{total}
        </span>
      );
    },
  });

  return ret;
};

class MembersOverview extends Component {
  render() {
    const { data, creditSyllabusIid } = this.props;

    const header = <h2>Tình trạng gán học viên vào lớp theo môn</h2>;

    if (!data)
      return (
        <div className="whitebox">
          {header}
          <h3>Đang tải......</h3>
          <Loading />
        </div>
      );

    const { syllabuses, organizations, stats } = data;

    let items = syllabuses;
    if (creditSyllabusIid) {
      items = syllabuses.filter(
        (syllabus) => syllabus.iid == creditSyllabusIid,
      );
    }

    const columns = parseDataColumns(organizations, stats, creditSyllabusIid);

    return (
      <div className="whitebox">
        {header}
        <AntTable
          dataSource={items}
          columns={columns}
          childrenColumnName={null}
          pagination={false}
          rowKey="id"
        />
      </div>
    );
  }
}

MembersOverview.propTypes = {
  // when we pass this (when viewing the courses status of a credit syllabus), we will filter out other syllabuses
  creditSyllabusIid: PropTypes.number,
  // node: the enrolment plan object
};

MembersOverview.defaultProps = {
  creditSyllabusIid: 0,
};

export default fetchData((props) => ({
  baseUrl: apiUrls.members_overview_stats,
  params: {
    enrolment_plan_iid: props.node && props.node.iid,
  },
  keyState: 'members_overview',
  propKey: 'data',
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(MembersOverview);
