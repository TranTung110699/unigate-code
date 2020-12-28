import React, { Component } from 'react';
import { Element } from 'schema-form/elements';
import { Link } from 'react-router-dom';

const style = {
  itemStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
};

class CheckListItem extends Component {
  render() {
    const { fieldValue, fieldName, url, text } = this.props;

    return (
      <div className="task-item col-md-12" style={style.itemStyle}>
        <div className="checkbox-item">
          <Element
            schema={{
              name: fieldName,
              type: 'checkbox',
              checked: fieldValue,
              fullWidth: true,
              disabled: true,
            }}
          />
        </div>
        <div className="right-content">
          {url ? <Link to={url}> {text} </Link> : <span>{text}</span>}{' '}
        </div>
      </div>
    );
  }
}

export default CheckListItem;
