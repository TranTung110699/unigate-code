import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './stylesheet.scss';

class Index extends Component {
  spanStyle = { marginTop: '5px' };

  constructor(props) {
    super(props);
    this.state = {
      expand: props && props.item && props.item.expand,
    };
  }

  handleExpandItem = () => {
    this.setState({ expand: !this.state.expand });
  };

  render() {
    const { item } = this.props;
    const { expand } = this.state;
    return (
      <div className="faq-container">
        <div className="question">
          Q<span style={this.spanStyle}>{item.question}</span>
        </div>
        <hr />
        <div className="answer-container" onClick={this.handleExpandItem}>
          <div className="answer">
            A
            <span
              className={`content ${
                expand ? 'content-expand' : 'content-collapse'
              }`}
              style={expand ? { whiteSpace: 'pre-wrap' } : null}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
          {/*<div*/}
          {/*  className={`button-expand ${expand ? 'button-expanding' : ''}`}*/}
          {/*/>*/}
        </div>
        <hr />
      </div>
    );
  }
}

Index.propTypes = {
  item: PropTypes.instanceOf(Object),
};

Index.defaultProps = {
  item: {},
};
export default connect()(Index);
