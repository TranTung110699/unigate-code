import React from 'react';
import Paper from 'material-ui/Paper';
import Icon from 'components/common/Icon';
import { SortableElement } from 'react-sortable-hoc';
import PropTypes from 'prop-types';

class MatchingPairOptionInner extends React.Component {
  static propTypes = {
    item: PropTypes.shape({
      color: PropTypes.string,
      content: PropTypes.string,
    }),
    sortable: PropTypes.bool,
  };

  static defaultProps = {
    item: {},
    sortable: false,
  };

  render() {
    const { item, sortable } = this.props;
    return (
      <Paper
        className={`matching-pair-question__option \
          ${sortable ? 'matching-pair-question__option--sortable' : ''} \
          ${item.class ? item.class : ''}`}
      >
        {sortable && (
          <span className="matching-pair-question__option-icon">
            <Icon icon="arrows" />
          </span>
        )}
        {item.content}
      </Paper>
    );
  }
}

// eslint-disable-next-line react/no-multi-comp
class MatchingPairOption extends React.Component {
  static propTypes = {
    sortable: PropTypes.bool,
  };

  static defaultProps = {
    sortable: false,
  };

  render() {
    const { sortable } = this.props;
    const Comp = sortable
      ? SortableElement(MatchingPairOptionInner)
      : MatchingPairOptionInner;
    return <Comp {...this.props} />;
  }
}

export default MatchingPairOption;
