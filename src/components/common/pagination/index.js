/**
 * Created by Peter Hoang Nguyen on 4/14/2017.
 */
import React from 'react';
import PropTypes from 'prop-types';
import './stylesheet.scss';
import Paginate from 'antd/lib/pagination';
import { t1, t4 } from 'translate';
import { getLanguage } from 'utils/selectors';
import { connect } from 'react-redux';
import LocaleProvider from 'antd/lib/locale-provider';
import vi_VN from 'antd/lib/locale-provider/vi_VN';
import en_US from 'antd/lib/locale-provider/en_US';
import ja_JP from 'antd/lib/locale-provider/ja_JP';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPageNumber: 1,
      startAtPage: 1,
      value: 1,
      itemPerPage: 10,
    };
  }

  componentDidMount() {
    this.calculatePageTotal(this.props);
    let { total, itemPerPage, onPageChange } = this.props;
    /** TODO:
     *  src/components/front-end/homepage/evn/courses/categoriesCourseWrapper/categoriesCourse/CategoriesCoursesList.js:12
     *  số trang không phải dạng số nên cần chuyển đổi
     * */
    if (typeof itemPerPage !== 'object') {
      this.onChangePage(this.state.currentPageNumber, itemPerPage || 10);
    } else {
      this.onChangePage(
        this.state.currentPageNumber,
        parseInt(itemPerPage) || 10,
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.total !== nextProps.total) {
      this.calculatePageTotal(nextProps);
      let { currentPageNumber, iPerPage } = this.state;
      this.onChangePage(currentPageNumber, iPerPage || 10);
    }
  }

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

  onShowSizeChange = (current, pageSize) => {
    this.onChangePage(current, pageSize);
  };

  showTotalItem = (total, range) => (
    <span>
      {`${t1('display')} ${range[0]}-${range[1]} ${t4('total')}`}{' '}
      <strong>{total}</strong>
    </span>
  );

  onChangePage = (page, pageSize) => {
    const { onPageChange } = this.props;
    if (onPageChange) {
      this.setState({
        currentPageNumber: page,
        iPerPage: pageSize,
      });
      onPageChange(page, pageSize);
    }
  };

  render() {
    const { currentPageNumber, iPerPage } = this.state;

    const {
      showExtraControl,
      total,
      onlyShowIfTotalBigEnough,
      language,
      isFeatureEnabled,
      theme,
      className,
    } = this.props;
    let { itemPerPage, position } = this.props;
    itemPerPage = itemPerPage || [10, 20, 50, 100];

    if (onlyShowIfTotalBigEnough && total <= itemPerPage[0]) {
      return null;
    }

    const pageSize = iPerPage || itemPerPage[0] || 10;

    position = position || 'right';
    let positionClass = '';
    let divFlexStyle = '';
    switch (position) {
      case 'right': {
        positionClass = 'pull-right';
        divFlexStyle = 'flex-end';
        break;
      }
      case 'left': {
        positionClass = 'pull-left';
        divFlexStyle = 'flex-start';
        break;
      }
      case 'center':
      default: {
        positionClass = 'text-center';
        divFlexStyle = 'center';
      }
    }
    let isShowExtraControl = {};
    let paginateProp = {
      defaultCurrent: 1,
      current: currentPageNumber,
      total: total,
      pageSize,
      onChange: this.onChangePage,
    };
    if (showExtraControl) {
      isShowExtraControl = {
        showTitle: true,
        showTotal: this.showTotalItem,
        pageSizeOptions: itemPerPage,
        showSizeChanger: true,
        showQuickJumper: true,
        onShowSizeChange: this.onShowSizeChange,
      };
    }
    let localLanguage = en_US;
    switch (language) {
      case 'vn':
        localLanguage = vi_VN;
        break;
      case 'jp':
        localLanguage = ja_JP;
        break;
    }

    if (isFeatureEnabled(features.NEW_UI_JULY_2019)) {
      paginateProp = {
        ...paginateProp,
        className: `text-primary theme-${
          theme === 'light' ? 'light' : 'dark'
        } ${className}`,
      };
    }
    return (
      <div
        className="d-flex"
        style={{ justifyContent: divFlexStyle, clear: 'both' }}
      >
        <div className={`${positionClass} m-t-10`} style={{ clear: 'both' }}>
          <LocaleProvider locale={localLanguage}>
            <Paginate {...paginateProp} {...isShowExtraControl} />
          </LocaleProvider>
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  itemPerPage: PropTypes.arrayOf(PropTypes.number),
  onlyShowIfTotalBigEnough: PropTypes.bool,
  position: PropTypes.string,
  showExtraControl: PropTypes.bool,
  language: PropTypes.string,
};

Pagination.defaultProps = {
  itemPerPage: null,
  onlyShowIfTotalBigEnough: true,
  position: '',
  showExtraControl: true,
  language: 'en',
};

const mapStateToProp = (state) => ({
  language: getLanguage(state),
});

export default connect(mapStateToProp)(withFeatureFlags()(Pagination));
