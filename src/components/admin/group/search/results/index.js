import React, { Component } from 'react';
import List from 'antd/lib/list';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import './style.scss';
import { t1 } from 'translate';
import routes from 'routes';
import { Link } from 'react-router-dom';
import MoreVert from 'material-ui/svg-icons/navigation/more-vert';
import Dropdown from 'antd/lib/dropdown';
import Menu from 'antd/lib/menu';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import { timestampToDateString } from 'common/utils/Date';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

class XResults extends Component {
  render() {
    const { items, formid } = this.props;
    const cssClass = 'group-result';

    const dashboardUrl = (item) =>
      routes.url(
        'node_edit',
        Object.assign({}, item, {
          ntype: 'group',
          step: 'members',
        }),
      );

    const menu = (item) => (
      <Menu>
        <Menu.Item key="0">
          <Link to={dashboardUrl(item)}>{t1('edit')}</Link>
        </Menu.Item>
        <Menu.Item key="1">
          <DeleteItem
            textConfirm={t1('are_you_sure_you_want_to_do_this')}
            formid={formid}
            ntype="group"
            itemId={item.id}
            title={t1('remove')}
            clearTextButton={t1('remove')}
            alternativeApi="group/api/delete"
          />
        </Menu.Item>
      </Menu>
    );

    return (
      <List
        bordered
        dataSource={items}
        renderItem={(item) => (
          <List.Item className={`${cssClass}-item`}>
            <Dropdown overlay={menu(item)} trigger={['contextMenu']}>
              <Row className="w-100 d-flex align-items-center" gutter={24}>
                <Col span={13}>
                  <Link to={dashboardUrl(item)}>{item.name}</Link>
                </Col>
                <Col span={3} className="text-center">
                  <OrganizationsOrPhongBan item={item} attr={'organizations'} />
                </Col>
                <Col span={3} className="text-center">
                  <Row>{t1('members')}</Row>
                  <Row className={`${cssClass}-item__number`}>
                    {item.current_members || 0}
                  </Row>
                </Col>
                <Col span={3} className="text-center">
                  <Row>{t1('created_date')}</Row>
                  <Row className={`${cssClass}-item__number`}>
                    {timestampToDateString(item.ts)}
                  </Row>
                </Col>
                <Col span={2} className="text-right">
                  <Dropdown
                    overlay={menu(item)}
                    trigger={['click']}
                    className="btn-action "
                  >
                    <a className="ant-dropdown-link" href="#">
                      <MoreVert />
                    </a>
                  </Dropdown>
                </Col>
              </Row>
            </Dropdown>
          </List.Item>
        )}
        className={cssClass}
      />
    );
  }
}

export default XResults;
