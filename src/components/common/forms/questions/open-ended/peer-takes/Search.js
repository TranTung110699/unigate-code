import React, { Component } from 'react';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import schema from './schema';
import { t1 } from 'translate';

import TakeResults from './Results';

class SearchTakes extends Component {
  renderResultComponent = (items, props) => {
    return (
      <TakeResults
        items={items}
        {...props}
        courseIid={this.props.courseIid}
        peerMarking={this.props.peerMarking}
      />
    );
  };

  renderNoResultComponent = () => {
    const { questionIid } = this.props;
    if (questionIid)
      return (
        <div>
          {t1('this_question_is_not_yet_done_by_any_one_in_the_course')}
        </div>
      );
    else return <div>{t1('no_open_ended_questions_to_be_marked')}</div>;
  };

  render() {
    const { courseIid, questionIid } = this.props;

    const formid = `${courseIid}-${questionIid}-takes`;

    const hiddenFields = {
      courseIid,
      questionIid,
    };

    const paginationProps = {
      itemPerPage: [100, 50, 20, 10],
    };

    return (
      <SearchWrapper
        hiddenFields={hiddenFields}
        formid={formid}
        showSearchButton={true}
        schema={schema}
        renderResultsComponent={this.renderResultComponent}
        renderNoResultComponent={this.renderNoResultComponent}
        alternativeApi={
          this.props.alternativeApi || '/course/marking/get-open-ended-takes'
        }
        paginationProps={paginationProps}
      />
    );
  }
}

export default SearchTakes;
