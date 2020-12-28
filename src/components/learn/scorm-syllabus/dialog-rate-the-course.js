import React from 'react';
import { t1 } from 'translate';
import DetailOnDialog from 'components/common/detail-on-dialog';
import Link from 'components/common/router/Link';
import Survey from 'components/learn/items/survey';

const getItemToRateTheCourse = (node, parendId = null) => {
  if (!node) {
    return { surveyIid: null, parentIid: null };
  }
  if (node.ntype === 'survey') {
    return { surveyIid: node.iid, parentIid: parendId };
  }
  let iid = null;
  let pid = parendId;
  if (Array.isArray(node.metadata) && node.metadata.length) {
    node.metadata.forEach((chil) => {
      const { surveyIid, parentIid } = getItemToRateTheCourse(chil, node.iid);
      if (surveyIid) {
        iid = surveyIid;
        if (parentIid) {
          pid = parentIid;
        }
      }
    });
  }
  return { surveyIid: iid, parentIid: pid };
};

const RateTheCourse = ({ syllabus, course }) => {
  if (!syllabus) {
    return null;
  }

  const { surveyIid, parentIid } = getItemToRateTheCourse(syllabus);

  if (!surveyIid) {
    return null;
  }

  return (
    <DetailOnDialog
      renderPreview={({ showFull }) => (
        <div className="text-center" onClick={showFull}>
          <Link to="#">
            <button className="button-rate-this-course">
              {t1('rate_this_course')}
            </button>
          </Link>
        </div>
      )}
      renderFull={({ closeDialog }) => (
        <Survey
          surveyIid={surveyIid}
          parentIid={parentIid}
          displayMaxHeight={Infinity}
          onFinish={closeDialog}
        />
      )}
      dialogOptionsProperties={{
        width: '80%',
      }}
    />
  );
};

export default RateTheCourse;
