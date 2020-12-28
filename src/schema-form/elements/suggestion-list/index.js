import React from 'react';
import { connect } from 'react-redux';
import { compareObjectWithoutType } from 'common';
import { change, getFormValues } from 'redux-form';
import './stylesheet.scss';

class SuggestionList extends React.Component {
  onSelect = (item) => {
    const {
      formid,
      forElement,
      dispatch,
      values /*dataSourceConfig*/,
    } = this.props;
    const itemsExited = values[forElement] || [];
    dispatch(change(formid, forElement, [...itemsExited, item]));
  };

  getItems = () => {
    const {
      // formid,
      forElement,
      values,
      nameElement,
      // dataSourceConfig
    } = this.props;
    const items = values ? values[nameElement] : false;

    if (!items) {
      return false;
    }

    if (!values || !values[forElement]) {
      return items;
    }
    const result = [];
    const itemsExisted = values[forElement];
    if (!itemsExisted || itemsExisted.length === 0) {
      return items;
    }
    for (let i = 0; i < items.length; i++) {
      if (!this.isExists(items[i], itemsExisted)) {
        result.push(items[i]);
      }
    }
    return result;
  };

  isExists = (item, itemsExisted) => {
    const { dataSourceConfig } = this.props;

    for (let j = 0; j < itemsExisted.length; j++) {
      if (
        compareObjectWithoutType(item[dataSourceConfig.value], itemsExisted[j])
      ) {
        return true;
      }
    }
    return false;
  };

  render() {
    const props = { ...this.props };
    const { /*input,*/ dataSourceConfig } = props;
    delete props.items;
    const items = this.getItems();

    return (
      <div
        className="suggestion-list-component"
        style={{ display: `${items ? 'block' : 'none'}` }}
      >
        {!items && <span />}
        {items && (
          <ul className={`suggestion-content-panel`}>
            {items &&
              items.map((item, index) => {
                return (
                  <li
                    key={index}
                    onClick={() => {
                      this.onSelect(item[dataSourceConfig.value]);
                    }}
                  >
                    {item[dataSourceConfig.transformData] ||
                      item[dataSourceConfig.text]}
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
    values: getFormValues(props.formid)(state),
  };
};

export default connect(mapStateToProps)(SuggestionList);
