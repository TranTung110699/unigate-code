import React from 'react';
import { t1 } from 'translate';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Dropdown from 'antd/lib/dropdown';
import './stylesheet.scss';
import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';
import { timestampToDateTimeString } from 'common/utils/Date';
import Menu from 'antd/lib/menu';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes';
import lodashGet from 'lodash.get';
import Status from 'components/common/Status';

const renderTime = (item, start) => {
  let ts;
  if (start) {
    ts = lodashGet(item, 'start_time');
  } else {
    ts = lodashGet(item, 'end_time');
  }

  let style = null;
  let title = '';
  if (item.ongoing_status === 'ongoing') {
    style = { color: 'green', fontWeight: 'bold' };
    title = t1('contest_is_ongoing');
  } else if (item.ongoing_status === 'soon') {
    style = { color: 'orange' };
    title = t1('contest_is_starting_soon');
  } else if (item.ongoing_status === 'finished') {
    style = { color: 'green' };
    title = t1('contest_is_finished');
  }

  return (
    <span title={title} style={style}>
      {timestampToDateTimeString(ts, { showTime: false })}
    </span>
  );
};
class CardResult extends React.Component {
  render() {
    const { items, formid, ntype, readOnly } = this.props;

    let renderResult;
    const cssClass = 'contest-result';
    let textStatus;

    const cssStatus = (status) => {
      switch (status) {
        case 'queued':
          textStatus = 'text-queued';
          break;
        case 'approved':
          textStatus = 'text-info';
          break;
        case 'deleted':
          textStatus = 'text-danger';
          break;
        default:
          textStatus = 'text-muted';
      }
      return textStatus;
    };
    const cardTitle = (item) => (
      <div className={`${cssClass}-item__title`}>
        <Tooltip placement="topLeft" title={item.name}>
          <Link to={`/admin/contest/${item.iid}/dashboard`}>{item.name}</Link>
        </Tooltip>
      </div>
    );
    let menu = (item) => (
      <Menu>
        <Menu.Item key="2">
          <Link to={`/admin/contest/${item.iid}/dashboard`}>{t1('edit')}</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <DeleteItem
            title={t1('remove_contest')}
            textConfirm={t1(
              'everything_related_to_this_contest_will_be_deleted_and_this_action_is_irreversible',
            )}
            formid={formid}
            ntype={ntype}
            itemId={item.id}
            iconButton
            dialogTitle={`${t1(
              'are_you_sure_you_want_to_remove_this_contest',
            )}?`}
            clearTextButton={t1('remove')}
          />
        </Menu.Item>
      </Menu>
    );
    if (items) {
      renderResult = items.map((item) => {
        return (
          <Col>
            <Row
              className={`${cssClass}-item ${
                item.status === 'queued'
                  ? cssClass + '-item__queued'
                  : cssClass + '-item__content'
              } ${cssClass}-item-flex`}
              key={item.id}
            >
              <Dropdown overlay={menu(item)} trigger={['contextMenu']}>
                <Card>
                  <Col span={23} className={`${cssClass}-item__content`}>
                    <Row className="m-b-20">
                      <Col span={14}>
                        <div className={`${cssClass}-item__title`}>
                          <Tooltip placement="topLeft" title={item.name}>
                            <Link
                              to={routes.url('node_edit', {
                                ...item,
                              })}
                            >
                              {item.name}
                            </Link>
                          </Tooltip>
                        </div>
                        <div className={`${cssClass}-item__code`}>
                          {item.code}
                        </div>
                      </Col>
                      <Col span={2} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('contestants')}
                        </span>
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('start_time')}
                        </span>
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('end_time')}
                        </span>
                      </Col>
                      <Col span={2} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('status')}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={14}>
                        <div className={`${cssClass}-item__author`}>
                          {item.organizations_name &&
                            item.organizations_name.join(',')}
                        </div>
                      </Col>
                      {/*<Col span={6}>*/}
                      {/*  <span*/}
                      {/*    className={`text-muted ${cssClass}-item__time m-t-30`}*/}
                      {/*  >*/}
                      {/*    {item.updated_ts &&*/}
                      {/*    `${t1('last_modified')}: ${timestampToDateString(*/}
                      {/*      item.updated_ts,*/}
                      {/*      { type: 'full_date' },*/}
                      {/*    )}`}*/}
                      {/*  </span>*/}
                      {/*</Col>*/}
                      <Col span={2} className="text-center text-number">
                        <span className="text-bold">
                          {lodashGet(item, 'counter.contestants')}
                        </span>
                      </Col>
                      <Col span={3} className="text-center text-number">
                        <span className="text-bold contest-status">
                          {renderTime(item, 'start')}
                        </span>
                      </Col>
                      <Col span={3} className="text-center text-number">
                        <span className="text-bold contest-status">
                          {renderTime(item)}
                        </span>
                      </Col>
                      <Col
                        span={2}
                        className={`text-center text-number text-status`}
                      >
                        <span className="text-bold contest-status">
                          {item.ongoing_status === 'finished' ? (
                            <Status
                              text={t1('finished')}
                              status={item.status}
                            />
                          ) : item.ongoing_status === 'ongoing' ? (
                            <Status
                              text={t1('ongoing')}
                              status={item.status}
                              bold
                            />
                          ) : (
                            <Status status={item.status} />
                          )}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    span={1}
                    style={{ height: '100px', textAlign: 'center' }}
                  >
                    {!readOnly && (
                      <Dropdown
                        overlay={menu(item)}
                        trigger={['click']}
                        className="btn-action "
                      >
                        <a className="ant-dropdown-link" href="#">
                          <MoreVert />
                        </a>
                      </Dropdown>
                    )}
                  </Col>
                </Card>
              </Dropdown>
            </Row>
          </Col>
        );
      });
    }
    return (
      <div className="NEW_UI_JULY_2019-contest-result-render m-b-20">
        <Row gutter={24} className={cssClass}>
          {renderResult}
        </Row>
      </div>
    );
  }
}

export default CardResult;
