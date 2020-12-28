import React from 'react';
import './stylesheet.scss';
import PoliogonIcon from './resources/Polygon.png';
import { findDOMNode } from 'react-dom';

class Item extends React.Component {
  cssClass = 'vieted-home-page-product-item';

  componentDidUpdate(prevProps) {
    if (!prevProps.shouldDisplayDetail && this.props.shouldDisplayDetail) {
      const thisNode = findDOMNode(this.el);
      if (thisNode && thisNode.getBoundingClientRect().bottom < 0) {
        thisNode.scrollIntoView({
          behavior: 'smooth',
        });
      }
    }
  }

  handleClick = () => {
    const { onClick } = this.props;
    onClick();
  };

  render() {
    const {
      item,
      shouldDisplayDetail,
      detailDialogWidth,
      detailDialogTranslate,
    } = this.props;
    return (
      <div
        ref={(el) => {
          this.el = el;
        }}
        className={this.cssClass}
      >
        <div
          className={`${this.cssClass}__selectable\
            ${
              shouldDisplayDetail
                ? `${this.cssClass}__selectable--selected`
                : ''
            }`}
          onClick={this.handleClick}
        >
          <div className={`${this.cssClass}__thumbnail`}>
            <img
              className={`${this.cssClass}__thumbnail-img`}
              src={item.thumbnail}
              alt="thumbnail"
            />
            <div
              className={`${this.cssClass}__thumbnail-icon\
                ${
                  shouldDisplayDetail
                    ? `${this.cssClass}__thumbnail-icon--show`
                    : ''
                }`}
            >
              <img src={item.icon} />
            </div>
          </div>
          <div className={`${this.cssClass}__name`}>{item.name}</div>
          <div className={`${this.cssClass}__description`}>
            {item.description}
          </div>
        </div>
        <div
          className={`${this.cssClass}__selector\
            ${shouldDisplayDetail ? `${this.cssClass}__selector--show` : ''}`}
        >
          <img src={PoliogonIcon} alt="selector" />
        </div>
        <div
          className={`${this.cssClass}__detail-page\
            ${
              shouldDisplayDetail ? `${this.cssClass}__detail-page--show` : ''
            }`}
          style={{
            maxHeight: shouldDisplayDetail ? 10000 : 0,
            width: detailDialogWidth,
            transform: `translate(${detailDialogTranslate}px)`,
          }}
        >
          {item.detailPage}
        </div>
      </div>
    );
  }
}

Item.propTypes = {};

Item.defaultProps = {};

export default Item;
