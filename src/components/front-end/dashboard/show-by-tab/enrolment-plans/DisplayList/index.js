import React from 'react';
import lodashGet from 'lodash.get';
import Deadline from 'components/front-end/common/Deadline';
import DefaultEnrolmentPlanAvatar from 'common/images/default-enrolment-plan-avatar.jpeg';
import Row from 'antd/lib/grid/row';
import Program from './Program';

const DisplayList = ({ items, renderAfter, viewOnly }) => {
  let listProgram = [];
  items &&
    items.length &&
    items
      .sort((a, b) => (a.code > b.code ? 1 : b.code > a.code ? -1 : 0))
      .map((item) => listProgram.push(lodashGet(item, 'program')));

  return (
    <div className="my-enrolment-plan-container p-l-5 p-r-5">
      <Row gutter={24} className="m-t-10">
        {listProgram && listProgram.length
          ? listProgram.map((item) => {
              if (item && item.children) {
                item.children.length &&
                  item.children.map((child) => {
                    return (
                      <div className="m-t-10">
                        <h2 className="text-center">
                          {child.name.toUpperCase()}
                        </h2>
                        <Program
                          items={lodashGet(child, 'children')}
                          showDeadline
                          showProgress
                          progress={Math.ceil(lodashGet(child, 'cp'))}
                          deadline={
                            <Deadline endDate={lodashGet(child, 'end_date')} />
                          }
                          disableLink={viewOnly}
                          fallbackAvatar={DefaultEnrolmentPlanAvatar}
                        />
                      </div>
                    );
                  });
              }
              return <DisplayList items={item} />;
            })
          : items && items.children && items.children.length
          ? items.children.map((child) => {
              return (
                <div className="m-t-10">
                  <h2 className="text-center">{child.name.toUpperCase()}</h2>
                  <Program
                    items={lodashGet(child, 'children')}
                    showDeadline
                    showProgress
                    progress={Math.ceil(lodashGet(child, 'cp'))}
                    deadline={
                      <Deadline endDate={lodashGet(child, 'end_date')} />
                    }
                    disableLink={viewOnly}
                    fallbackAvatar={DefaultEnrolmentPlanAvatar}
                  />
                </div>
              );
            })
          : null}
        {renderAfter && renderAfter()}
      </Row>
    </div>
  );
};

export default DisplayList;
