import React from 'react';
import { t1 } from 'translate';
import PropTypes from 'prop-types';
import { timestampToDateString } from 'common/utils/Date';
import ActionToggle from 'components/common/toggle/ActionToggle';
import get from 'lodash.get';

import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getUrl } from 'routes/links/common';

const style = {
  table: {
    minWidth: 1366,
  },
};

const width = {
  no: '50px',
};
const allowExam = { on: 1, off: 0 };

const Results = ({ items, objects, searchValues }) => {
  const { page, items_per_page } = searchValues;
  const index =
    ((parseInt(page, 10) || 1) - 1) * parseInt(items_per_page, 10) + 1;
  return (
    <div className="table-result">
      <Table style={style.table}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn width={width.no}>{t1('no')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('birthday')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('course')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('subject')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('learn_type')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('faculty')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('major')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('ico')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('training_mode')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('training_level')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('school_year')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('semester')}</TableHeaderColumn>
            <TableHeaderColumn>{t1('allow_exam')}</TableHeaderColumn>
          </TableRow>
        </TableHeader>

        <TableBody displayRowCheckbox={false} showRowHover stripedRows>
          {items &&
            items.map((item, pos) => {
              const histories = get(item, 'histories');
              const history =
                histories && histories.length > 0
                  ? histories[histories.length - 1]
                  : null;
              return (
                <TableRow key={get(item, 'id')}>
                  <TableRowColumn width={width.no}>
                    {index + pos}
                  </TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'user.name')}{' '}
                    <span className="text-muted">
                      ({get(item, 'user.code')})
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>
                    {timestampToDateString(get(item, 'user.birthday'))}
                  </TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'course.name')}
                    <span className="text-muted">
                      {get(item, 'course.code')}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'syllabus.name')}
                    <span className="text-muted">
                      {get(item, 'syllabus.code')}
                    </span>
                  </TableRowColumn>
                  <TableRowColumn>{get(item, 'learn_type')}</TableRowColumn>
                  <TableRowColumn>{get(item, 'faculty_name')}</TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'major_name')}
                    <span className="text-muted">{get(item, 'major_iid')}</span>
                  </TableRowColumn>
                  <TableRowColumn>{get(item, 'ico_name')}</TableRowColumn>
                  <TableRowColumn>{get(item, 'training_mode')}</TableRowColumn>
                  <TableRowColumn>{get(item, 'training_level')}</TableRowColumn>
                  <TableRowColumn>
                    {get(item, 'school_year.name')}
                  </TableRowColumn>
                  <TableRowColumn>{get(item, 'semester.name')}</TableRowColumn>
                  <TableRowColumn>
                    <ActionToggle
                      hideLabel
                      baseURL={getUrl('node_update', {
                        ...item,
                        ntype: 'sinvite',
                        id: get(item, 'sinvite'),
                        step: 'allow_exam',
                      })}
                      dataSet={allowExam}
                      value={get(history, 'allow_exam')}
                      name="allow_exam"
                      title={t1('allow_example')}
                    />
                  </TableRowColumn>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
};

Results.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any),
  objects: PropTypes.shape(),
};

Results.defaultProps = {
  items: [],
  objects: {},
};

export default Results;
