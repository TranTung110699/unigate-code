import React from 'react';
import get from 'lodash.get';
import SearchWrapperV2 from 'components/common/search-wrap-v2/SearchWrapper';
import searchSchema from './search-schema';
import TableResult from './TableResult';
import courseUrls from '../../../endpoints';
import RubricOverview from 'components/admin/rubric/overview';
import CourseScoreSyncWidget from '../syncer';

const formid = 'search-score-by-rubric';
const ScoreByRubric = ({ course }) => {
  const hiddenFields = {
    course_iid: get(course, 'iid'),
    rubric_iid: get(course, 'rubric_iid'),
  };

  const paginationProps = {
    itemPerPage: [100, 200, 50, 20, 10],
  };

  return (
    <>
      <div className="m-l-30">
        <CourseScoreSyncWidget course={course} />
        <div className="m-t-10">
          <RubricOverview iid={get(course, 'rubric_iid')} />
        </div>
      </div>

      <SearchWrapperV2
        showResult
        destroyOnUnmount
        schema={searchSchema}
        formid={formid}
        hiddenFields={hiddenFields}
        renderResultsComponent={(items, { total, valuesToSubmit } = {}) => (
          <>
            <CourseScoreSyncWidget course={course} />
            <br />
            <TableResult
              course={course}
              items={items}
              searchFormId={formid}
              total={total}
              paramsToFilter={valuesToSubmit}
            />
          </>
        )}
        showQueryField={false}
        alternativeApi={courseUrls.score_by_rubric}
        paginationProps={paginationProps}
      />
    </>
  );
};

export default ScoreByRubric;
