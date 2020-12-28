import React from 'react';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import AntdTable from 'antd/lib/table';
import {
  surveyAppliedItemTypeToText,
  surveyTargetTypes,
} from 'configs/constants/survey';
import SurveyAppliedItemPosition from '../common/SurveyAppliedItemPosition';
import SurveyAppliedItemEditLink from '../common/SurveyAppliedItemEditLink';
import ButtonEdit from '../edit/ButtonEdit';
import ButtonDelete from '../delete/ButtonDelete';

const getColumns = ({ formid, survey }) => {
  if (lodashGet(survey, 'survey_target_type') === surveyTargetTypes.SEMESTER) {
    return [
      {
        title: t1('name'),
        render: (text, item) => (
          <SurveyAppliedItemEditLink item={item}>
            {lodashGet(item, '__expand.item_iid.name')}
          </SurveyAppliedItemEditLink>
        ),
      },
      {
        title: t1('code'),
        render: (text, item) => lodashGet(item, '__expand.item_iid.code'),
      },
      {
        title: t1('time_form'),
        render: (text, item) =>
          `${lodashGet(item, '__expand.item_iid.start_month')}/${lodashGet(
            item,
            '__expand.item_iid.start_year',
          )} - ${lodashGet(item, '__expand.item_iid.end_month')}/${lodashGet(
            item,
            '__expand.item_iid.end_year',
          )}`,
      },
      {
        title: t1('action'),
        render: (text, item) => (
          <ButtonDelete searchFormId={formid} item={item} />
        ),
      },
    ].filter(Boolean);
  }

  return [
    {
      title: t1('type'),
      key: 'id',
      render: (text, row) => surveyAppliedItemTypeToText(row.type),
    },
    {
      title: t1('name'),
      render: (text, item) => (
        <SurveyAppliedItemEditLink item={item}>
          {lodashGet(item, '__expand.item_iid.name')}
          <span className="text-muted">
            {lodashGet(item, '__expand.item_iid.code') &&
              ` (${lodashGet(item, '__expand.item_iid.code')})`}
          </span>
        </SurveyAppliedItemEditLink>
      ),
    },
    {
      title: t1('applied_at'),
      render: (text, item) => <SurveyAppliedItemPosition item={item} />,
    },
    {
      title: t1('action'),
      render: (text, item) => (
        <div>
          <ButtonEdit
            searchFormId={formid}
            node={item}
            step="applied_position"
          />
          <ButtonDelete searchFormId={formid} item={item} />
        </div>
      ),
    },
  ].filter(Boolean);
};

const resultsAppliedItems = ({ items, ...props }) => {
  return (
    <AntdTable
      columns={getColumns(props)}
      dataSource={Array.isArray(items) && items.length ? items : []}
      bordered
      pagination={false}
      size="middle"
    />
  );
};

export default resultsAppliedItems;
