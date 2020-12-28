import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { t1, t3 } from 'translate';
import { getNodeSelector } from 'components/admin/node/utils';
import { setCurrentLearningElement } from 'actions/learn';
import { Scrollbars } from 'react-custom-scrollbars';
import Icon from './resources/icon.png';
import './stylesheet.scss';

class NotAccessible extends React.Component {
  cssClass = 'learn-item-not-accessible';

  render() {
    const { className, notLearntItems, onRedirectButtonClick } = this.props;

    const NUMBER_OF_ITEMS_TO_SHOW = 3;

    const haveMoreNotLearntItems =
      this.props.haveMoreNotLearntItems ||
      (Array.isArray(notLearntItems) &&
        notLearntItems.length > NUMBER_OF_ITEMS_TO_SHOW);

    const itemsToShow = Array.isArray(notLearntItems)
      ? notLearntItems.slice(-NUMBER_OF_ITEMS_TO_SHOW)
      : notLearntItems;

    return (
      <div className={`${className || ''} ${this.cssClass}`}>
        <img className={`${this.cssClass}__icon`} src={Icon} alt="icon" />
        <h1 className={`${this.cssClass}__message`}>
          {t3('you_cannot_learn_this_item_now')}
        </h1>
        <div className={`${this.cssClass}__not-learnt`}>
          <h2 className={`${this.cssClass}__not-learnt-message`}>
            {t1('you_have_to_finish_the_following_items_first')}
          </h2>
          <Scrollbars className={`${this.cssClass}__not-learnt-scroll`}>
            <ul className={`${this.cssClass}__not-learnt-list`}>
              {haveMoreNotLearntItems && (
                <li className={`${this.cssClass}__not-learnt-item`}>
                  <span className={`${this.cssClass}__not-learnt-item-name`}>
                    ...
                  </span>
                </li>
              )}
              {itemsToShow &&
                itemsToShow.map(
                  (item, itemIndex) =>
                    item &&
                    item.name && (
                      <li
                        key={itemIndex}
                        className={`${this.cssClass}__not-learnt-item`}
                      >
                        <span
                          className={`${this.cssClass}__not-learnt-item-name`}
                        >
                          {item.name}
                        </span>
                      </li>
                    ),
                )}
            </ul>
          </Scrollbars>
        </div>
        <div className={`${this.cssClass}__actions`}>
          <button
            onClick={onRedirectButtonClick}
            className={`${this.cssClass}__button`}
          >
            {t3('go_to_the_nearest_learnable_item')}
          </button>
        </div>
      </div>
    );
  }
}

const iidPropTypes = PropTypes.oneOfType([PropTypes.string, PropTypes.number]);

NotAccessible.propTypes = {
  className: PropTypes.string,
  haveMoreNotLearntItems: PropTypes.bool,
  itemIid: iidPropTypes,
  itemToRedirectTo: PropTypes.shape(),
  navIdToRedirectTo: iidPropTypes,
  notLearntIids: PropTypes.arrayOf(iidPropTypes),
  notLearntItems: PropTypes.arrayOf(PropTypes.shape()),
  onRedirectButtonClick: PropTypes.func,
};

NotAccessible.defaultProps = {
  className: '',
  haveMoreNotLearntItems: false,
  itemIid: null,
  itemToRedirectTo: null,
  navIdToRedirectTo: null,
  notLearntIids: null,
  notLearntItems: null,
  onRedirectButtonClick: null,
};

const mapStateToProps = (state, props) => {
  const { notLearntIids, navIdToRedirectTo } = props;

  let newNotLearntItems = [];
  let haveOtherItemsBeforeListOfNewNotLearntItems = false;
  if (Array.isArray(notLearntIids)) {
    for (let i = notLearntIids.length - 1; i >= 0; i -= 1) {
      const previousElement = newNotLearntItems[0];
      const currentElement = notLearntIids[i];
      if (
        currentElement &&
        (!previousElement || previousElement.pid === currentElement.pid)
      ) {
        newNotLearntItems = [
          getNodeSelector(state)(currentElement.iid, currentElement.pid) || {},
        ].concat(newNotLearntItems);
        haveOtherItemsBeforeListOfNewNotLearntItems = false;
      } else if (currentElement) {
        haveOtherItemsBeforeListOfNewNotLearntItems = true;
      }
    }
  }

  return {
    haveMoreNotLearntItems: haveOtherItemsBeforeListOfNewNotLearntItems,
    notLearntItems: newNotLearntItems,
    navIdToRedirectTo,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  setNewCurrentLearningItem: (navId) => {
    dispatch(
      setCurrentLearningElement({
        navId,
      }),
    );
  },
});

const mergeProps = (stateProps, dispatchProps, props) => {
  const { setNewCurrentLearningItem } = dispatchProps;
  const { navIdToRedirectTo } = props;
  return {
    ...props,
    ...stateProps,
    ...dispatchProps,
    onRedirectButtonClick: () => {
      setNewCurrentLearningItem(navIdToRedirectTo);
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(NotAccessible);
