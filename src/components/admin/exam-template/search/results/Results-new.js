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
import Menu from 'antd/lib/menu';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import routes from 'routes';
import Status from 'components/common/Status';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Icon from 'components/common/Icon';

class CardResult extends React.Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid, readOnly, cloneExamTemplate } = this.props;

    let renderResult;
    const cssClass = 'exam-template-result';
    let menu = (item) => (
      <Menu>
        <Menu.Item key="0">
          <Link
            to={routes.url(
              'node_edit',
              Object.assign(item, { step: 'information' }),
            )}
          >
            {t1('edit')}
          </Link>
        </Menu.Item>
        {item &&
          item.status !== 'deleted' && [
            <Menu.Item key="2">
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <Icon icon="clone" className="action" onClick={showFull}>
                    {t1('clone')}
                  </Icon>
                )}
                renderFull={({ closeDialog }) => cloneExamTemplate(item)}
                dialogOptionsProperties={{
                  handleClose: true,
                  title: t1('clone_exam_template_from_%s', [item.name]),
                }}
              />
            </Menu.Item>,
            <Menu.Item key="1">
              <DeleteItem
                title={t1('delete')}
                textConfirm={t1('are_you_sure_you_want_to_do_this')}
                formid={formid}
                ntype={'exam-template'}
                itemId={item.id}
                clearTextButton={t1('remove')}
              />
            </Menu.Item>,
          ]}
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
                      <Col span={18}>
                        <div className={`${cssClass}-item__title`}>
                          <Tooltip placement="topLeft" title={item.name}>
                            <Link
                              to={routes.url(
                                'node_edit',
                                Object.assign(item, { step: 'dashboard' }),
                              )}
                            >
                              {item.name}
                            </Link>
                          </Tooltip>
                        </div>
                        <div className={`${cssClass}-item__code`}>
                          {item.code}
                        </div>
                      </Col>
                      <Col span={3} className="text-center">
                        <span
                          className={`text-secondary ${cssClass}-item__info`}
                        >
                          {t1('bank_questions_count')}
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
                    <Row>
                      <Col span={18}>
                        <div className={`${cssClass}-item__author`}>
                          {item.organizations
                            ? item.organizations.map((origanization) => (
                                <div key={`${origanization.iid}-extpl`}>
                                  {origanization.name}
                                </div>
                              ))
                            : null}
                        </div>
                      </Col>
                      <Col span={3} className="text-center text-number">
                        <span className="text-bold">
                          {item.bank_questions_count}
                        </span>
                      </Col>
                      <Col
                        span={3}
                        className={`text-center text-number text-status`}
                      >
                        <span className="text-bold exam-template-status">
                          {item.status === 'approved' ? (
                            <Status
                              text={t1('approved')}
                              status={item.status}
                            />
                          ) : item.status === 'queued' ? (
                            <Status
                              text={t1('queued')}
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
      <div className="NEW_UI_JULY_2019-exam-template-result-render m-b-20">
        <Row gutter={24} className={cssClass}>
          {renderResult}
        </Row>
      </div>
    );
  }
}

export default CardResult;
