import React from 'react';
import LinkIfNeeded from 'components/common/router/LinkIfNeeded';
import routes from 'routes';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';

const AcademicCategories = (props) => {
  const { item, textOnly, noLink } = props;

  const iids = lodashGet(item, 'academic_categories', []);
  const objects =
    props.expandedAcademicCategories ||
    lodashGet(item, '__expand.academic_categories', []);

  if (objects.length > 0) {
    return (
      <div>
        {iids.map((iid, idx) => {
          const isLast = idx === iids.length - 1;

          const academicCategory = objects.find(
            (o) => o && String(o.iid) === String(iid),
          );

          if (!academicCategory) {
            return null;
          }

          const text = <span>{lodashGet(academicCategory, 'name')}</span>;

          return (
            <span>
              {' '}
              {textOnly ? (
                text
              ) : (
                <LinkIfNeeded
                  noLink={noLink}
                  to={routes.url(
                    'node_edit',
                    Object.assign({}, academicCategory, {
                      ntype: 'academic-category',
                    }),
                  )}
                  title={t1('click_to_view_%s', [academicCategory.name])}
                >
                  {text}
                </LinkIfNeeded>
              )}
              {!isLast ? ',' : null}
            </span>
          );
        })}
      </div>
    );
  } else {
    return <div>{iids && iids.join(',')}</div>;
  }
};

export default AcademicCategories;
