import React from 'react';
import { ntype as allNtype } from 'configs/constants';
import Links from 'routes/links';
import { t1 } from 'translate';
import MenuItem from 'material-ui/MenuItem';

const getSuggestItemLink = (ntype, suggestion) => {
  switch (ntype) {
    case allNtype.COURSE: {
      return Links.overviewCourseByPath(null, suggestion);
    }
    case allNtype.SCO: {
      return Links.LearnCourseByPath(suggestion.course, suggestion.iid);
    }
    case allNtype.PATH: {
      return Links.courseListByPath(suggestion.iid);
    }
    default: {
      return null;
    }
  }
};

const getSuggestItemInfo = (ntype, suggestion) => {
  switch (ntype) {
    case allNtype.SCO: {
      const courseName =
        suggestion && suggestion.course && suggestion.course.name;
      return courseName ? t1('sco_of_course_%s', [courseName]) : t1('sco');
    }
    default: {
      return t1(ntype);
    }
  }
};

const getSuggestList = (suggest, className) => {
  const cssClass = 'etec-suggest-item';
  return (
    (suggest &&
      Object.keys(suggest)
        .map((ntype) => {
          const suggestions = suggest[ntype];
          return (
            Array.isArray(suggestions) &&
            suggestions
              .filter((suggestion) => !!suggestion)
              .map((suggestion) => ({
                link: getSuggestItemLink(ntype, suggestion),
                text: suggestion.name,
                value: (
                  <MenuItem className={`${className || ''} ${cssClass}`}>
                    <div className={`${cssClass}__info`}>
                      {getSuggestItemInfo(ntype, suggestion)}
                    </div>
                    <div className={`${cssClass}__text`}>{suggestion.name}</div>
                  </MenuItem>
                ),
              }))
          );
        })
        .filter((item) => !!item)
        .reduce((result, arr) => result.concat(arr), [])
        // TODO: config this number (right now only show first 10 suggestions)
        .slice(0, 10)) ||
    []
  );
};

export default getSuggestList;
