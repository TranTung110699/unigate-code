import React, { Component } from 'react';
import { t1, t } from 'translate';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from 'routes';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import DeepClone from 'components/admin/node/bank/DeepClone';
import Menu from 'antd/lib/menu';
import Button from 'antd/lib/button';
import CardResult from './card-result';
import Tooltip from 'antd/lib/tooltip';
import Links from 'routes/links';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: true,
    };
  }

  componentDidMount() {
    let listView = localStorage.getItem('displayListView');
    if (listView === null || typeof JSON.parse(listView) !== 'boolean') {
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
    const {
      items,
      formid,
      ntype,
      ntypesDeepCloneEnable,
      deepCloneSuccessFul,
    } = this.props;
    const { listView } = this.state;

    const textConfirm = t1('are_you_sure_you_want_to_do_this');
    const menu = (item) => (
      <Menu>
        {ntypesDeepCloneEnable.includes(item && item.ntype) && (
          <Menu.Item key="0">
            <DeepClone
              node={item}
              className="button-clone"
              title={t1('deepclone')}
              textButton
              deepCloneSuccessFul={deepCloneSuccessFul}
            />
          </Menu.Item>
        )}

        <Menu.Item key="1">
          <Link
            to={routes.url('edit_item', {
              mode: 'edit',
              item: {
                ntype: 'syllabus',
                iid: item.iid,
                type: 'credit',
                step: 'dashboard',
              },
            })}
          >
            {t1('edit')}
          </Link>
        </Menu.Item>
        <Menu.Item key="preview">
          <span
            onClick={() =>
              window.open(Links.learnCourse(item, null, true), '_blank')
            }
          >
            {t1('preview')}
          </span>
        </Menu.Item>
        <Menu.Divider />
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
        <CardResult items={items} listView={listView} menu={menu} />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
};

Results.defaultProps = {
  items: [],
};

export default Results;
