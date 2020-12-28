import React from 'react';
import { t1 } from 'translate';
import contestApiUrls from 'components/admin/contest/endpoints';
import SearchWrapper from 'components/common/search-wrap/SearchWrapper';
import lGet from 'lodash.get';
import { connect } from 'react-redux';
import Result from './result';
import Spin from 'antd/lib/spin';

class Search extends React.Component {
  renderResultComponent = (items) => {
    const { course, canRetake } = this.props;
    if (items)
      return (
        <Result
          items={items}
          course={course}
          examRoundIid={course.exam_round_info.iid}
          syllabusIid={this.props.syllabus_iid}
          user={this.props.user}
          canRetake={canRetake}
        />
      );
    return <Spin />;
  };

  render() {
    const { course } = this.props;

    return (
      <SearchWrapper
        formid="contests_result"
        showResult
        alternativeApi={contestApiUrls.get_contests_result}
        hiddenFields={{
          contest_iid: course.exam_round_info.contest_iid,
          user_id: this.props.user.iid,
        }}
        renderResultsComponent={this.renderResultComponent}
        autoSearchWhenStart
      />
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    user: props.user || lGet(state, 'user.info'),
    syllabus_iid: lGet(props, 'course.syllabus'),
  };
};

export default connect(mapStateToProps)(Search);
