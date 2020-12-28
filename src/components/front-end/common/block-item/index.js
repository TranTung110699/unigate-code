import { layouts } from 'configs/constants';
import React from 'react';
import withSchoolConfigs from 'common/hoc/withSchoolConfigs';
import lodashGet from 'lodash.get';
import CourseItem from './LayoutStandard';
import CourseItemXpeak from './LayoutXpeak';
// import CourseItemEtec from './LayoutEtec';
// import Truncate from 'react-truncate';

/**
 * This is currently used for both course in grid and enrolment plan in grid
 * Thats why it's in common/block-item
 */
const Item = ({
  layout,
  overviewLink = '#',
  title,
  duration,
  shortDescription,
  showDescription,
  avatar,
  disableLink,
  rejected,
  isPublic,
  subTitle,
  subTitleLinkUrl,
  description,
  progress,
  showProgress,
  showDeadline,
  showAction,
  deadline,
  action,
  bgColor,
  shortTitle,
  displayIcon,
  tagsInfo,
  fallbackAvatar,
  mindmapLink,
  item,
}) => {
  // if (layout === layouts.ETEC) {
  //   return (
  //     <CourseItemEtec
  //       overviewLink={overviewLink}
  //       title={title}
  //       duration={duration}
  //       shortDescription={shortDescription}
  //       showDescription={showDescription}
  //       avatar={avatar}
  //       disableLink={disableLink}
  //       fallbackAvatar={fallbackAvatar}
  //     />
  //   );
  // }
  if (layout === layouts.XPEAK) {
    return (
      <div>
        <CourseItemXpeak
          disableLink={disableLink}
          overviewLink={overviewLink}
          bgColor={bgColor}
          avatar={avatar}
          shortTitle={shortTitle}
          shortDescription={shortDescription}
          progress={progress}
          title={title}
          displayIcon={displayIcon}
          fallbackAvatar={fallbackAvatar}
        />
      </div>
    );
  }

  return (
    <div>
      <CourseItem
        rejected={rejected}
        overviewLink={overviewLink}
        avatar={avatar}
        title={title}
        isPublic={isPublic}
        subTitle={subTitle}
        subTitleLinkUrl={subTitleLinkUrl}
        showDescription={showDescription}
        description={description}
        progress={progress}
        showProgress={showProgress}
        showDeadline={showDeadline}
        showAction={showAction}
        deadline={deadline}
        action={action}
        disableLink={disableLink}
        tagsInfo={tagsInfo}
        fallbackAvatar={fallbackAvatar}
        mindmapLink={mindmapLink}
        item={item}
      />
    </div>
  );
};

export default withSchoolConfigs(Item, (globalConfigs) => ({
  layout: lodashGet(globalConfigs, 'layout'),
}));
