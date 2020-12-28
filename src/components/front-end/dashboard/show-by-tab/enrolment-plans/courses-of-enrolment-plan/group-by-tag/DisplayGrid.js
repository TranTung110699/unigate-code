import React from 'react';
import CourseItem from 'components/front-end/course/in-grid';
import { courseModes } from 'configs/constants';

const DisplayGrid = ({ items, renderAfter }) => {
  return (
    <React.Fragment>
      {(items &&
        items.length > 0 &&
        items.map((item) => (
          <div className="col-lg-4 col-md-6 col-sm-6 col-xs-12">
            <CourseItem
              item={item}
              mode={courseModes.MODE_IN_PROGRESS}
              showDescription={false}
            />
          </div>
        ))) ||
        null}
      {renderAfter && renderAfter()}
    </React.Fragment>
  );
};

export default DisplayGrid;
