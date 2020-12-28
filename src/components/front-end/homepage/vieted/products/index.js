import React from 'react';
import { t3 } from 'translate';
import { findDOMNode } from 'react-dom';
import items from './configs/items';
import Item from './item';
import './stylesheet.scss';

class Products extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemToDisplayDetail: 0,
    };
  }

  cssClass = 'vieted-home-page-products';

  handleClick = (index) => {
    const { itemToDisplayDetail } = this.state;
    this.setState({
      itemToDisplayDetail: itemToDisplayDetail === index ? null : index,
    });
  };

  getItemsNodeWidth = () => {
    const itemsNode = findDOMNode(this.itemsEl);
    return itemsNode && itemsNode.getBoundingClientRect().width
      ? itemsNode.getBoundingClientRect().width
      : '60vw';
  };

  getTranslateForItemDetailDialog = (index) => {
    const itemsNode = findDOMNode(this.itemsEl);
    const itemsNodeLeft = itemsNode && itemsNode.getBoundingClientRect().left;

    const itemNode = findDOMNode(this[`item--${index}`]);
    const itemNodeLeft = itemNode && itemNode.getBoundingClientRect().left;

    return itemsNodeLeft - itemNodeLeft;
  };

  render() {
    const { itemToDisplayDetail } = this.state;
    const title = t3('products');

    return (
      <div className={this.cssClass}>
        <div className="container">
          <div className={`${this.cssClass}__title`}>{title}</div>
          <div
            className={`${this.cssClass}__items`}
            ref={(el) => {
              this.itemsEl = el;
            }}
          >
            {items &&
              items.map((item, index) => (
                <div
                  key={item.id}
                  className={`${this.cssClass}__item`}
                  ref={(el) => {
                    this[`item--${index}`] = el;
                  }}
                >
                  <Item
                    detailDialogTranslate={this.getTranslateForItemDetailDialog(
                      index,
                    )}
                    detailDialogWidth={this.getItemsNodeWidth()}
                    shouldDisplayDetail={index === itemToDisplayDetail}
                    item={item}
                    onClick={() => {
                      this.handleClick(index);
                    }}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    );
  }
}

Products.propTypes = {};

Products.defaultProps = {};

export default Products;
