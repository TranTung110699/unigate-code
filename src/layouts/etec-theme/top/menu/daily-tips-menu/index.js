import React, { Component } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import PropTypes from 'prop-types';
import { t } from 'translate';
import { getFrontendUrl } from 'routes/links/common';
import { Link } from 'react-router-dom';
import './stylesheet.scss';
import Icon from './images/ic-down.png';

class Index extends Component {
  componentDidMount() {
    this.fetchPageByCategory();
  }

  fetchPageByCategory() {
    const { dispatch } = this.props;
    const url = apiUrls.children_category;
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState: 'daily_toeic_tips' },
        {
          parent_code: 'etec',
          status: 'approved',
        },
      ),
    );
  }

  render() {
    const {
      items,
      shouldShowDropdownDailyTips,
      onHandleDropdownDailyTips,
    } = this.props;
    return (
      <div className="menu-drop-down">
        <div
          className="menu-drop-down__button"
          onClick={onHandleDropdownDailyTips}
        >
          <a>{t('daily_tips')}</a>
          <img
            src={Icon}
            alt=""
            className={`menu-drop-down__button--icon menu-drop-down__button--icon__${
              shouldShowDropdownDailyTips ? 'up' : 'down'
            } `}
          />
        </div>
        <div
          className={`menu-drop-down__box menu-drop-down__box--${
            shouldShowDropdownDailyTips ? 'open' : 'close'
          }`}
        >
          {items &&
            items.map((item) => (
              <Link
                id={item.id}
                to={getFrontendUrl('blog', { categorySlug: item.slug })}
              >
                <div
                  className="menu-drop-down__box__item"
                  onClick={onHandleDropdownDailyTips}
                >
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const items = state.dataApiResults.daily_toeic_tips || [];

  return {
    items,
  };
};

Index.propTypes = {
  items: PropTypes.instanceOf(Array),
  shouldShowDropdownDailyTips: PropTypes.bool,
  onHandleDropdownDailyTips: PropTypes.func,
};

Index.defaultProps = {
  items: null,
  shouldShowDropdownDailyTips: false,
  onHandleDropdownDailyTips: null,
};

export default connect(mapStateToProps)(Index);
