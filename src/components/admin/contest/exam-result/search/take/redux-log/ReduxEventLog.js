import React, { Component } from 'react';
import { t1 } from 'translate/index';
import UploadReduxLog from './UploadReduxLog';
import getLodash from 'lodash.get';
import ApiRequestBtnWithConfirmDialog from 'components/common/action-button/ApiRequestBtnWithConfirmDialog';
import apiUrls from 'components/admin/contest/endpoints';
import RaisedButton from 'components/common/mui/RaisedButton';
import Warning from 'components/common/Warning';

const styles = {
  maxHeight: '250px',
  overflowY: 'scroll',
};

class ReduxEventLog extends Component {
  render() {
    const { take, readOnly } = this.props;
    const reduxLog = getLodash(take, 'redux_log');
    const takeId = getLodash(take, 'id');

    let reduxLogArr;

    try {
      reduxLogArr = JSON.parse(reduxLog);
    } catch (e) {
      reduxLogArr = [];
    }

    return (
      <div>
        <h2>{Array.isArray(reduxLogArr) && reduxLogArr.length} events</h2>

        <div style={styles} className="whitebox">
          {Array.isArray(reduxLogArr) && reduxLogArr.length ? (
            reduxLogArr.map((logEntry, i) => {
              return (
                <div id={`${take.id}-entry-${i}`}>
                  <div>
                    <b>
                      {i + 1}. {logEntry.type}
                    </b>
                  </div>
                  <div>{JSON.stringify(logEntry)}</div>
                </div>
              );
            })
          ) : (
            <div>{reduxLog ? reduxLog : t1('no_violations_log')}</div>
          )}
        </div>

        <div className="text-center m-t-20">
          <ApiRequestBtnWithConfirmDialog
            renderComponent={({ onClick }) => {
              return (
                <RaisedButton
                  label={t1('mark_this_take_with_this_redux_log')}
                  onClick={onClick}
                  className="m-l-10 m-r-10"
                  primary
                />
              );
            }}
            url={apiUrls.mark_redux_log}
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

        {!readOnly && (
          <div className="m-t-20">
            <h2>
              {t1('upload_exam_event_log')}
              <UploadReduxLog node={take} />
            </h2>
          </div>
        )}
      </div>
    );
  }
}

export default ReduxEventLog;
