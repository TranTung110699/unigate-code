import React from 'react';
import Table from 'antd/lib/table';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { types } from 'components/admin/question/schema/question-types';
import { CSVLink } from 'react-csv';
import Button from 'antd/lib/button';
import styled from 'styled-components';
import Toggle from 'schema-form/elements/toggle';
import { sum } from 'common/utils/Array';

const ExportButton = styled(Button)`
  a {
    color: #fff;
    margin-left: 3px;
    :hover,
    :active,
    :focus {
      color: #fff;
    }
  }
`;

const surveyAnswer = [
  { value: 1, text: 'Rất không đồng ý' },
  { value: 2, text: 'Không đồng ý' },
  { value: 3, text: 'Đồng ý' },
  { value: 4, text: 'Rất đồng ý' },
];

const displayPart = (part, total, shouldShowPercentView, displaySeparator) => {
  const percent = total ? (part / total) * 100 : 0;
  return shouldShowPercentView
    ? `${percent.toFixed(2)}%`
    : displaySeparator
    ? part.toLocaleString('vi')
    : part;
};

const getTotalValueOfAColumnOfItems = (
  items,
  getValueInColumn,
  excludeIntroQuestion = true,
) => {
  if (!items) return 0;

  return (
    sum(
      items
        .filter((item) => {
          if (excludeIntroQuestion) {
            return item.type !== types.TYPE_INTRODUCTION;
          }
          return true;
        })
        .map((item) => getValueInColumn(item)),
    ) || 0
  );
};

const getTotalByAnswer = (items, answer) => {
  return getTotalValueOfAColumnOfItems(items, (item) => {
    return lodashGet(item, ['loop', answer.value - 1]);
  });
};

const displayTotalByAnswer = (
  items,
  answer,
  shouldShowPercentView,
  displaySeparator = true,
) => {
  const total = getTotalByAnswer(items, answer);
  const totalOfTotal = getTotalOfTotal(items);

  return displayPart(
    total,
    totalOfTotal,
    shouldShowPercentView,
    displaySeparator,
  );
};

const getTotalFemaleOfAllItems = (items) => {
  return getTotalValueOfAColumnOfItems(items, (item) => getTotalFemale(item));
};

const displayTotalFemaleOfAllItems = (
  items,
  shouldShowPercentView,
  displaySeparator,
) => {
  const total = getTotalFemaleOfAllItems(items);
  const totalOfTotal = getTotalOfTotal(items);

  return displayPart(
    total,
    totalOfTotal,
    shouldShowPercentView,
    displaySeparator,
  );
};

const getTotalDttsOfAllItems = (items) => {
  return getTotalValueOfAColumnOfItems(items, (item) => getTotalDtts(item));
};

const displayTotalDttsOfAllItems = (
  items,
  shouldShowPercentView,
  displaySeparator,
) => {
  const total = getTotalDttsOfAllItems(items);
  const totalOfTotal = getTotalOfTotal(items);

  return displayPart(
    total,
    totalOfTotal,
    shouldShowPercentView,
    displaySeparator,
  );
};

const getTotalOfTotal = (items) => {
  if (!items) return 0;

  return items
    .filter((item) => item.type !== types.TYPE_INTRODUCTION)
    .reduce(
      (sum, i) =>
        Array.isArray(i.loop)
          ? sum + i.loop.reduce((sumi, j) => sumi + j)
          : sum,
      0,
    );
};

const displayTotalOfTotal = (items, displaySeparator = true) => {
  const total = getTotalOfTotal(items);

  if (displaySeparator) return total.toLocaleString('vi');

  return total;
};

const getTotal = (item) => {
  return sum(lodashGet(item, 'loop') || []) || 0;
};

const displayTotal = (item, displaySeparator = true) => {
  const total = getTotal(item);

  if (displaySeparator) {
    return total.toLocaleString('vi');
  }

  return total;
};

const getTotalFemale = (item) => {
  return sum(lodashGet(item, 'loop_female') || []) || 0;
};

const displayTotalFemale = (
  item,
  shouldShowPercentView,
  displaySeparator = true,
) => {
  const totalFemale = getTotalFemale(item);
  const total = getTotal(item);

  return displayPart(
    totalFemale,
    total,
    shouldShowPercentView,
    displaySeparator,
  );
};

const getTotalDtts = (item) => {
  return sum(lodashGet(item, 'loop_dtts') || []) || 0;
};

const displayTotalDtts = (
  item,
  shouldShowPercentView,
  displaySeparator = true,
) => {
  const totalDtts = getTotalDtts(item);
  const total = getTotal(item);

  return displayPart(totalDtts, total, shouldShowPercentView, displaySeparator);
};

const displayNumberForAnswer = (
  item,
  answer,
  shouldShowPercentView,
  displaySeparator = true,
) => {
  const numberForThisAnswer = lodashGet(item, `loop[${answer.value - 1}]`) || 0;

  const totalNumberForAllAnswer = getTotal(item);

  return displayPart(
    numberForThisAnswer,
    totalNumberForAllAnswer,
    shouldShowPercentView,
    displaySeparator,
  );
};

const getColumns = (shouldShowPercentView) => {
  return [
    {
      title: t1('question'),
      key: 'question',
      render: (item) => {
        return {
          children: lodashGet(item, 'content').replace(/<[^>]+>/g, ''),
          props: {
            colSpan:
              lodashGet(item, 'type') === types.TYPE_INTRODUCTION ? 8 : 1,
          },
        };
      },
    },
    ...surveyAnswer.map((answer) => {
      return {
        title: answer.text,
        key: `answer-${answer.value}`,
        width: '15%',
        className: 'text-center',
        render: (item) => {
          return {
            children: displayNumberForAnswer(
              item,
              answer,
              shouldShowPercentView,
            ),
            props: {
              colSpan: lodashGet(item, 'type') === types.TYPE_NUMBER ? 1 : 0,
            },
          };
        },
      };
    }),
    {
      title: t1('total'),
      key: 'total',
      width: '10%',
      className: 'text-center',
      render: (item) => {
        return {
          children: displayTotal(item),
          props: {
            colSpan: lodashGet(item, 'type') === types.TYPE_NUMBER ? 1 : 0,
          },
        };
      },
    },
    {
      title: t1('female'),
      key: 'total',
      width: '10%',
      className: 'text-center',
      render: (item) => {
        return {
          children: displayTotalFemale(item, shouldShowPercentView),
          props: {
            colSpan: lodashGet(item, 'type') === types.TYPE_NUMBER ? 1 : 0,
          },
        };
      },
    },
    {
      title: t1('dtts'),
      key: 'total',
      width: '10%',
      className: 'text-center',
      render: (item) => {
        return {
          children: displayTotalDtts(item, shouldShowPercentView),
          props: {
            colSpan: lodashGet(item, 'type') === types.TYPE_NUMBER ? 1 : 0,
          },
        };
      },
    },
  ];
};

const drawTableDataToExport = (items, shouldShowPercentView) => {
  let header = [t1('question')];
  let totalRow = [t1('total')];
  surveyAnswer.map((answer) => {
    header.push(answer.text);
    totalRow.push(
      displayTotalByAnswer(items, answer, shouldShowPercentView, false),
    );
  });

  const x =
    Array.isArray(items) && items.length
      ? items.map((item) => {
          if (item.type === types.TYPE_INTRODUCTION)
            return [lodashGet(item, 'content').replace(/<[^>]+>/g, '')];

          const loop = lodashGet(item, 'loop', []);
          const y = Array.isArray(loop) ? loop : [];
          return [
            lodashGet(item, 'content').replace(/<[^>]+>/g, ''),
            ...surveyAnswer.map((answer) => {
              return displayNumberForAnswer(
                item,
                answer,
                shouldShowPercentView,
                false,
              );
            }),
            displayTotal(item, false),
            displayTotalFemale(item, shouldShowPercentView, false),
            displayTotalDtts(item, shouldShowPercentView, false),
          ];
        })
      : [];

  return [
    header.concat([t1('total'), t1('female'), t1('dtts')]),
    ...x,
    totalRow.concat([
      displayTotalOfTotal(items, false),
      displayTotalFemaleOfAllItems(items, shouldShowPercentView, false),
      displayTotalDttsOfAllItems(items, shouldShowPercentView, false),
    ]),
  ];
};

const ReportAsTable = ({ items, surveyIid }) => {
  const [shouldShowPercentView, setShouldShowPercentView] = React.useState();

  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  const modifiedItems = items.filter(
    (item) => item.type !== types.TYPE_OPEN_ENDED,
  );

  return (
    <div>
      <Toggle
        label={t1('show_percentage')}
        toggled={shouldShowPercentView}
        onChange={(v) => setShouldShowPercentView(v)}
        style={{
          marginBottom: 10,
        }}
      />

      <ExportButton icon="download" type="primary">
        <CSVLink
          data={drawTableDataToExport(modifiedItems, shouldShowPercentView)}
          filename={`survey-${surveyIid}.csv`}
        >
          <span>{t1('export')}</span>
        </CSVLink>
      </ExportButton>

      <Table
        dataSource={modifiedItems}
        columns={getColumns(shouldShowPercentView)}
        bordered
        pagination={false}
        rowKey="iid"
        childrenColumnName={null}
        className="m-t-10 m-b-10"
      />
    </div>
  );
};

export default ReportAsTable;
