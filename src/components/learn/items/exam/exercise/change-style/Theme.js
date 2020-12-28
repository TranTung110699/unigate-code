import React from 'react';
import { connect } from 'react-redux';
import Radio from 'antd/lib/radio';
import { saveThemeOfExercise } from 'actions/user';
import { createSelector } from 'reselect';
import lodashGet from 'lodash.get';
import { t1 } from 'translate';
import './style.scss';

const ChangeTheme = ({ theme = 'light', dispatch }) => {
  const handleChange = React.useCallback(
    (event) => {
      dispatch(saveThemeOfExercise(event.target.value));
    },
    [dispatch],
  );

  return (
    <div className="d-flex align-items-center change-exercise-theme-container">
      {t1('color_schema')}
      <Radio.Group value={theme} onChange={handleChange} className="m-l-10">
        <Radio.Button
          value="light"
          style={{ background: '#eee', borderRadius: 50 }}
        />
        <Radio.Button
          value="dark"
          style={{ background: '#2B3C45', marginLeft: 10, borderRadius: 50 }}
        />
      </Radio.Group>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => lodashGet(state, 'user.UIConfig.exerciseTheme'),
  (theme) => ({
    theme,
  }),
);

export default connect(mapStateToProps)(ChangeTheme);
