import React from 'react';
import PropTypes from 'prop-types';
import { stripHTML, wordBreadcrumb } from 'common/utils/string';
import { t1 } from 'translate';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 21/04/2017
 * */
class DisplayHtml extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLessMore: props.showLessMore,
    };
  }

  render() {
    const { content, style } = this.props;

    if (!content) return null;

    const localStyle = Object.assign({}, style, { whiteSpace: 'pre-wrap' });

    let plainText;
    let lessText;
    let showLessMore = false;

    if (this.props.showLessMore) {
      plainText = stripHTML(content);
      lessText = wordBreadcrumb(
        plainText,
        this.props.lessWordCount || 100,
        false,
      );
      if (lessText.length == plainText.length) {
        showLessMore = false;
      } else showLessMore = true;
    }

    if (this.props.showLessMore && this.state.showLessMore && showLessMore) {
      return (
        <React.Fragment>
          <div {...this.props} style={localStyle}>
            {lessText}
            ...{' '}
            <a
              href="javascript:void(0)"
              onClick={() => {
                this.setState({ showLessMore: false });
              }}
            >
              {t1('show_more')}
            </a>
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div
          {...this.props}
          style={localStyle}
          dangerouslySetInnerHTML={{ __html: content }}
        />
        {this.props.showLessMore && showLessMore ? (
          <a
            href="javascript:void(0)"
            onClick={() => {
              this.setState({ showLessMore: true });
            }}
          >
            {t1('show_less')}
          </a>
        ) : null}
      </React.Fragment>
    );
  }
}

DisplayHtml.propTypes = {
  content: PropTypes.string,
  lessWordCount: PropTypes.number,
  showLessMore: PropTypes.bool,
  style: PropTypes.shape(),
};

DisplayHtml.defaultProps = {
  content: '',
  style: null,
  showLessMore: false, // show less/more text
  lessWordCount: 100, // when lessmore is true
};

export default DisplayHtml;
