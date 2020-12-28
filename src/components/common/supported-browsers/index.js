import React from 'react';
import withDetectSupportedBrowser from './withDetectSupportedBrowser';
import { t1 } from 'translate';
import withGlobalDialogs from 'components/common/modal/withGlobalDialogs';
import Button from 'antd/lib/button';
import Icon from 'components/common/Icon';
import DisplayHtml from 'components/common/html';
import './stylesheet.scss';

const Alert = ({ supportedBrowsers, onContinueButtonClick }) => {
  const cssClass = 'not-supported-browser-alert';

  return (
    <div className={cssClass}>
      <div className={`${cssClass}__icon-wrapper`}>
        <Icon className={`${cssClass}__icon`} icon="alert" />
      </div>
      <div className={`${cssClass}__message-wrapper`}>
        <div className={`${cssClass}__message`}>
          <div>{t1('your_browser_version_is_not_supported')}</div>
          <div>
            {t1('some_functions_might_be_broken_or_missing_on_this_browser')}
          </div>
        </div>
        <div className={`${cssClass}__suggestion-wrapper`}>
          <div>{t1('you_should_use_one_of_the_following_browsers')}</div>
          <ul>
            {(supportedBrowsers || []).filter(Boolean).map((elem) => {
              const { summary, download_link } = elem;
              return (
                <li className={`${cssClass}__suggestion`}>
                  <DisplayHtml
                    className={`${cssClass}__suggestion-summary`}
                    content={summary}
                  />
                  {download_link && (
                    <a
                      className={`${cssClass}__suggestion-download-link`}
                      href={download_link}
                    >
                      <Button
                        icon="download"
                        size="small"
                        onClick={onContinueButtonClick}
                      >
                        ({t1('click_here_to_download')})
                      </Button>
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className={`${cssClass}__action-wrapper`}>
        <Button
          className={`${cssClass}__action-button`}
          type="danger"
          onClick={onContinueButtonClick}
        >
          {t1('i_still_want_to_use_this_browser_despite_all_the_risk')}
        </Button>
      </div>
    </div>
  );
};

const SupportedBrowser = ({
  isBrowserSupported,
  supportedBrowsers,
  openDialog,
  closeDialog,
}) => {
  const dialogKey = 'browser_not_supported';

  const handleContinueButtonClick = React.useCallback(
    () => {
      closeDialog(dialogKey);
    },
    [closeDialog],
  );

  React.useEffect(
    () => {
      if (isBrowserSupported === false) {
        openDialog(dialogKey, {
          contentDialog: (
            <Alert
              supportedBrowsers={supportedBrowsers}
              onContinueButtonClick={handleContinueButtonClick}
            />
          ),
          modal: true,
        });
      }
    },
    [
      isBrowserSupported,
      openDialog,
      supportedBrowsers,
      handleContinueButtonClick,
    ],
  );

  return null;
};

export default withDetectSupportedBrowser()(
  withGlobalDialogs()(SupportedBrowser),
);
