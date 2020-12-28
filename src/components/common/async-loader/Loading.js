import React from 'react';
import Loading from 'components/common/loading';
import { t1 } from 'translate';
import Icon from 'components/common/Icon';
import AntdButton from 'antd/lib/button';
import './Loading.scss';

const ReactLoadableLoading = ({ error, retry, timedOut, pastDelay }) => {
  const cssClass = 'async-loader';

  return (
    <div className={cssClass}>
      {(() => {
        if (error) {
          return (
            <div className={`${cssClass}__error`}>
              {t1(
                'due_to_some_problems_with_the_network,_we_cannot_load_this_component_of_the_website',
              )}{' '}
              <AntdButton
                type="primary"
                ghost
                className={`${cssClass}__retry-button`}
                onClick={retry}
              >
                {t1('click_here_to_reload')}
                <Icon icon="reload" />
              </AntdButton>
            </div>
          );
        } else if (timedOut) {
          return (
            <div className={`${cssClass}__time-out`}>
              Taking a long time... <button onClick={retry}>Retry</button>
            </div>
          );
        } else if (pastDelay) {
          return <Loading className={`${cssClass}__loading`} />;
        } else {
          return null;
        }
      })()}
    </div>
  );
};

export default ReactLoadableLoading;
