import React, { Component } from 'react';
import { t1 } from 'translate';
import IconHelp from 'components/common/Icon/Help';
import DetailOnDialog from 'components/common/detail-on-dialog/index';

const dialogOptionsProperties = {
  width: '60%',
  handleClose: true,
  minHeight: '300px',
};

class ProgressExplanationIcon extends Component {
  render() {
    return (
      <DetailOnDialog
        dialogKey={'course-progress-explanation'}
        renderPreview={({ showFull }) => (
          <span
            onClick={showFull}
            title={t1('help')}
            className="cursor-pointer"
          >
            <IconHelp />
          </span>
        )}
        renderFull={({ closeDialog }) => (
          <div>
            <h1>{t1('course_progress_explanation')}</h1>
            <div>
              {t1(
                'course_progress_is_the_percent_of_how_many_items_you_have_completed_watching_or_practicing',
              )}
            </div>
            <div>
              {t1(
                'it_does_not_matter_which_score_you_got_for_practice_exercises',
              )}
            </div>
          </div>
        )}
        dialogOptionsProperties={dialogOptionsProperties}
      />
    );
  }
}

export default ProgressExplanationIcon;
