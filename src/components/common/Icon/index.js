import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'components/common/mui/FlatButton';
import AntIcon from 'antd/lib/icon';

import './icon-styles.scss';

// https://material.io/icons/
const MUIMapping = {
  // 'video-pdf': 'picture-as-pdf',
  // 'file-pdf': 'picture-as-pdf',
  'exercise-': 'star',
  'exercise-dictation': 'speaker-phone',
  'exercise-exam': 'alarm-on',
  'exercise-required': 'star',
  'exercise-roleplay': 'mic-none',
  'exercise-applied': 'assignment',
  'vocabset-roleplay': 'mic-none',
  'fullscreen-exit': 'fullscreen-exit',
  'input-file': 'input-file',
  'navigate-before': 'navigate-before',
  'navigate-next': 'navigate-next',
  'question-': 'check',
  'question-12': 'device-hub',
  'question-9': 'file-upload',
  'sco-exam': 'alarm-on',
  'sco-news': 'view-headline',
  'sco-scorm': 'work',
  'sco-group_assignment': 'create',
  'sco-song': 'queue-music',
  'sco-standard': 'folder',
  'settings-applications': 'settings-applications',
  'video-audio': 'audiotrack',
  'video-image': 'image',
  'exit-to-app': 'exit-to-app',
  add: 'add',
  attachment: 'attachment',
  back: 'arrow-back',
  book: 'book',
  certificate: 'turned-in-not',
  check: 'check',
  clock: 'alarm-on',
  close: 'close',
  exercise: 'star',
  fullscreen: 'fullscreen',
  image: 'image',
  lock: 'lock-outline',
  mic: 'mic',
  next: 'keyboard-arrow-right',
  ok: 'check',
  email: 'email',
  notifications: 'notifications',
  person: 'person',
  import_export: 'import_export',
  play_arrow: 'play-arrow',
  previous: 'keyboard-arrow-left',
  question: 'check',
  rotateLeft: 'rotate-left',
  rotateRight: 'rotate-right',
  sco: 'folder',
  search: 'search',
  submit: 'send',
  syllabus: 'library-books',
  video: 'videocam',
  vocab: 'check',
  vocabset: 'book',
  keyboard_arrow_down: 'keyboard-arrow-down',
  cancel: 'cancel',
  keyboard_arrow_right: 'keyboard-arrow-right',
  not_expandable: 'remove',
  academic: 'school',
  question_correct: 'check',
  question_wrong: 'close',
  group: 'group',
  group_add: 'group-add',
  fileUpload: 'file-upload',
  fileDownload: 'cloud-download',
  export: 'file-upload',
  live_help: 'live-help',
  check_plagiarism: 'youtube-searched-for',
  plagiarism: 'check-circle',
  not_plagiarism: 'highlight-off',
  language: 'language',
  report: 'assignment',
  add_shopping_cart: 'add-shopping-cart',
  shopping_cart: 'shopping-cart',
  remove_shopping_cart: 'remove-shopping-cart',
  'my-location': 'my-location',
  competition: 'school',
  menu: 'menu',
  'option-menu': 'more-vert',
  request: 'library-books',
  retry: 'cached',
  exam_round: 'cached',
};

// https://themify.me/themify-icons
const ThemifyMapping = {
  upload: 'upload',
  'ti-folder': 'folder',
  equivalent: 'layout-column4',
  'video-video': 'control-play',
  clock: 'alarm-clock',
  sequential: 'link',
  edit: 'pencil',
  exam: 'cup',
  exam_doing: 'pencil-alt',
  exam_violate: 'alert',
  warning: 'alert',
  alert: 'alert',
  exercise: 'check-box',
  invite: 'rocket',
  mention: 'info-alt',
  plus: 'plus',
  reply: 'share-alt',
  mark_score: 'check',
  publish_score: 'eye',
  minus: 'minus',
  import: 'import',
  preview: 'eye',
  result: 'cup',
  search: 'search',
  start_exam: 'pencil-alt',
  time: 'time',
  timer: 'timer',
  user: 'user',
  video: 'control-play',
  'video-image': 'image',
  vocabset: 'bookmark',
  admin: 'settings',
  autorenew: 'reload',
  'sco-standard': 'folder',
  'sco-exam': 'alarm-clock',
  'exercise-exam': 'alarm-clock',
  'sco-exam-by-template': 'layers-alt',
  'sco-news': 'menu',
  'sco-scorm': 'package',
  'sco-group_assignment': 'pencil',
  'sco-song': 'music-alt',
  sco: 'folder',
  // 'video-pdf': 'file-pdf-o',
  // 'video-ppt': 'file-image-o',
  course: 'receipt',
  'video-text': 'align-left',
  move: 'move',
  'angle-right': 'angle-right',
  path: 'list',
  sync: 'exchange-vertical',
  generate: 'reload',
  settings: 'settings',
  'path-program': 'list',
  'path-path': 'list',
  'path-specialization-program': 'briefcase',
  'path-program-module': 'briefcase',
  syllabus: 'book',
  'syllabus-syllabus': 'book',
  'syllabus-credit': 'book',
  credit: 'star',
  rate: 'star',
  clear: 'close',
  'next-question': 'arrow-right',
  'previous-question': 'arrow-left',
  skill: 'cup',
  add_rubric_learning_items: 'pencil-alt',
  angle_right: 'angle-right',
  angle_down: 'angle-down',
  angle_left: 'angle-left',
  angle_up: 'angle-up',
  assign_in_organization: 'flag',
  flag: 'flag',
  link: 'link',
  lock_path: 'lock',
  unlock_path: 'unlock',
  'control-pause': 'control-pause',
  cup: 'cup',
  na: 'na',
  world: 'world',
  vector: 'vector',
  shine: 'shine',
  package: 'package',
  'bookmark-alt': 'bookmark-alt',
  'light-bulb': 'light-bulb',
  zm: 'layout-grid3',
  finalize_score: 'lock',
  comment: 'comment',
  role: 'settings',
  timetable: 'calendar',
  clone: 'layers-alt',
  help: 'help',
  close: 'close',
  avatar: 'image',
  support: 'support',
  unlink: 'unlink',
  pulse: 'pulse',
  horizontal: 'arrows-horizontal',
  survey: 'comment-alt',
  view: 'eye',
  detach: 'unlink',
  attach: 'link',
  dashboard: 'dashboard',
  crown: 'crown',
  upcoming_contest: 'check-box',
  in_progess: 'control-play',
  introduction_question: 'info',
  note: 'notepad',
  location: 'location-pin',
  direction: 'direction',
  play: 'control-play',
  pause: 'control-pause',
  share: 'share',
  layoutGrid: 'layout-grid3',
  write: 'write',
  download: 'download',
  reload: 'reload',
  attendance: 'layout',
  vimeo: 'vimeo',
  youtube: 'youtube',
  list: 'list',
};
const AntIconMapping = {
  folder: 'folder',
  folder_open: 'folder-open',
  'video-pdf': 'file-pdf',
  'file-pdf': 'file-pdf',
  delete: 'delete',
  remove: 'delete',
};

class Icon extends Component {
  render() {
    const {
      className,
      flatButtonStyle,
      antIcon,
      themify,
      ...props
    } = this.props;
    let { icon } = this.props;
    // icon = icon || 'ok';

    let i;
    if (antIcon) {
      if (AntIconMapping[icon]) {
        return (
          <AntIcon
            type={AntIconMapping[icon]}
            {...props}
            className={className}
          />
        );
      } else {
        return <AntIcon type={icon} {...props} className={className} />;
      }
    } else if (themify) {
      // raw themify icon
      i = <i {...props} className={`icon ti ti-${icon} ${className}`} />;
    } else if (ThemifyMapping[icon]) {
      icon = ThemifyMapping[icon];
      i = <i {...props} className={`icon ti ti-${icon} ${className}`} />;
    } else if (MUIMapping[icon]) {
      icon = MUIMapping[icon];
      i = <i {...props} className={`mi mi-${icon} ${className}`} />;
    } else if (AntIconMapping[icon]) {
      return (
        <AntIcon className={className} type={AntIconMapping[icon]} {...props} />
      );
    } else {
      return null;
    }

    if (this.props.flatButton) {
      return <FlatButton icon={i} style={flatButtonStyle} />;
    }
    if (this.props.button)
      return (
        <IconButton {...props} className={className}>
          {i}
        </IconButton>
      );

    return i;
  }
}

export default Icon;
