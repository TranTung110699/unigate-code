import React from 'react';
import getLodash from 'lodash.get';
import { t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import AntdTable from 'antd/lib/table';
import GroupAction from 'components/common/GroupAction';
import { formatMoney } from 'common';
import Avatar from 'components/common/avatar';
import { timestampToDateString } from 'common/utils/Date';
import { reqStatuses, reqTypes } from 'configs/constants';
import DisplayHtml from 'components/common/html';
import Attachment from '../common/Attachment';

const urlUpdateRequest = '/req/update';
const getActionProcessRequestWithUser = (request, searchFormId) => {
  if (request.status === reqStatuses.STATUS_SENT) {
    return (
      <DeleteItem
        title={t1('cancel')}
        alternativeApi={urlUpdateRequest}
        formid={searchFormId}
        icon="cancel"
        step="status"
        params={{
          status: reqStatuses.STATUS_CANCEL,
        }}
        ntype="req"
        itemId={request.id}
      />
    );
  }
  return null;
};

const getActionProcessRequestWithStaffRole = (request = {}, searchFormId) => {
  if (request.request_type === reqTypes.REGISTER_CREDIT_SYLLABUS) {
    return null;
  }
  if (
    [reqStatuses.STATUS_PROCESSING, reqStatuses.STATUS_SENT].includes(
      request.status,
    )
  ) {
    return (
      <GroupAction
        key={request.iid}
        options={[
          {
            value: reqStatuses.STATUS_PROCESSING,
            label: t1(reqStatuses.STATUS_PROCESSING),
          },
          {
            value: reqStatuses.STATUS_PROCESSED,
            label: t1(reqStatuses.STATUS_PROCESSED),
          },
          {
            value: reqStatuses.STATUS_REJECTED,
            label: t1(reqStatuses.STATUS_REJECTED),
          },
        ]}
        defaultValue={request.status}
        url={urlUpdateRequest}
        searchFormId={searchFormId}
        params={{
          id: request.id,
          _sand_step: 'status',
        }}
        field="status"
      />
    );
  }
  return null;
};

const SearchResult = ({
  items,
  searchFormId,
  hiddenFields,
  renderActionCell,
  hideFields,
} = {}) => {
  if (!Array.isArray(items) || !items.length) {
    return <div>{t1('no_result')}</div>;
  }

  const requesterIid = getLodash(hiddenFields, 'requester_iid');

  const columns = [
    {
      title: t1('stt'),
      key: 'id',
      render: (text, row, index) => ({
        children: index + 1,
        props: {
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('date_created'),
      render: (text, row) => ({
        children: timestampToDateString(row.ts, {
          showTime: true,
          type: 'long_date',
          unixEpoch: true,
        }),
        props: {
          className: 'text-center',
        },
      }),
    },
    hideFields && hideFields.includes('request_type')
      ? null
      : {
          title: t1('request_type'),
          render: (text, row) => ({
            children: (
              <div>
                {getLodash(row, 'requestTypeDetail.name')}
                <br />
                <span className="text-muted">
                  (#
                  {t1(getLodash(row, 'requestTypeDetail.type'))})
                </span>
              </div>
            ),
            props: {
              className: 'text-center',
            },
          }),
        },
    !requesterIid && {
      title: t1('requester'),
      render: (text, row) => {
        const requester = getLodash(row, 'requester') || {};
        return {
          children: (
            <div>
              <Avatar user={requester} size={30} /> {requester.name}
              <br />
              <span className="text-muted">
                {' '}
                (#
                {requester.code})
              </span>
            </div>
          ),
          props: {
            className: 'text-center',
          },
        };
      },
    },
    {
      title: t1('request_data'),
      render: (text, row) => {
        const data = getLodash(row, `request_data.${row.request_type}`) || {};
        const note = getLodash(row, 'request_data.note');
        const attachments = getLodash(row, 'request_data.attachments');

        let el = '';
        switch (row.request_type) {
          case reqTypes.REGISTER_CREDIT_SYLLABUS: {
            el = (
              <div>
                <p>
                  {t1('credit_syllabus')}:{' '}
                  {`${getLodash(data, 'info.name')} - ${getLodash(
                    data,
                    'info.code',
                  ) || getLodash(data, 'info.iid')}`}
                </p>
                {getLodash(data, 'start_time') && (
                  <p>{`${t1('start_time_to_learning')}: ${timestampToDateString(
                    getLodash(data, 'start_time'),
                    { showTime: true, type: 'long_date', unixEpoch: true },
                  )}`}</p>
                )}
                {getLodash(data, 'end_time') && (
                  <p>{`${t1('date_time_finish_learn')}: ${timestampToDateString(
                    getLodash(data, 'end_time'),
                    { showTime: true, type: 'long_date', unixEpoch: true },
                  )}`}</p>
                )}
              </div>
            );
            break;
          }
          case reqTypes.LEAVE_OF_ABSENCE_BY_DATE: {
            const startTime = timestampToDateString(
              getLodash(data, 'start_time'),
            );
            const endTime = timestampToDateString(getLodash(data, 'end_time'));
            const user = getLodash(data, 'user');
            const sessions = getLodash(data, 'sessions');
            el = (
              <div>
                <span>{`${t1('absent_for')}: ${getLodash(
                  user,
                  'name',
                )} (${getLodash(user, 'code')})`}</span>
                <br />
                <span>{`${t1(
                  'absent_from',
                )}: ${startTime} => ${endTime}`}</span>
                {sessions && (
                  <div>
                    <span>{t1('course')}:</span>
                    <br />
                    {sessions &&
                      sessions.map((session) => {
                        const date = timestampToDateString(
                          getLodash(session, 'scheduled.date_time'),
                        );
                        const courseName = getLodash(session, 'course.name');
                        return (
                          <React.Fragment>
                            <span>
                              {' '}
                              - {date} {courseName}
                            </span>
                            <br />
                          </React.Fragment>
                        );
                      })}
                  </div>
                )}
              </div>
            );
            break;
          }
          case reqTypes.POSTPONE_FEE_DEADLINE: {
            el = (
              <div>
                <p>{`${t1('new_deadline')}: ${timestampToDateString(
                  getLodash(data, 'deadline'),
                  { showTime: false, type: 'long_date', unixEpoch: true },
                )}`}</p>
                {getLodash(data, 'reason') && (
                  <p>{`${t1('reason')}: ${getLodash(data, 'reason')}`}</p>
                )}
                <p>
                  {t1('fees')}:{' '}
                  <ul>
                    {data.fees.map((fee) => (
                      <li>{fee.name}</li>
                    ))}
                  </ul>
                </p>
              </div>
            );
            break;
          }
          default: {
            el = null;
          }
        }

        return (
          <ul>
            {el && <li>{el}</li>}
            {note && (
              <li>
                {t1('note')}: <DisplayHtml content={note} />
              </li>
            )}
            {Array.isArray(attachments) && (
              <li>
                {t1('attachments')}: <Attachment attachments={attachments} />
              </li>
            )}
          </ul>
        );
      },
    },
    hideFields && hideFields.includes('fee')
      ? null
      : {
          title: t1('fee'),
          render: (text, row) => {
            const fee = getLodash(row, 'fee');
            if (!fee) {
              return null;
            }

            return {
              children: fee.amount && (
                <div>
                  {`${formatMoney(fee.amount)} ${getLodash(
                    fee,
                    'fee_template.currency',
                  )}`}
                  <br />
                  <span className="text-muted">({t1(fee.status)})</span>
                </div>
              ),
              props: {
                className: 'text-center',
              },
            };
          },
        },
    {
      title: t1('status'),
      render: (text, row) => ({
        children: t1(row.status),
        props: {
          className: 'text-center',
        },
      }),
    },
    0 && {
      // TODO
      title: t1('process_by'),
      render: (text, row) => ({
        children: 'aAAAAAAA',
        props: {
          className: 'text-center',
        },
      }),
    },
    {
      title: t1('action'),
      key: 'iid',
      render: (text, row) => {
        const actions = renderActionCell
          ? renderActionCell(row)
          : requesterIid
          ? getActionProcessRequestWithUser(row, searchFormId)
          : getActionProcessRequestWithStaffRole(row, searchFormId);

        return {
          children: actions,
          props: {
            className: 'text-center',
          },
        };
      },
    },
  ].filter(Boolean);

  return (
    <div className="col-md-12 m-t-30">
      <AntdTable
        columns={columns}
        dataSource={items}
        pagination={false}
        bordered
        size="middle"
      />
    </div>
  );
};

export default SearchResult;
