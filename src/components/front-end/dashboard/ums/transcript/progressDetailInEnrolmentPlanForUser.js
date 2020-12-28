import React from 'react';
import { t1 } from 'translate';
import fetchData from 'components/common/fetchData';
import getLodash from 'lodash.get';
import apiUrls from 'components/admin/enrolment-plan/endpoints';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';

const progressDetailInEnrolmentPlanForUser = ({
  objects,
  semester,
  items,
  academicCategoryIid,
}) => {
  if (!academicCategoryIid) {
    return null;
  }

  const creditSyllabuses = (
    getLodash(objects, 'credit_syllabuses') || []
  ).filter((creditSyllabus) => {
    const academic_categories = getLodash(
      creditSyllabus,
      'academic_categories',
    );
    return (
      Array.isArray(academic_categories) &&
      academic_categories.includes(academicCategoryIid)
    );
  });

  if (
    !Array.isArray(creditSyllabuses) ||
    !creditSyllabuses.length ||
    !semester ||
    !Array.isArray(items) ||
    !items.length
  ) {
    return null;
  }

  return (
    <div className="table-result table-full-border">
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            {creditSyllabuses &&
              creditSyllabuses.map((cs) => (
                <TableHeaderColumn colSpan="3" className="text-center">
                  {getLodash(semester, 'name')}
                </TableHeaderColumn>
              ))}
          </TableRow>
          <TableRow>
            {creditSyllabuses &&
              creditSyllabuses.map((cs) => [
                <TableHeaderColumn>
                  {t1('great_exercise_score')}
                </TableHeaderColumn>,
                <TableHeaderColumn>{t1('academic_score')}</TableHeaderColumn>,
                <TableHeaderColumn>{t1('final_score')}</TableHeaderColumn>,
              ])}
          </TableRow>
        </TableHeader>

        <TableBody
          displayRowCheckbox={false}
          showRowHover={false}
          stripedRows={false}
        >
          {items &&
            items.map((item) => {
              if (!item) return null;

              const user = item.user;
              if (!user) return null;
              let epLastLearned = 0;
              const elProgress =
                creditSyllabuses &&
                creditSyllabuses.map((cs) => {
                  const {
                    small_exercise_score,
                    great_exercise_score,
                    academic_score,
                    po,
                    passed,
                    last_learned,
                  } =
                    (getLodash(item, 'credit_progress') || []).find((elem) => {
                      return (
                        String(getLodash(elem, 'credit_syllabus_iid')) ===
                        String(getLodash(cs, 'iid'))
                      );
                    }) || {};

                  epLastLearned =
                    last_learned && last_learned > epLastLearned
                      ? last_learned
                      : epLastLearned;

                  return [
                    <TableRowColumn className="text-center">
                      {great_exercise_score}
                    </TableRowColumn>,
                    <TableRowColumn className="text-center">
                      {academic_score}
                    </TableRowColumn>,
                    <TableRowColumn className="text-center">
                      {po}
                    </TableRowColumn>,
                  ];
                });

              return <TableRow key={item.id}>{elProgress}</TableRow>;
            })}
        </TableBody>
      </Table>
    </div>
  );
};

export default fetchData((props) => ({
  baseUrl: apiUrls.enrolment_plan_learners_progress,
  params: {
    enrolment_plan_iid: getLodash(props, 'enrolmentPlanIid'),
    user_iid: getLodash(props, 'userIid'),
  },
  propKey: 'items',
  propExtraDataKey: 'objects',
  fetchCondition:
    getLodash(props, 'userIid') && getLodash(props, 'enrolmentPlanIid'),
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(progressDetailInEnrolmentPlanForUser);
