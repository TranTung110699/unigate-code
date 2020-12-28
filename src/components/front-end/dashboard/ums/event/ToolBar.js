import React from 'react';
import { t1 } from 'translate';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import get from 'lodash.get';
import { getTimeStringCalendarOfDate } from './Utils';
import './stylesheet.scss';

export default function(toolbar) {
  const goToDayView = () => {
    toolbar.onViewChange('day');
  };
  const goToWeekView = () => {
    toolbar.onViewChange('week');
  };
  const goToMonthView = () => {
    toolbar.onViewChange('month');
  };
  const goToToday = () => {
    const now = new Date();
    toolbar.date.setDate(now.getDate());
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('current');
  };
  const goToBack = () => {
    const date = toolbar.date;
    const newDate = date;
    switch (toolbar.view) {
      case 'month':
        date.setMonth(date.getMonth() - 1);
        break;
      case 'week':
        date.setDate(date.getDate() - 7);
        break;
      case 'day':
        date.setDate(date.getDate() - 1);
        break;
      default:
        break;
    }
    toolbar.onNavigate('prev', newDate);
  };
  const goToNext = () => {
    const date = toolbar.date;
    const newDate = date;
    switch (toolbar.view) {
      case 'month':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'week':
        date.setDate(date.getDate() + 7);
        break;
      case 'day':
        date.setDate(date.getDate() + 1);
        break;
      default:
        break;
    }
    toolbar.onNavigate('next', newDate);
  };
  return (
    <div className="toolbar-container ">
      <div className="left">
        <div className="navigation-buttons">
          <button className="btn btn-back indicator-right" onClick={goToToday}>
            {t1('today')}
          </button>
          <button className="btn btn-back indicator-right" onClick={goToBack}>
            &lt;
          </button>
          <button className="btn btn-next" onClick={goToNext}>
            &gt;
          </button>
        </div>
        <label className="label-date">
          {getTimeStringCalendarOfDate(
            get(toolbar, 'date'),
            get(toolbar, 'view'),
          )}
        </label>
      </div>
      <div className="right">
        <div className="filter-button">
          <button
            className={`btn indicator-right ${
              toolbar.view === 'month' ? 'filter-button-active' : ''
            }`}
            onClick={goToMonthView}
          >
            {t1('month')}
          </button>
          <button
            className={`btn indicator-right ${
              toolbar.view === 'week' ? 'filter-button-active' : ''
            }`}
            onClick={goToWeekView}
          >
            {t1('week')}
          </button>
          <button
            className={`btn ${
              toolbar.view === 'day' ? 'filter-button-active' : ''
            }`}
            onClick={goToDayView}
          >
            {t1('day')}
          </button>
        </div>
        <div className="mobile-menu">
          <IconMenu
            iconButtonElement={
              <div style={{ cursor: 'pointer' }}>
                <i
                  className="material-icons"
                  style={{
                    top: '3px',
                    right: '-5px',
                    position: 'relative',
                  }}
                >
                  more_vert
                </i>
              </div>
            }
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          >
            <MenuItem primaryText={t1('month')} onClick={goToMonthView} />
            <MenuItem primaryText={t1('week')} onClick={goToWeekView} />
            <MenuItem primaryText={t1('day')} onClick={goToDayView} />
          </IconMenu>
        </div>
      </div>
    </div>
  );
}
