import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import routes from 'routes';
import { t1 } from 'translate';

import CheckListItem from './CheckListItem';

const style = {
  paperStyle: {
    padding: 20,
    width: '100%',
    marginBottom: '50px',
    display: 'block',
    overflow: 'auto',
    minHeight: 200,
  },
};

class Checklist extends Component {
  getActionByStatus = (item, status) => {
    const itemParam = {
      base: '',
      item: {
        ntype: 'syllabus',
        iid: item && item.iid,
        type: item && item.type,
      },
    };
    if (status === 'queued') {
      itemParam.mode = 'edit';
    }
    if (status === 'done_editing') {
      itemParam.mode = 'approval';
    }
    return routes.url('edit_item', itemParam);
  };

  render() {
    const { syllabus } = this.props;
    const syllabusTaskList = [
      {
        ntype: 'syllabus',
        fieldValue: !!(
          syllabus &&
          ['queued', 'done_editing', 'approved'].includes(syllabus.status)
        ),
        fieldName: 'task_list.queued',
        field: 'task_list.queued',
        itemIid: syllabus && syllabus.iid,
        url: this.getActionByStatus(syllabus, 'queued'),
        text: `${t1('edit_syllabus_information')}`,
      },
      {
        ntype: 'syllabus',
        fieldValue: !!(
          syllabus && ['done_editing', 'approved'].includes(syllabus.status)
        ),
        fieldName: 'task_list.done_editing',
        field: 'task_list.done_editing',
        itemIid: syllabus && syllabus.iid,
        url: this.getActionByStatus(syllabus, 'done_editing'),
        text: `${t1('approve_syllabus')}`,
      },
    ];

    return (
      <Paper style={style.paperStyle} zDepth={1}>
        <h2>{t1('checklist_for_syllabus')}</h2>
        <div>
          {syllabusTaskList &&
            syllabusTaskList.map((taskItem) => <CheckListItem {...taskItem} />)}
        </div>
      </Paper>
    );
  }
}

Checklist.propTypes = {
  checkList: PropTypes.arrayOf(PropTypes.object),
  syllabus: PropTypes.objectOf(PropTypes.any),
};

Checklist.defaultProps = {
  checkList: [],
  syllabus: {},
};

const mapStateToProps = (state) => ({
  prop: state.prop,
});

export default connect(mapStateToProps)(
  reduxForm({
    form: 'syllabus_task_list',
  })(Checklist),
);
