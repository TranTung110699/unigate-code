import React from 'react';
import { t1, t3 } from 'translate';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Card from 'antd/lib/card';
import Image from 'common/images/default-learning-material-avatar.png';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Dropdown from 'antd/lib/dropdown';
import Icon from 'antd/lib/icon';
import './stylesheet.scss';
import Tooltip from 'antd/lib/tooltip';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { timestampToDateString } from 'common/utils/Date';
import lodashGet from 'lodash.get';

class CardResult extends React.Component {
  render() {
    const { items, listView, readOnly } = this.props;
    let { menu } = this.props;

    let renderResult;
    const cssClass = 'EP-result';
    let textStatus;

    const cssStatus = (status) => {
      switch (status) {
        case 'created':
          textStatus = 'text-warning';
          break;
        case 'queued':
          textStatus = 'text-queued';
          break;
        case 'approved':
          textStatus = 'text-info';
          break;
        case 'executed':
          textStatus = 'text-success';
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
          <Link
            to={routes.url(
              'node_edit',
              Object.assign({}, item, { ntype: 'enrolment_plan' }),
            )}
          >
            {item.name}
          </Link>
        </Tooltip>
      </div>
    );
    const getTraningPlanName = (item) => {
      return lodashGet(item, '__expand.training_plan_iid.name') &&
        lodashGet(item, '__expand.training_plan_iid.name').includes(
          t1('training_plan'),
        )
        ? lodashGet(item, '__expand.training_plan_iid.name').replace(
            t1('training_plan'),
            '',
          )
        : lodashGet(item, '__expand.training_plan_iid.name');
    };

    if (items) {
      renderResult = items.map((item) => {
        menu =
          typeof this.props.menu === 'function' ? this.props.menu(item) : null;
        const updateTime = item.updated_ts || item.ts;
        return (
          <Col>
            <Row
              className={`${cssClass}-item ${
                item.status === 'created'
                  ? cssClass + '-item__queued'
                  : cssClass + '-item__content'
              } ${cssClass}-item-flex`}
              key={item.id}
            >
              <Dropdown overlay={menu} trigger={['contextMenu']}>
                <Card>
                  <Col span={3}>
                    <Link
                      to={routes.url(
                        'node_edit',
                        Object.assign({}, item, { ntype: 'enrolment_plan' }),
                      )}
                      className="w-100"
                    >
                      <div
                        className={`${cssClass}-item-header ${cssClass}-item-header__list`}
                        style={{
                          backgroundImage: `url(${item.avatar || Image})`,
                        }}
                      />
                    </Link>
                  </Col>
                  <Col span={20} className={`${cssClass}-item__content m-l-15`}>
                    <Row className="m-b-20">
                      <Col span={14}>
                        {cardTitle(item)}
                        <div className={`${cssClass}-item__code`}>
                          {item.code}
                        </div>
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('training_plan')}
                        </span>
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('number_of_members')}
                        </span>
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('status')}
                        </span>
                      </Col>
                    </Row>
                    <Row className="d-flex align-items-center">
                      <Col span={8}>
                        <div className={`${cssClass}-item__author`}>
                          <span>{item.u.name}</span>
                        </div>
                      </Col>
                      <Col span={6}>
                        <span
                          className={`text-muted ${cssClass}-item__time m-t-30`}
                        >
                          {updateTime &&
                            `${t1('last_modified')}: ${timestampToDateString(
                              updateTime,
                            )}`}
                        </span>
                      </Col>
                      <Col span={3} className="text-center">
                        <span className="text-bold">
                          {getTraningPlanName(item) &&
                          getTraningPlanName(item).length > 40 ? (
                            <Tooltip title={getTraningPlanName(item)}>
                              {`${getTraningPlanName(item).slice(0, 40)}...`}
                            </Tooltip>
                          ) : (
                            getTraningPlanName(item)
                          )}
                        </span>
                      </Col>
                      <Col span={3} className="text-center text-number">
                        <span className="text-bold">
                          {lodashGet(item, '__expand.number_of_members') || 0}
                        </span>
                      </Col>
                      <Col
                        span={3}
                        className={`text-center text-number text-status ${cssStatus(
                          item.status,
                        )}`}
                      >
                        <span className="text-bold">{t3(item.status)}</span>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    span={1}
                    style={{ height: '100px', textAlign: 'center' }}
                  >
                    {!readOnly && (
                      <Dropdown
                        overlay={menu}
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
      if (listView) {
      } else {
        renderResult = items.map((item) => {
          menu =
            typeof this.props.menu === 'function'
              ? this.props.menu(item)
              : null;
          const updateTime = item.updated_ts || item.ts;
          return (
            <Col span={6}>
              <Dropdown overlay={menu} trigger={['contextMenu']}>
                <Card
                  bordered={false}
                  hoverable
                  cover={
                    <Link
                      to={routes.url(
                        'node_edit',
                        Object.assign({}, item, { ntype: 'enrolment_plan' }),
                      )}
                      className="w-100"
                    >
                      <div
                        className={`${cssClass}-item-header ${cssClass}-item-header__card`}
                        style={{
                          backgroundImage: `url(${item.avatar || Image})`,
                        }}
                      />
                    </Link>
                  }
                  className={`${cssClass}-item ${
                    item.status === 'created'
                      ? cssClass + '-item__queued'
                      : cssClass + '-item__content'
                  } ${cssClass}-item__thumb-view`}
                >
                  <Card.Meta
                    title={
                      <React.Fragment>
                        {cardTitle(item)}
                        <div className={`${cssClass}-item__code`}>
                          {item.code}
                        </div>
                      </React.Fragment>
                    }
                    description={
                      <React.Fragment>
                        <Row className="m-t-15">
                          <Col span={8}>
                            <Tooltip
                              placement="bottom"
                              title={t1('last_modified')}
                            >
                              <span
                                className={`text-muted ${cssClass}-item__time`}
                                title={t1('last_modified')}
                              >
                                {updateTime && (
                                  <span>
                                    <Icon type="edit" theme="filled" />{' '}
                                    {timestampToDateString(updateTime, {
                                      type: 'long_date',
                                    })}
                                  </span>
                                )}
                              </span>
                            </Tooltip>
                          </Col>
                          <Col span={16} className="text-right">
                            <Col span={14}>
                              {lodashGet(
                                item,
                                '__expand.training_plan_iid.name',
                              ) && (
                                <Tooltip
                                  placement="bottom"
                                  title={`${t1('training_plan')}: ${
                                    getTraningPlanName(item).length > 15
                                      ? getTraningPlanName(item)
                                      : ''
                                  }`}
                                >
                                  <Icon
                                    type="schedule"
                                    theme="twoTone"
                                    twoToneColor="#21A237"
                                  />{' '}
                                  <span
                                    className={`${cssClass}-item__number text-center`}
                                  >
                                    {getTraningPlanName(item).length > 10
                                      ? `${getTraningPlanName(item).slice(
                                          0,
                                          10,
                                        )}...`
                                      : getTraningPlanName(item)}
                                  </span>
                                </Tooltip>
                              )}
                            </Col>
                            <Col span={8}>
                              <Tooltip
                                placement="bottom"
                                title={t1('number_of_members')}
                              >
                                <Icon
                                  type="team"
                                  style={{ color: '#3B7BBE' }}
                                />{' '}
                                <span
                                  className={`${cssClass}-item__number text-center text-number`}
                                >
                                  {lodashGet(
                                    item,
                                    '__expand.number_of_members',
                                  ) || 0}
                                </span>
                              </Tooltip>
                            </Col>
                          </Col>
                        </Row>
                        <Row className="m-t-15 d-flex justify-content-between">
                          <Col
                            span={20}
                            className={`text-number text-bold text-status ${cssStatus(
                              item.status,
                            )}`}
                          >
                            {t3(item.status)}
                          </Col>
                          <Col
                            span={4}
                            style={{ height: '20px' }}
                            className="text-right"
                          >
                            <Dropdown
                              overlay={menu}
                              trigger={['click']}
                              className="btn-action "
                            >
                              <a className="ant-dropdown-link" href="#">
                                <MoreVert />
                              </a>
                            </Dropdown>
                          </Col>
                        </Row>
                      </React.Fragment>
                    }
                  />
                </Card>
              </Dropdown>
            </Col>
          );
        });
      }
    }
    return (
      <div className="EP-result-render">
        <Row gutter={24} className={cssClass}>
          {renderResult}
        </Row>
      </div>
    );
  }
}

export default CardResult;
