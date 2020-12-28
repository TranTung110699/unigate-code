import React, { Component } from 'react';
import { t1, t3 } from 'translate';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';
import { timestampToDateTimeString } from 'common/utils/Date';
import Descriptions from 'antd/lib/descriptions';

import PropTypes from 'prop-types';
import { contestLink } from '../../routes';

class PublicContestsShowByList extends Component {
  render() {
    const { contests, mode } = this.props;
    return (
      <div>
        {!contests || contests.length === 0 ? (
          <div>{t1('no_public_contests')}</div>
        ) : (
          contests.map((contest) => (
            <div>
              <Descriptions bordered title={contest.name} column={1}>
                <Descriptions.Item label={t1('contest_organizer')}>
                  <OrganizationsOrPhongBan
                    item={contest}
                    attr={'organizations'}
                  />
                </Descriptions.Item>

                <Descriptions.Item label={t1('contest_start_time')}>
                  {timestampToDateTimeString(contest.start_time)}
                </Descriptions.Item>

                <Descriptions.Item label={t1('contest_end_time')}>
                  {timestampToDateTimeString(contest.end_time)}
                </Descriptions.Item>
              </Descriptions>

              <div className="text-center m-t-10">
                <a href={contestLink(contest.code)}>
                  <button className="btn-go-to-contest">
                    {t3('go_to_contest')}
                  </button>
                </a>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    );
  }
}

PublicContestsShowByList.propTypes = {
  contests: PropTypes.arrayOf(PropTypes.any),
  mode: PropTypes.string,
};

PublicContestsShowByList.defaultProps = {
  contests: [],
  mode: '',
};

export default PublicContestsShowByList;
