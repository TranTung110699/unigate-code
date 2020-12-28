/* eslint-disable react/prop-types,no-undef,jsx-a11y/anchor-is-valid */
import React from 'react';
import get from 'lodash.get';
import { set } from 'common/utils/object';
import { change } from 'redux-form';
import { t1 } from 'translate';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import AddTheItemInPrerequisites from './searchSubject';

const LayoutFreestyle = (props) => {
  const { dispatch, formid, xpath } = props;
  const fieldNames = get(props, 'groups.default.fieldNames');
  let formValues = get(props, 'formValues', {});
  const { item, min, max } = get(formValues, xpath, {});
  const scoreScale = get(props, 'formValues.score_scale');

  if (!fieldNames) {
    return null;
  }

  const arrXpath = xpath.match(/.*(?=\[)/g);
  const andCoditions = get(formValues, arrXpath[0], []);
  const subjectSelected = andCoditions
    .map((map) => map && map.item)
    .filter(Boolean);

  const valueOnClange = (field, value) => {
    formValues = set(formValues, `${xpath}.${field}`, value);
    dispatch(
      change(formid, 'prerequisites', formValues && formValues.prerequisites),
    );
  };

  return (
    <div>
      <div className="col-md-4 text-center m-t-5">
        <AddTheItemInPrerequisites
          labelButton={
            item && item.iid
              ? `${item.name} (${item.code})`
              : t1('choose_subject')
          }
          iconButton={item && item.iid ? 'edit' : 'plus'}
          itemsSelected={subjectSelected}
          addItemsSelected={(val) => valueOnClange('item', val)}
        />
      </div>
      <div className="col-md-2">{fieldNames.type}</div>
      <div className="col-md-6 text-center m-t-5">
        {fieldNames.min && (
          <div className="col-xs-6">
            <Marking
              scalePartIdAsValue
              label={min || '...'}
              scoreScale={scoreScale}
              onChange={(score) => valueOnClange('min', score)}
            />
          </div>
        )}
        {fieldNames.max && (
          <div className="col-xs-6">
            <Marking
              scalePartIdAsValue
              label={max || '...'}
              scoreScale={scoreScale}
              onChange={(score) => valueOnClange('max', score)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutFreestyle;
