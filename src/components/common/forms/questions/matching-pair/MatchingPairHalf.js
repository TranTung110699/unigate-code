import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import PropTypes from 'prop-types';
import MatchingPairOption from './MatchingPairOption';

class MatchingPairHalfInner extends React.Component {
  static propTypes = {
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      }),
    ),
    sortable: PropTypes.bool,
  };

  static defaultProps = {
    items: null,
    sortable: false,
  };

  render() {
    const { items, sortable } = this.props;

    return (
      <div className="matching-pair-question__half">
        {items &&
          items.map((item, index) => (
            <MatchingPairOption
              sortable={sortable}
              key={item.id}
              item={item}
              index={index}
            />
          ))}
      </div>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class MatchingPairHalf extends React.Component {
  static propTypes = {
    sortable: PropTypes.bool,
  };

  static defaultProps = {
    sortable: false,
  };

  render() {
    const { sortable } = this.props;
    const Comp = sortable
      ? SortableContainer(MatchingPairHalfInner)
      : MatchingPairHalfInner;
    return <Comp {...this.props} />;
  }
}

export default MatchingPairHalf;
