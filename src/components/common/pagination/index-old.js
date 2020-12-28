/**
 * Created by Peter Hoang Nguyen on 4/14/2017.
 */
import React from 'react';
import FlatButton from 'components/common/mui/FlatButton';
import PropTypes from 'prop-types';
import NextIcon from 'material-ui/svg-icons/image/navigate-next';
import BeforeIcon from 'material-ui/svg-icons/image/navigate-before';
import LastIcon from 'material-ui/svg-icons/av/fast-forward';
import FirstIcon from 'material-ui/svg-icons/av/fast-rewind';
import { t, t4 } from 'translate';
import './stylesheet.scss';

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentPageNumber: 1, startAtPage: 1, value: 1 };
  }

  componentDidMount() {
    this.calculatePageTotal(this.props);
    this.generateControlOfPageNumbers(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.total !== nextProps.total) {
      // console.log('will....', nextProps.total);
      this.calculatePageTotal(nextProps);
      this.generateControlOfPageNumbers(nextProps);
    }
  }

  getTotalPagerControl = () => {
    const { showingPagesControlNumber } = this.props;
    return showingPagesControlNumber || 5;
  };

  generateControlOfPageNumbers = (
    props,
    newCurrentPageNumber,
    startFrom,
    endAt,
    itemPerPageChanged,
  ) => {
    const { itemPerPage, onPageChange } = props;
    let { total } = props;
    const { startAtPage } = this.state;
    let {
      currentPageNumber,
      showingPageToPage,
      showingPageFromPage,
      iPerPage,
    } = this.state;
    let showingPagesControlNumber = this.getTotalPagerControl();
    const showingPagesControlNumberDefault = showingPagesControlNumber;
    total = total || 0;
    showingPageToPage = endAt || showingPageToPage;
    showingPageFromPage = startFrom || showingPageFromPage;
    let totalPages = 0;
    if (itemPerPageChanged === -1) {
      totalPages = 1;
      iPerPage = -1;
    } else {
      iPerPage =
        itemPerPageChanged || iPerPage || (itemPerPage && itemPerPage[0]) || 10;
      totalPages = Math.ceil(total / iPerPage);
      if (
        showingPageToPage < showingPagesControlNumberDefault &&
        showingPageToPage < totalPages
      ) {
        showingPageToPage =
          totalPages > showingPagesControlNumberDefault
            ? showingPagesControlNumberDefault
            : total;
      }
    }

    if (newCurrentPageNumber) {
      currentPageNumber = newCurrentPageNumber;
    }
    currentPageNumber = currentPageNumber || startAtPage;

    showingPageToPage = showingPageToPage || showingPagesControlNumber;
    showingPageFromPage = showingPageFromPage || startAtPage;
    showingPagesControlNumber -= 1;
    if (currentPageNumber === showingPageToPage) {
      showingPageToPage = showingPageToPage + currentPageNumber - startAtPage;
    } else if (
      currentPageNumber === showingPageFromPage &&
      showingPageFromPage !== startAtPage
    ) {
      showingPageToPage = showingPageFromPage;
    }

    if (showingPageToPage > totalPages) {
      showingPageToPage = totalPages;
    }

    showingPageFromPage = showingPageToPage - showingPagesControlNumber;

    if (showingPageFromPage < startAtPage) {
      showingPageFromPage = startAtPage;
    }
    if (
      showingPageFromPage === startAtPage &&
      totalPages >= showingPagesControlNumberDefault
    ) {
      showingPageToPage = showingPagesControlNumberDefault;
    }
    if (currentPageNumber > showingPageToPage) {
      currentPageNumber = showingPageToPage;
    }
    // TODO: using sagas
    if (onPageChange) {
      if (iPerPage === -1) {
        onPageChange(currentPageNumber, total);
      } else {
        onPageChange(currentPageNumber, iPerPage);
      }
    }
    const pagesControl = [];
    for (
      let pageId = showingPageFromPage;
      pageId <= showingPageToPage;
      pageId += 1
    ) {
      pagesControl.push(pageId);
    }

    this.setState({
      showingPageToPage,
      showingPageFromPage,
      pagesControl,
      totalPages,
      currentPageNumber,
      inputPageNumber: currentPageNumber,
      iPerPage,
    });
  };

  onItemPerPageChange = (event) => {
    const itemPerPage = parseInt(event.target.value, 10);
    this.onPageChanged(false, false, false, itemPerPage);
  };

  onNextPage = () => {
    const { currentPageNumber, totalPages } = this.state;
    if (currentPageNumber < totalPages) {
      this.onPageChanged(currentPageNumber + 1);
    }
  };

  onBackPage = () => {
    const { currentPageNumber } = this.state;
    const newPage = currentPageNumber - 1;
    if (newPage > 0) {
      this.onPageChanged(newPage);
    }
  };

  onGoLastPage = () => {
    const { totalPages, startAtPage } = this.state;
    if (totalPages) {
      let from = totalPages - this.getTotalPagerControl();
      if (from < startAtPage) {
        from = startAtPage;
      }
      this.onPageChanged(totalPages, from, totalPages);
    }
  };

  onGoFirstPage = () => {
    const { startAtPage, totalPages } = this.state;
    if (totalPages) {
      this.onPageChanged(startAtPage, startAtPage, this.getTotalPagerControl());
    }
  };

  handlePageInputOnChange = (event) => {
    this.setState({ inputPageNumber: event.target.value });
  };

  handlePageInputOnKeyUp = (event) => {
    const keyCode = event.which || event.keyCode;
    if (keyCode !== 13) {
      return;
    }
    const { startAtPage, currentPageNumber, totalPages } = this.state;
    let { showingPageToPage, showingPageFromPage } = this.state;
    let pageNumber = event.target.value;

    if (!pageNumber) {
      return;
    }
    pageNumber = parseInt(pageNumber, 10);
    if (pageNumber === currentPageNumber) {
      // this.setState({value: currentPageNumber});
      return;
    }
    if (pageNumber < startAtPage) {
      pageNumber = startAtPage;
    }
    if (pageNumber > totalPages) {
      pageNumber = totalPages;
    }
    if (showingPageToPage < pageNumber) {
      showingPageToPage = pageNumber;
      showingPageFromPage = showingPageToPage - this.getTotalPagerControl();
    } else if (pageNumber < showingPageFromPage) {
      showingPageFromPage = pageNumber;
      showingPageToPage = showingPageFromPage + this.getTotalPagerControl();
    }
    this.onPageChanged(pageNumber, showingPageFromPage, showingPageToPage);
  };

  calculatePageTotal = (props) => {
    let { total, perPage } = props;
    perPage = perPage || 10;
    total = 100;
    let totalPages = total / perPage;
    if (total % perPage > 0) {
      totalPages += 1;
    }
    this.setState({ totalPages });
  };

  onPageChanged = (currentPageId, startFrom, endAt, itemPerPageChanged) => {
    this.generateControlOfPageNumbers(
      this.props,
      currentPageId,
      startFrom,
      endAt,
      itemPerPageChanged,
    );
  };

  onItemPerPageChanged = (event, index, value) => {
    this.setState({ value });
  };

  render() {
    const {
      currentPageNumber,
      pagesControl,
      totalPages,
      showingPageFromPage,
      showingPageToPage,
      startAtPage,
      iPerPage,
    } = this.state;

    const { showExtraControl, total, onlyShowIfTotalBigEnough } = this.props;
    let { itemPerPage, position } = this.props;
    itemPerPage = itemPerPage || [10, 20, 30, 40, 50, 100];

    if (onlyShowIfTotalBigEnough && total <= itemPerPage[0]) {
      return null;
    }

    position = position || 'right';
    let positionClass = '';
    switch (position) {
      case 'right': {
        positionClass = 'pull-right';
        break;
      }
      case 'left': {
        positionClass = 'pull-left';
        break;
      }
      case 'center':
      default: {
        positionClass = 'text-center';
      }
    }
    return (
      <div>
        {pagesControl && (
          <div className="ui-pagination clearfix">
            <div className={positionClass} style={{ clear: 'both' }}>
              <FlatButton
                onClick={this.onGoFirstPage}
                disabled={
                  showingPageFromPage === startAtPage || iPerPage === -1
                }
                icon={<FirstIcon />}
              />
              <FlatButton
                onClick={this.onBackPage}
                disabled={currentPageNumber === startAtPage || iPerPage === -1}
                icon={<BeforeIcon />}
              />
              {pagesControl.map((pageId) => (
                <FlatButton
                  className={`ui-pagination__page-button ${
                    currentPageNumber === pageId
                      ? 'ui-pagination__page-button--active'
                      : ''
                  }`}
                  key={`page-${pageId}`}
                  onClick={() => {
                    this.onPageChanged(pageId);
                  }}
                  label={pageId}
                />
              ))}
              <FlatButton
                onClick={this.onNextPage}
                disabled={currentPageNumber === totalPages || iPerPage === -1}
                icon={<NextIcon />}
              />
              <FlatButton
                onClick={this.onGoLastPage}
                disabled={showingPageToPage === totalPages || iPerPage === -1}
                icon={<LastIcon />}
              />
              {showExtraControl && (
                <span className="ui-pagination__control">
                  <span>
                    {t4('total')}: <b>{total}</b>,{' '}
                  </span>
                  <span>{t4('displaying_page')}</span>
                  <input
                    className="ui-pagination__page-input"
                    type="number"
                    value={this.state.inputPageNumber}
                    onKeyUp={this.handlePageInputOnKeyUp}
                    onChange={this.handlePageInputOnChange}
                  />
                  <span>
                    {' '}
                    /{' '}
                    {totalPages > 1
                      ? t4('%s_pages', [totalPages])
                      : t4('1_page')}
                    ,{' '}
                  </span>
                  <select
                    className="ui-pagination__items-per-page-select"
                    name="itemPerPage"
                    value={iPerPage}
                    onChange={this.onItemPerPageChange}
                  >
                    {itemPerPage.map((item) => (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    ))}
                    <option value={-1}>{t('all')}</option>
                  </select>
                  <span> {t('items_per_page')}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
}

Pagination.propTypes = {
  itemPerPage: PropTypes.arrayOf(PropTypes.number),
  onlyShowIfTotalBigEnough: PropTypes.bool,
  position: PropTypes.string,
  showExtraControl: PropTypes.bool,
};

Pagination.defaultProps = {
  itemPerPage: null,
  onlyShowIfTotalBigEnough: true,
  position: '',
  showExtraControl: true,
};

export default Pagination;
