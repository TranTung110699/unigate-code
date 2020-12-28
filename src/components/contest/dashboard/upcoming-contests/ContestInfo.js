import React, { Component } from 'react';
import get from 'lodash.get';
import PropTypes from 'prop-types';
import { t1, t3 } from 'translate';
import { Link } from 'react-router-dom';
import Links from 'routes/links';
import { timestampToDateString } from 'common/utils/Date';
import Card from 'antd/lib/card';
import Descriptions from 'antd/lib/descriptions';
import Badge from 'antd/lib/badge';
import { contestLink } from '../../routes';

class ContestInfo extends Component {
  render() {
    const { contest, mode, noButton } = this.props;
    const style = {
      height: 'auto',
      width: mode === 'dashboard' || mode === 'admin_view' ? '100%' : 'auto',
      display: 'inline-block',
      marginTop: 10,
    };

    const bank = get(contest, 'bank_practice_courses');
    const campu = get(contest, 'shift_exam.campu');
    const room = get(contest, 'shift_exam.room');

    return (
      <div className="m-b-10">
        <Card size="small">
          <Descriptions
            bordered
            title={
              <>
                {Math.floor(Date.now() / 1000) >
                  get(contest, 'shift_exam.start_date') &&
                  Math.floor(Date.now() / 1000) <
                    get(contest, 'shift_exam.end_date') && (
                    <Badge status="processing" />
                  )}
                {get(contest, 'name')}
                <p>{get(contest, 'exam_round.name')}</p>
              </>
            }
            column={1}
          >
            {/*
            <Descriptions.Item label={t1('exam_round_name')}>
              {get(contest, 'exam_round.name')}
            </Descriptions.Item>
               */}
            <Descriptions.Item label={t1('exam_shift')}>
              {get(contest, 'shift_exam.name')}
            </Descriptions.Item>
            <Descriptions.Item label={t1('start_time')}>
              {timestampToDateString(get(contest, 'shift_exam.start_date'), {
                showTime: true,
              })}
            </Descriptions.Item>
            <Descriptions.Item label={t1('end_time')}>
              {timestampToDateString(get(contest, 'shift_exam.end_date'), {
                showTime: true,
              })}
            </Descriptions.Item>
            {get(campu, 'iid') ? (
              <Descriptions.Item label={t1('campus')}>
                {get(campu, 'name')}
                {get(campu, 'address') ? ` (${get(campu, 'address')})` : null}
              </Descriptions.Item>
            ) : null}
            {get(room, 'iid') ? (
              <Descriptions.Item label={t1('room')}>
                {get(room, 'name')}
              </Descriptions.Item>
            ) : null}
            <Descriptions.Item label={t1('test_will_last_in')}>
              {get(contest, 'exam_round.duration') || t3('n/a')}
            </Descriptions.Item>
          </Descriptions>
          {!noButton && (
            <div className="text-center m-t-20">
              <a href={contestLink(contest.code)}>
                <button className="btn-go-to-contest">
                  {t3('go_to_contest')}
                </button>
              </a>
              <div>
                <br />
                {bank ? (
                  <Link to={Links.learnCourse(bank)}>
                    {t1('practice')} (
                    <b>{t1('%d%%', [get(bank, 'p.p') || 0])}</b>)
                  </Link>
                ) : null}
              </div>
            </div>
          )}
        </Card>
      </div>
    );
  }
}

ContestInfo.propTypes = {
  onHandleGoToContest: PropTypes.func,
  contest: PropTypes.arrayOf(PropTypes.object),
  mode: PropTypes.string,
  noButton: PropTypes.bool,
};

ContestInfo.defaultProps = {
  onHandleGoToContest: null,
  contests: null,
  mode: '',
};

export default ContestInfo;
