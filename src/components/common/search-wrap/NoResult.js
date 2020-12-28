import React, { Component } from 'react';
import { t1 } from 'translate';
import Empty from 'antd/lib/empty';
import withFeatureFlags from 'feature-flag/withFeatureFlags';
import features from 'feature-flag/features';
import EmptyImage from './time-empty.png';

class NoResults extends Component {
  render() {
    const style = { color: 'red' };
    const { text, image, isFeatureEnabled, noResultTextMultiLine } = this.props;
    return (
      <div>
        {!isFeatureEnabled(features.NEW_UI_JULY_2019) ? (
          <div style={style}>{text || t1('no_results_found')}</div>
        ) : (
          <Empty
            className="m-t-50 text-white"
            image={image || EmptyImage}
            description={
              noResultTextMultiLine ? (
                <div className="m-t-10 no-result-description mix-blend-difference">
                  <span>
                    {`${t1("we_couldn't_find_any_result")}. ${t1(
                      'please_make_sure_and_consider',
                    )}`}
                  </span>
                  <div className="d-flex justify-content-center">
                    <div className="text-left m-t-20">
                      <p>- {t1('having_no_typo')}</p>
                      <p>- {t1('trying_another_keyword(s)')}</p>
                      <p>- {t1('trying_another_more_general_keywords')}</p>
                      <p>- {t1('using_less_searching_conditions')}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mix-blend-difference">
                  {text || t1('no_results_found')}
                </div>
              )
            }
          />
        )}
      </div>
    );
  }
}

export default withFeatureFlags()(NoResults);
