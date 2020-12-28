import React, { Component } from 'react';
import { connect } from 'react-redux';
import OfflineExamSearch from 'components/admin/offline-exam/search/Layout';
import SubTopMenuContext from 'common/context/menu/SubMenuTop';
import topMenuSchema from 'components/admin/offline-exam/menu/MainstageTopMenu';
import { handleOpenNewCourse } from 'components/admin/course/new/ButtonNew';

class Layout extends Component {
  componentDidMount() {
    const { action } = this.props;
    if (action === 'new') {
      this.addNewCourse();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.action && nextProps.action === 'new') {
      this.addNewCourse();
    }
  }

  addNewCourse = () => {
    const { dispatch, history } = this.props;
    handleOpenNewCourse({
      dispatch,
      step: 'offline_exam',
      searchFormId: 'offline_exam_search',
      history,
      formid: 'new_offline_exam',
    });
  };

  render() {
    return (
      <div>
        <SubTopMenuContext schema={topMenuSchema()} />
        <OfflineExamSearch />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => ({
  action: props.match && props.match.params && props.match.params.action,
});

export default connect(mapStateToProps)(Layout);
