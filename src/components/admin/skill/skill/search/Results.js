import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from 'routes';
import { t1 } from 'translate';
import IconButton from 'material-ui/IconButton';
import DeleteItem from 'components/common/action-button/DeleteBtnWithConfirmDialog';
import ActionToggle from 'components/common/toggle/ActionToggle';
import DisplayHtml from 'components/common/html';
import MUTags from 'schema-form/elements/tags';
import PropTypes from 'prop-types';
import Table from 'antd/lib/table';
import './style.scss';

class Results extends Component {
  actionToggleDataSet = { on: 'approved', off: 'queued' };

  render() {
    const { items, formid, ntype } = this.props;
    const codeLabel = t1('code');
    const nameLabel = t1('name');
    // const descriptionLabel = t1('description');
    const typeLabel = t1('type');
    const tagsLabel = t1('tags');
    const childrenLabel = t1('sub-skills');
    const statusLabel = t1('status');
    const actionLabel = t1('action');
    const editLabel = t1('edit_skill');
    const removeLabel = t1('remove');
    const textConfirm = t1('are_you_sure_you_want_to_do_this');

    const width = {
      iid: '10%',
      name: '10%',
      description: '30%',
      tags: '5%',
      children: '5%',
      status: '10%',
      action: '20%',
    };

    const columns = [
      {
        title: codeLabel,
        key: 'code',
        dataIndex: 'code',
        width: width.iid,
        render: (code, item) => (
          <span>
            {item.code} ({item.iid})
          </span>
        ),
      },
      {
        title: nameLabel,
        key: 'name',
        dataIndex: 'name',
        width: width.name,
      },
      {
        title: typeLabel,
        key: 'type',
        dataIndex: 'type',
        width: width.children,
      },
      {
        title: t1('is_root_rubric'),
        key: 'is_root_rubric',
        dataIndex: 'is_root_rubric',
        width: width.children,
      },
      {
        title: t1('description'),
        key: 'description',
        dataIndex: 'description',
        width: width.description,
        render: (description, item) => <DisplayHtml content={description} />,
      },
      {
        title: tagsLabel,
        key: 'tags',
        dataIndex: 'tags',
        width: width.tags,
        render: (tags) => <MUTags tags={tags} />,
      },
      {
        title: childrenLabel,
        key: 'children',
        dataIndex: 'num_children_mustache',
        width: width.name,
      },
      {
        title: statusLabel,
        key: 'status',
        dataIndex: 'status',
        width: width.status,
        render: (status, item) => (
          <ActionToggle
            hideLabel
            baseURL={routes.url('node_update', {
              ...item,
              step: 'change_skill_status',
            })}
            dataSet={this.actionToggleDataSet}
            value={status || 'queued'}
            name="status"
          />
        ),
      },
      {
        title: actionLabel,
        key: 'action',
        width: width.action,
        render: (item) => (
          <React.Fragment>
            <Link
              to={routes.url('node_edit', {
                ...item,
                step: 'information',
              })}
            >
              <IconButton title={editLabel} iconClassName="mi mi-edit" />
            </Link>
            <DeleteItem
              title={removeLabel}
              textConfirm={textConfirm}
              formid={formid}
              ntype={ntype}
              itemId={item.id}
            />
          </React.Fragment>
        ),
      },
    ];
    return (
      <div className="skill-table-result">
        <Table
          dataSource={items}
          columns={columns}
          rowKey="id"
          pagination={false}
          childrenColumnName={null}
          className="white-background"
        />
      </div>
    );
  }
}

Results.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      iid: PropTypes.number,
      name: PropTypes.string,
    }),
  ),
  ntype: PropTypes.string,
};

Results.defaultProps = {
  items: [{}],
  ntype: 'skill',
};

export default connect()(Results);
