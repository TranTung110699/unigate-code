import React from 'react';
import { t1 } from 'translate';
import Icon from 'antd/lib/icon';
import { connect } from 'react-redux';
import { saveFontSizeOfExercise } from 'actions/user';
import { createSelector } from 'reselect';
import lodashGet from 'lodash.get';
import './style.scss';

const FontSize = ({ fontSize = 14, dispatch }) => {
  const increaseFontSize = React.useCallback(
    () => {
      dispatch(saveFontSizeOfExercise(fontSize + 2));
    },
    [dispatch, fontSize],
  );

  const reductionFontSize = React.useCallback(
    () => {
      dispatch(saveFontSizeOfExercise(fontSize - 2));
    },
    [dispatch, fontSize],
  );

  const defaultFontSize = React.useCallback(
    () => {
      dispatch(saveFontSizeOfExercise(14));
    },
    [dispatch],
  );

  return (
    <div className="d-flex align-items-center change-exercise-font-size-container">
      {t1('text_size')}
      <div className="m-l-10">
        <button
          className="font-size-button"
          disabled={fontSize <= 10}
          onClick={reductionFontSize}
        >
          A <Icon type="minus" />
        </button>
        <button className="font-size-button" onClick={defaultFontSize}>
          A
        </button>
        <button
          className="font-size-button"
          disabled={fontSize >= 40}
          onClick={increaseFontSize}
        >
          A <Icon type="plus" />
        </button>
      </div>
    </div>
  );
};

const mapStateToProps = createSelector(
  (state) => lodashGet(state, 'user.UIConfig.exerciseFontSize'),
  (fontSize) => ({
    fontSize,
  }),
);

export default connect(mapStateToProps)(FontSize);
