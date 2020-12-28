import React, { Component } from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import { timestampToDateString } from 'common/utils/Date';
import SuccessAlert from 'components/common/SuccessAlert';
import Warning from 'components/common/Warning';
import Loading from 'components/common/loading';
import Widget from 'components/common/Widget';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import apiUrls from '../../../endpoints';
import RaisedButton from 'components/common/mui/RaisedButton';
import Links from 'routes/links';

const styles = {
  maxHeight: '250px',
  overflowY: 'scroll',
};

class TakeOverview extends Component {
  render() {
    const { take, readOnly } = this.props;
    if (!take) {
      return <Loading />;
    }
    const violations = getLodash(take, 'violation');
    const takeId = getLodash(take, 'id');

    const title = (
      <span>
        {t1('basic_take_info')}{' '}
        <a href={Links.previewTake(getLodash(take, 'id'))} target="_blank">
          <RaisedButton label={t1('view_take_details')} primary />
        </a>
      </span>
    );

    return (
      <div>
        <h1>
          {t1('take_overview')} - {getLodash(take, 'exam.name')}
        </h1>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <Widget noMinHeight title={title}>
                <div>
                  {t1('contestant')}: <b>{getLodash(take, 'u.name')}</b>
                </div>
                <div>
                  {t1('score')}:{' '}
                  <b>{getLodash(take, 'score') || t1('not_yet_marked')}</b> /{' '}
                  {getLodash(take, 'total_score')}
                </div>
                <div>
                  {t1('pass_or_fail')}:{' '}
                  {getLodash(take, 'exam_result_status') === 'passed' ? (
                    <SuccessAlert inline>{t1('passed')}</SuccessAlert>
                  ) : (
                    <Warning inline>{t1('failed')}</Warning>
                  )}
                </div>
                <hr />
                <div>
                  {t1('exam_order')}:{' '}
                  <b>{getLodash(take, 'exam.exam_order')}</b>
                </div>
                <div>
                  {t1('spent_time')}: <b>{getLodash(take, 'spent_time')}</b>
                </div>
                <div>
                  {t1('exam_time')}:{' '}
                  {timestampToDateString(getLodash(take, 'st'), {
                    showTime: true,
                  })}{' '}
                  --->{' '}
                  {timestampToDateString(getLodash(take, 'finished_time'), {
                    showTime: true,
                  })}
                </div>
                <div>
                  {t1('nr_of_answers')}:{' '}
                  <b>{getLodash(take, 'nr_of_answers')}</b>
                </div>
              </Widget>

              <Widget noMinHeight title={`${t1('fullscreen_violations')}`}>
                {Array.isArray(violations) && violations.length ? (
                  <div style={styles}>
                    {violations.map((vio, i) => {
                      return (
                        <div id={`${take.id}-vio-${i}`}>
                          <b>{i + 1}</b>.{' '}
                          {timestampToDateString(vio, { showTime: true })}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <span>{t1('no_log')}</span>
                )}
              </Widget>

              <Widget noMinHeight title={t1('technology_details')}>
                <div>
                  {t1('contestant_browser')}: {getLodash(take, 'user_agent')}
                </div>
                <div>
                  {t1('contestant_ip')}: {getLodash(take, 'user_ip')}
                </div>
              </Widget>
            </div>
          </div>
        </div>

        <ApiRequestBtnWithConfirmDialog
          renderComponent={({ onClick }) => {
            return (
              <RaisedButton
                label={t1('mark_this_user')}
                onClick={onClick}
                className="m-l-10 m-r-10"
                primary
              />
            );
          }}
          url={apiUrls.mark_one_take}
          textConfirm={
            <Warning>
              {t1('this_action_will_overwrite_previous_calculated_score')}
            </Warning>
          }
          params={{
            id: takeId,
          }}
          onRequestSuccessful={() => {
            window.location.reload();
          }}
        />
      </div>
    );
  }
}

export default TakeOverview;
