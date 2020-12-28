import React from 'react';
import { connect } from 'react-redux';
import screenfull from 'screenfull';
import { findDOMNode } from 'react-dom';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import Pagination from './pagination';
import './stylesheet.scss';
import { getAttachment } from 'components/learn/items/lecture/common';
import PDF from 'components/common/pdf';
import lodashGet from 'lodash.get';
import { isSmallScreen } from 'common';
import styled from 'styled-components';

const PDFContainer = styled.div`
  height: calc(100vh - 200px) !important;
  @media (max-width: 768px) {
    height: calc(100vh - 240px) !important;
  }
`;

const getDefaultRotateDegFromNode = (node) =>
  lodashGet(node, 'pdf_default_rotate_deg');

class Pdf extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rotate: 0,
      fullScreenPdfOnly: false,
    };
    // if (screenfull && screenfull.enabled) {
    //   this.state = {
    //     isFullscreen: false,
    //   };
    //   screenfull.on('change', () => {
    //     this.setState({
    //       isFullscreen: screenfull.isFullscreen,
    //     });
    //   });
    // }
  }

  componentDidMount() {
    this.setDefaultRotate();
  }

  componentDidUpdate(prevProps, prevState) {
    const { page, pages } = this.state;
    const { isNotLearn } = this.props;
    if (page && page !== prevState.page && pages && !isNotLearn) {
      this.saveLearningProgress();
    }
    this.setDefaultRotate(prevProps);
  }

  setDefaultRotate = (prevProps = {}) => {
    const { node } = this.props;
    const { node: prevNode } = prevProps;
    const defaultRotateDeg = getDefaultRotateDegFromNode(node);
    const prevDefaultRotateDeg = getDefaultRotateDegFromNode(prevNode);

    if (defaultRotateDeg && defaultRotateDeg !== prevDefaultRotateDeg) {
      this.setState({
        rotate: defaultRotateDeg,
      });
    }
  };

  saveLearningProgress = () => {
    const {
      learnItemIid,
      learningProgress,
      isPreview,
      isReview,
      saveLearningProgress,
    } = this.props;
    if (isPreview || isReview) {
      return;
    }
    const { page, pages } = this.state;

    const newProgress = Math.ceil((page / pages) * 100);
    if (newProgress <= learningProgress) {
      return;
    }

    saveLearningProgress([
      {
        tco_iid: learnItemIid,
        p: newProgress,
      },
    ]);
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ page: 1, pages: numPages });
  };

  handlePreviousPageButtonClick = (page) => {
    if (page - 1 < 1) return;
    if (this.pdfViewer) {
      this.pdfViewer.goToPage(page - 1);
    }
  };

  handleNextPageButtonClick = (page) => {
    const { pages } = this.state;
    if (page + 1 > pages) return;
    if (this.pdfViewer) {
      this.pdfViewer.goToPage(page + 1);
    }
  };

  handlePaginationChange = (page) => {
    const { pages } = this.state;
    if (page > pages || page < 1) return;
    if (this.pdfViewer) {
      this.pdfViewer.goToPage(page);
    }
  };

  handleGoToPage = (page) => {
    this.setState({ page });
  };

  fullscreen = () => {
    if (screenfull && screenfull.enabled) {
      screenfull.request(findDOMNode(this));
      screenfull.on('change', () => {
        this.setState({
          fullScreenPdfOnly:
            !this.state.fullScreenPdfOnly && screenfull.isFullscreen,
        });
      });
    }
  };

  exitFullscreen = () => {
    if (screenfull && screenfull.enabled) {
      screenfull.exit();
      screenfull.on('change', () => {
        this.setState({
          fullScreenPdfOnly:
            !this.state.fullScreenPdfOnly && screenfull.isFullscreen,
        });
      });
    }
  };

  rotate = (degree) => {
    this.setState((state) => ({
      ...state,
      rotate: (state.rotate || 0) + degree,
    }));
  };

  rotateLeft = () => this.rotate(-90);
  rotateRight = () => this.rotate(90);

  render() {
    const {
      node,
      className,
      link,
      isNotLearn,
      notShowFullscreenButton,
    } = this.props;
    const attachment = getAttachment(node);

    let attachmentLink = '';
    if (attachment && attachment.link) {
      attachmentLink = attachment.link;
    }
    if (isNotLearn && link) {
      attachmentLink = link;
    }

    const { fullScreenPdfOnly, page, pages, rotate } = this.state;

    return (
      <PDFContainer
        className={`lecture-pdf\
          ${fullScreenPdfOnly ? 'lecture-pdf--fullscreen' : ''}\
          ${className || ''}\
          learn-content-border`}
      >
        {notShowFullscreenButton ? null : (
          <button
            className="lecture-pdf__fullscreen-button"
            onClick={fullScreenPdfOnly ? this.exitFullscreen : this.fullscreen}
          >
            {fullScreenPdfOnly ? (
              <Icon icon="fullscreen-exit" title={t1('exit_fullscreen')} />
            ) : (
              <Icon icon="fullscreen" title={t1('view_fullscreen')} />
            )}
          </button>
        )}
        {attachmentLink ? (
          <div style={{ height: '99%' }}>
            <PDF
              file={attachmentLink}
              onDocumentLoadSuccess={this.onDocumentLoadSuccess}
              onGoToPage={this.handleGoToPage}
              pdfViewerRef={(pdfViewer) => {
                this.pdfViewer = pdfViewer;
              }}
              rotate={rotate}
            />
          </div>
        ) : null}
        {pages && (
          <div
            className={`lecture-pdf__navigation ${
              fullScreenPdfOnly ? 'lecture-pdf__navigation--fullscreen' : ''
            }`}
          >
            <div className={'lecture-pdf__navigation-rotate-buttons'}>
              <button
                className={'lecture-pdf__navigation-rotate-button'}
                title={t1('rotate_lecture_left')}
                onClick={this.rotateLeft}
              >
                <Icon icon="rotateLeft" />
              </button>
              <button
                className={'lecture-pdf__navigation-rotate-button'}
                onClick={this.rotateRight}
                title={t1('rotate_lecture_right')}
              >
                <Icon icon="rotateRight" />
              </button>
            </div>
            <Pagination
              onPrevious={this.handlePreviousPageButtonClick}
              onNext={this.handleNextPageButtonClick}
              onPageChange={this.handlePaginationChange}
              page={page}
              pages={pages}
            />
          </div>
        )}
      </PDFContainer>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { learnItemIid } = props;
  const trackerProgress = state.trackerProgress[learnItemIid];
  const learningProgress = (trackerProgress && trackerProgress.p) || 0;

  return {
    learningProgress,
    isPreview: state.learn.isPreview,
    isReview: state.learn.isReview,
  };
};

export default connect(mapStateToProps)(Pdf);
