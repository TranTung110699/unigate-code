import React from 'react';
import { t, t1, t2, t3 } from 'translate';
import { Link } from 'react-router-dom';
import './stylesheet.scss';

/**
 * Created by Peter Hoang Nguyen
 * Email: vntopmas@gmail.com
 * Tel: 0966298666
 * created date 06/04/2017
 **/
class TopMenuApp extends React.Component {
  render() {
    const {} = this.props;
    return (
      <div className="ui-page-footer clearfix">
        <div className="screen-viewer">
          <div className="pull-left ">
            <span className="hint-text">{t1('copyright_©_2014')} </span>
            {t3('vieted')}.
            <span className="hint-text"> {t1('all_rights_reserved')}. </span>
            <Link to="terms">{t1('terms_of_use')}</Link> |{' '}
            <Link to="policy">{t2('Privacy Policy')}</Link>
          </div>
          <div className="pull-right">
            <Link to="/">{t('lotus_lms')}</Link>
            <span className="hint-text"> {t('&_Made_with_Love ®')} </span>
          </div>
        </div>
      </div>
    );
  }
}

export default TopMenuApp;
