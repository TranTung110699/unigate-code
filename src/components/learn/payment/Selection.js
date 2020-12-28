import React from 'react';
import { displayPrice } from 'common/utils/money';
import defaultAvatar from '../images/default_path_avatar.png';

class Selection extends React.Component {
  handleClick = () => {
    const { selected, onSelected, onDeselected } = this.props;
    if (!selected && onSelected) {
      onSelected();
    }
    if (selected && onDeselected) {
      onDeselected();
    }
  };

  render() {
    const { item, selected } = this.props;
    const avatarSrc = item.avatar
      ? `${window.APP_STATIC_CDN}${item.avatar}`
      : defaultAvatar;

    return (
      <button
        className={`learn-payment-item-preview ${
          selected ? 'learn-payment-item-preview--selected' : ''
        }`}
        onClick={this.handleClick}
      >
        <img
          className="learn-payment-item-preview__avatar "
          src={avatarSrc}
          alt={item.name}
        />
        <div
          className={`learn-payment-item-preview__name ${
            selected ? 'learn-payment-item-preview__name--selected' : ''
          }`}
        >
          {item.name}
        </div>
        <div
          className={`learn-payment-item-preview__price ${
            selected ? 'learn-payment-item-preview__price--selected' : ''
          }`}
        >
          {displayPrice(item.price)}
        </div>
      </button>
    );
  }
}

export default Selection;
