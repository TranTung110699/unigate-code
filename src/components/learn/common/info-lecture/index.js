import React from 'react';
import { t1 } from 'translate';
import { stripHTML } from 'common/utils/string';
import './stylesheet.scss';

class LectureInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showMore: false };
  }

  render() {
    const { title, content } = this.props;
    const contentStripped = stripHTML(content);
    return (
      <div className="info-lecture">
        {/*
          <h2 className="title">{title}</h2>
           */}
        {contentStripped.trim() ? (
          <div>
            <p
              className={`content ${
                this.state.showMore ? 'content-expand' : 'content-collapse'
              }`}
              dangerouslySetInnerHTML={{ __html: content }}
            />
            {contentStripped.length > 200 && (
              <button
                className="show-more"
                onClick={() => {
                  this.setState({ showMore: !this.state.showMore });
                }}
              >
                {t1('show_more')}
              </button>
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default LectureInfo;
