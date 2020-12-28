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

class CardResult extends React.Component {
  render() {
    const { items, listView, readOnly } = this.props;
    let { menu } = this.props;
    // === waiting for data ===
    const learningNumber = null;
    const completeNumber = null;
    // ===
    let renderResult;
    const cssClass = 'credit-result';
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
          <Link to={`/admin/credit/${item.iid}/dashboard`}>{item.name}</Link>
        </Tooltip>
      </div>
    );
    if (items) {
      renderResult = items.map((item) => {
        menu =
          typeof this.props.menu === 'function' ? this.props.menu(item) : null;
        const updateTime = item.updated_ts || item.ts;
        return (
          <Col>
            <Row
              className={`${cssClass}-item ${
                item.status === 'queued'
                  ? cssClass + '-item__queued'
                  : cssClass + '-item__content'
              }
                ${cssClass}-item-flex
                `}
              key={item.id}
            >
              <Dropdown overlay={menu} trigger={['contextMenu']}>
                <Card>
                  <Col span={3}>
                    <Link
                      to={`/admin/credit/${item.iid}/dashboard`}
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
                        {cardTitle(item)}{' '}
                        <div className={`${cssClass}-item__code`}>
                          {item.code}
                        </div>
                      </Col>
                      <Col span={3} className="text-center">
                        {learningNumber && (
                          <span
                            className={`text-secondary ${cssClass}-item__info`}
                          >
                            {t1('learning')}
                          </span>
                        )}
                      </Col>
                      <Col span={3} className="text-center">
                        {completeNumber && (
                          <span
                            className={`text-secondary ${cssClass}-item__info`}
                          >
                            {t1('complete')}
                          </span>
                        )}
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('status')}
                        </span>
                      </Col>
                    </Row>
                    <Row>
                      <Col span={8}>
                        <div className={`${cssClass}-item__author`}>
                          {item.staff &&
                            item.staff.map((staff) => (
                              <span>{staff.name}</span>
                            ))}
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
                      <Col span={3} className="text-center text-number">
                        {learningNumber && (
                          <span className="text-bold">{learningNumber}</span>
                        )}
                      </Col>
                      <Col span={3} className="text-center text-number">
                        {completeNumber && (
                          <span className="text-bold">{completeNumber}</span>
                        )}
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
                      to={`/admin/credit/${item.iid}/dashboard`}
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
                    item.status === 'queued'
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
                          <Col span={14}>
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
                          </Col>
                          <Col span={10} className="text-right">
                            <Col span={12}>
                              {learningNumber && (
                                <React.Fragment>
                                  <Icon
                                    type="star"
                                    theme="twoTone"
                                    twoToneColor="#21A237"
                                  />
                                  &nbsp;
                                  <span
                                    className={`${cssClass}-item__number text-center text-number`}
                                  >
                                    {learningNumber}
                                  </span>
                                </React.Fragment>
                              )}
                            </Col>
                            <Col span={12}>
                              {completeNumber && (
                                <React.Fragment>
                                  <Icon
                                    type="star"
                                    theme="filled"
                                    style={{ color: '#3B7BBE' }}
                                  />
                                  &nbsp;
                                  <span
                                    className={`${cssClass}-item__number text-center text-number`}
                                  >
                                    {completeNumber}
                                  </span>
                                </React.Fragment>
                              )}
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
      <div className="NEW_UI_JULY_2019-credit-result-render m-b-20">
        <Row gutter={24} className={cssClass}>
          {renderResult}
        </Row>
      </div>
    );
  }
}

export default CardResult;
