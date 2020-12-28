import React from 'react';
import { t1 } from 'translate';
import { scoreScaleTypes } from 'configs/constants';
import HorizontalScrolling from 'components/common/html/horizontal-scrolling';
import ShowFullWhenHover from 'components/common/html/show-full-when-hover';

const sttLabel = t1('row');
const studentIdLabel = t1('student_code');
const majorCodeLabel = t1('major_code');
const studentFirstnameLabel = t1('firstname');
const studentLastnameLabel = t1('lastname');

const elementTableHeaderColumnsUserInfo = (rowSpan, depth) => [
  <th
    key={`major-${rowSpan}-${depth}`}
    rowSpan={rowSpan}
    className="text-center"
  >
    {majorCodeLabel}
  </th>,
  <th
    key={`student-code-${rowSpan}-${depth}`}
    rowSpan={rowSpan || 1}
    className="text-center"
  >
    {studentIdLabel}
  </th>,
  <th
    key={`last-name-${rowSpan}-${depth}`}
    rowSpan={rowSpan || 1}
    className="text-center"
  >
    {studentLastnameLabel}
  </th>,
  <th
    key={`first-name-${rowSpan}-${depth}`}
    rowSpan={rowSpan || 1}
    className="text-center"
  >
    {studentFirstnameLabel}
  </th>,
];

const getElementTableHeaderRows = (
  rubrics,
  headerRowSpan,
  depth = 0,
  scoreScale,
  rubricsMarking,
) => {
  let elTableHeaderRows = [];

  if (!Array.isArray(rubrics) || !rubrics.length || headerRowSpan === depth) {
    return elTableHeaderRows;
  }

  let children = [];
  let tableHeaderColumns = [];
  if (depth === 0) {
    tableHeaderColumns = tableHeaderColumns.concat([
      <th
        rowSpan={headerRowSpan}
        key={`row-${headerRowSpan}-${depth}`}
        className="text-center"
      >
        {sttLabel}
      </th>,
      <th
        key={`student-information-${headerRowSpan}-${depth}`}
        className="text-center"
        colSpan="4"
      >
        {t1('student_information')}
      </th>,
    ]);
  } else if (depth === 1) {
    tableHeaderColumns = tableHeaderColumns.concat(
      elementTableHeaderColumnsUserInfo(headerRowSpan - 1, depth),
    );
  }

  rubrics.forEach((rubric) => {
    let colSpan = rubric.colSpan;
    let rowSpan = 1;
    if (Array.isArray(rubric.children) && rubric.children.length) {
      children = children.concat(rubric.children);
      colSpan = colSpan || rubric.children.length;
    } else {
      rowSpan =
        headerRowSpan - depth - (scoreScale === scoreScaleTypes.pmd ? 1 : 0);
    }

    tableHeaderColumns.push(
      <th
        key={`rubric-${rubric.iid}-${headerRowSpan}-${depth}`}
        colSpan={colSpan || 1}
        rowSpan={rowSpan}
        className="text-center"
      >
        {rubric.name}
      </th>,
    );
  });

  if (depth === 0) {
    tableHeaderColumns = tableHeaderColumns.concat([
      <th
        key={`total-${headerRowSpan}-${depth}`}
        rowSpan={headerRowSpan}
        className="text-center"
      >
        {t1('total')}
      </th>,
      <th
        key={`note-${headerRowSpan}-${depth}`}
        rowSpan={headerRowSpan}
        className="text-center"
      >
        {t1('note')}
      </th>,
      <th
        key={`status-${headerRowSpan}-${depth}`}
        rowSpan={headerRowSpan}
        className="text-center"
      >
        {t1('status')}
      </th>,
      <th
        key={`errors-${headerRowSpan}-${depth}`}
        rowSpan={headerRowSpan}
        className="text-center"
      >
        {t1('errors')}
      </th>,
    ]);
  }

  elTableHeaderRows.push(
    <tr key={`table-row-${headerRowSpan}-${depth}`} className="text-center">
      {tableHeaderColumns}
    </tr>,
  );

  if (children.length) {
    elTableHeaderRows = elTableHeaderRows.concat(
      getElementTableHeaderRows(children, headerRowSpan, depth + 1, scoreScale),
    );
  }
  if (
    Array.isArray(rubricsMarking) &&
    rubricsMarking.length &&
    scoreScale === scoreScaleTypes.pmd
  ) {
    elTableHeaderRows.push(
      <tr
        key={`table-row-${headerRowSpan}-${depth}-view-score`}
        className="text-center"
      >
        {depth === 0 &&
          children.length === 0 &&
          elementTableHeaderColumnsUserInfo(headerRowSpan - 1, depth)}
        {rubricsMarking.map((rubric) => [
          <th key={`score-${rubric.iid}`} className="text-center">
            {t1('score')}
          </th>,
          <th className="text-center" key={`comment-${rubric.iid}`}>
            {t1('comment')}
          </th>,
        ])}
      </tr>,
    );
  }

  return elTableHeaderRows;
};

const getRubricsMarking = (rubrics) => {
  if (!Array.isArray(rubrics) || !rubrics.length) {
    return [];
  }
  let result = [];
  rubrics.forEach((rubric) => {
    if (!Array.isArray(rubric.children) || !rubric.children.length) {
      result.push({ ...rubric, iid: parseInt(rubric.iid) });
    } else {
      result = result.concat(getRubricsMarking(rubric.children));
    }
  });
  return result;
};

const Results = (props) => {
  const { items, rubrics, scoreScale, headerRowSpan } = props;

  if (
    !Array.isArray(rubrics) ||
    !rubrics.length ||
    !Array.isArray(items) ||
    !items.length
  ) {
    return <div className="text-center"> ERROR </div>;
  }

  const rubricsMarking = getRubricsMarking(rubrics);

  const elementTableHeaderRows = getElementTableHeaderRows(
    rubrics,
    headerRowSpan,
    0,
    scoreScale,
    rubricsMarking,
  );

  return (
    <HorizontalScrolling>
      <table
        className="table table-border whitebox m-t-20"
        style={{ width: '100%' }}
      >
        <thead>{elementTableHeaderRows}</thead>

        <tbody displayRowCheckbox={false} showRowHover stripedRows>
          {Array.isArray(items) &&
            items.map((item) => {
              const scores = item.scores || [];
              return (
                <tr key={item.id}>
                  <td className="text-center">{item.stt}</td>
                  <td>{item.student.major}</td>
                  <td>{item.student.code}</td>
                  <td>{item.student.last_name}</td>
                  <td>{item.student.first_name}</td>
                  {Array.isArray(rubricsMarking) &&
                    rubricsMarking.length > 0 &&
                    rubricsMarking.map((rubric) => {
                      const score = scores.find((r) => r.iid === rubric.iid);
                      const el = [
                        <td
                          className="text-center"
                          key={`table-body-${rubric.iid}-score`}
                        >
                          {score && score.p}
                        </td>,
                      ];

                      if (scoreScale === scoreScaleTypes.pmd) {
                        el.push(
                          <td
                            className="text-center"
                            key={`table-body-${rubric.iid}-comment`}
                          >
                            <ShowFullWhenHover
                              content={score && score.comment}
                              style={{ width: 100 }}
                            />
                          </td>,
                        );
                      }

                      return el;
                    })}
                  <td className="text-center">{item.total}</td>
                  <td className="text-center">
                    <ShowFullWhenHover
                      content={item.note}
                      style={{ width: 200 }}
                    />
                  </td>
                  <td className="text-center">{item.status}</td>
                  <td className="text-center">
                    {Array.isArray(item.errors) && item.errors.length > 1 ? (
                      <ul>
                        {item.errors.map((err) => (
                          <li>
                            <ShowFullWhenHover
                              content={err}
                              style={{ width: 100 }}
                            />
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <ShowFullWhenHover
                        content={item.errors && item.errors[0]}
                        style={{ width: 100 }}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </HorizontalScrolling>
  );
};

export default Results;
