import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { t, t1 } from 'translate';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import lGet from 'lodash.get';
import CardResult from './card-result';
import Button from 'antd/lib/button';
import Menu from 'antd/lib/menu';
import Tooltip from 'antd/lib/tooltip';

class ProgramResults extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
    };
  }

  componentDidMount() {
    let listView = localStorage.getItem('displayListView');
    if (listView === null) {
      localStorage.setItem('displayListView', this.state.listView);
    } else {
      this.setState({
        listView: JSON.parse(listView),
      });
    }
  }

  changeView = () => {
    this.setState({
      listView: !this.state.listView,
    });
    localStorage.setItem('displayListView', !this.state.listView);
  };
  render() {
    const { items, formid, ntype, readOnly } = this.props;

    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    const editLink = (item) => `/admin/program/${item.iid}/children`;
    const { listView } = this.state;
    const menu = (item) => (
      <Menu>
        <Menu.Item key="1">
          <Link to={editLink(item)}>{t1('edit')}</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <DeleteItem
            title={t1('remove')}
            textConfirm={textConfirm}
            formid={formid}
            ntype={ntype}
            itemId={item.id}
            clearTextButton={t1('remove')}
          />
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <div className="text-right m-t-20">
          <Tooltip
            title={`${t1('display_mode')} ${t(listView ? 'grid' : 'list')}`}
            placement="left"
          >
            <Button
              icon={`${listView ? 'appstore' : 'bars'}`}
              onClick={this.changeView}
            />
          </Tooltip>
        </div>
        <CardResult
          items={items}
          listView={listView}
          menu={menu}
          readOnly={readOnly}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  schoolType: lGet(state, 'domainInfo.school.type'),
});

export default connect(mapStateToProps)(ProgramResults);
