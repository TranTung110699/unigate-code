import React from 'react';
import get from 'lodash.get';
import { max } from 'common/utils/Array';
import RadarChart from 'components/common/charts/radar/RadarChart';
import { t1 } from 'translate';
import Store from 'store/index';

const indexOfImportantQuestionForAssessmentLeader = {
  tcnn_gv: [2, 3, 4, 5, 6], // đánh giá giáo viên
  tcnn_ht: [0, 1, 3, 4, 5, 7, 9, 11, 12, 13], //đánh giá hiệu trưởng và phó hiệu trường
};

export const getTypeOfTCNN = (rubricIid) => {
  const state = Store.getState();
  if (
    String(rubricIid) === String(get(state, 'domainInfo.conf.temis.tcnn_ht'))
  ) {
    return 'tcnn_ht';
  }

  return 'tcnn_gv';
};

export const getOverallResultsOfTheAssessment = (
  task,
  tcnnType = 'tcnn_gv',
) => {
  if (!Array.isArray(task) || !task.length) {
    return {};
  }

  let min = 0;
  let final = null;
  let questionNoYetAssesses = false;
  const summaryById = {};
  const numberOfQuestion = task.length;

  task.forEach(({ answer, rubric_iid }, index) => {
    if (answer === null || typeof answer === 'undefined') {
      questionNoYetAssesses = true;
    }
    const id = Number.parseInt(answer || 0);
    summaryById[id] = Array.isArray(summaryById[id]) ? summaryById[id] : [];
    summaryById[id].push(rubric_iid);

    if (min > id) {
      min = id;
    }

    if (tcnnType === 'tcnn_gv' && !id) {
      final = id;
    } else if (final === null || final - 1 > id) {
      final = id + 1;
    }

    if (
      final > id &&
      indexOfImportantQuestionForAssessmentLeader[tcnnType].includes(index)
    ) {
      final = id;
    }
  });

  const summary = [];
  Object.keys(summaryById).forEach((id) => {
    summary.push({
      id,
      rubric_iids: summaryById[id],
    });
  });

  if (final > min) {
    const count = Array.isArray(summaryById[final - 1])
      ? summaryById[final - 1].length
      : 0;
    if (count / numberOfQuestion > 1 / 3) {
      final = final - 1;
    }
  }

  return {
    final: final > min && !questionNoYetAssesses ? final : min,
    summary,
    number_of_question: numberOfQuestion,
  };
};

export const formatDataSourceFromDataServerToRenderTableAssess = (
  rubrics,
  assessmentRubricIid,
  {
    depth = 0,
    ancestor_iids = assessmentRubricIid ? [assessmentRubricIid] : [],
  } = {},
) => {
  if (!Array.isArray(rubrics) || !rubrics.length) {
    return [];
  }

  return rubrics.reduce((result, { iid, children, ...rubric }) => {
    const isHeader = Array.isArray(children) && children.length > 0;
    rubric = {
      ...rubric,
      iid: Number.parseInt(iid, 10),
      depth,
      isHeader,
      ancestor_iids: ancestor_iids.map((a) => Number.parseInt(a, 10)),
    };

    return result.concat(
      [rubric],
      formatDataSourceFromDataServerToRenderTableAssess(
        children,
        assessmentRubricIid,
        {
          depth: depth + 1,
          ancestor_iids: [get(rubric, 'iid')].concat(ancestor_iids),
        },
      ),
    );
  }, []);
};

export const radarChartResultsAssess = (
  rubrics,
  value,
  score_scale,
  tcnnType = 'tcnn_gv',
) => {
  const parts = get(score_scale, 'parts');
  const upperBound = get(max(parts, (p) => get(p, 'id') || 0), 'max.id');
  const valueDomain = [0, upperBound];

  const data = (Array.isArray(rubrics) ? rubrics : [])
    .filter((rubric) => rubric && !get(rubric, 'isHeader'))
    .map((rubric) => {
      const answer = get(
        (value || []).find((a) => get(a, 'rubric_iid') == get(rubric, 'iid')),
        'answer',
      );
      const valueAsText = get(
        (parts || []).find((p) => get(p, 'id') == answer),
        'name',
      );

      return {
        ...rubric,
        name: get(rubric, 'name'),
        short_name: get(rubric, 'short_name') || get(rubric, 'name'),
        value: answer,
        valueAsText: valueAsText,
      };
    });

  const result = getOverallResultsOfTheAssessment(value, tcnnType);
  if (typeof result.final === 'undefined') {
    return null;
  }

  const part = parts.find(({ id }) => id === result.final);
  return (
    <React.Fragment>
      <h3
        className="text-center"
        style={{
          fontWeight: 600,
        }}
      >
        {t1('rate_the_overall_assessment_results')}:{' '}
        <span className="text-info">{get(part, 'name') || ''}</span>
      </h3>
      <RadarChart valueDomain={valueDomain} data={data} />
    </React.Fragment>
  );
};
