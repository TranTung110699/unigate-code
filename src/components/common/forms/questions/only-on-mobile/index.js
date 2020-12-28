import React from 'react';
import DownloadMobileApp from 'components/common/download-mobile-app';
import { t1 } from 'translate';
import Warning from 'components/common/Warning';

const OnlyOnMobileQuestion = () => {
  return (
    <div
      style={{
        paddingTop: 50,
      }}
    >
      <DownloadMobileApp
        title={
          <Warning>
            <div>{t1('this_question_is_not_supported_in_the_website')}</div>
            <div>{t1('you_need_to_download_the_mobile_app')}</div>
          </Warning>
        }
      />
    </div>
  );
};

export default OnlyOnMobileQuestion;
