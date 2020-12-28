import React from 'react';
import Paper from 'material-ui/Paper';
import Icon from 'components/common/Icon';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import { t1 } from 'translate';
import './stylesheet.scss';

const paperStyle = {
  width: '100%',
  height: 'auto',
  padding: '10px',
  marginBottom: '1em',
};

const divStyle = { position: 'relative' };

const iconCloseStyle = {
  position: 'absolute',
  right: 0,
  top: 0,
  width: 20,
  height: 20,
  cursor: 'pointer',
};

const SortableItem = SortableElement(({ arrayIndex, value, renderElement }) => (
  <Paper key={arrayIndex} zDepth={2} style={paperStyle}>
    <div style={divStyle}>
      <Icon icon="move" style={iconCloseStyle} title={t1('move')} />
      {renderElement({
        index: arrayIndex,
        total: value && value.length,
        value: value && value[arrayIndex],
      })}
    </div>
  </Paper>
));

const SortableList = SortableContainer(
  ({ value, errorText, renderElement }) => (
    <div>
      {value &&
        value.map((member, index) => {
          return (
            <SortableItem
              key={`item-${index}`}
              index={index}
              arrayIndex={index}
              renderElement={renderElement}
              value={value}
            />
          );
        })}

      {errorText && <span>{errorText}</span>}
    </div>
  ),
);

class Sortable extends React.PureComponent {
  handleSortEnd = ({ oldIndex, newIndex }) => {
    const { onChange, value } = this.props;
    if (typeof onChange === 'function') {
      onChange(arrayMove(value, oldIndex, newIndex));
    }
  };

  render() {
    return (
      <SortableList
        {...this.props}
        helperClass="sortable-element"
        onSortEnd={this.handleSortEnd}
      />
    );
  }
}

export default Sortable;
