import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { t1 } from 'translate';
import get from 'lodash.get';
import DisplayHtml from 'components/common/html';

class ShowMoreWrapper extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showFull: false,
    };
  }
  handleShowMore = () => {
    this.setState((state) => ({
      showFull: !get(state, 'showFull'),
    }));
  };
  render() {
    const { items } = this.props;
    const { showFull } = this.state;
    const showLess = items && items.slice(0, 2);
    let showLestText = showLess.map((category) => (
      <DisplayHtml content={get(category, 'name', '')} />
    ));
    showLestText = (
      <div>
        {showLestText}
        ...
      </div>
    );
    const showFullText = items.map((category) => (
      <DisplayHtml content={get(category, 'name', '')} />
    ));
    return (
      <div>
        {!showFull ? showLestText : showFullText}

        <div className="show-more">
          <a onClick={this.handleShowMore} href="#">
            {!showFull ? t1('show_more') : t1('show_less')}
          </a>
        </div>
      </div>
    );
  }
}
ShowMoreWrapper.propTypes = {
  items: PropTypes.array.isRequired,
};
export default ShowMoreWrapper;
