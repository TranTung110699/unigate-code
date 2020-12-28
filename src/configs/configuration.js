/**
 * Created by Peter Hoang Nguyen on 3/28/2017.
 */
const mediaRoot = '/media/';
export const CoverConfig = {
  learnIndex: `${mediaRoot}images/demo-cover.jpg`,
  appleBadge: `${mediaRoot}/images/App_Store_Badge_US.svg`,
  googleBadge: `${mediaRoot}/images/google-play-badge.png`,
};
const getLearningPaths = [
  {
    iid: 55229,
    name: 'Ngữ âm',
    cover: `${mediaRoot}images/nguam.png`,
  },
  {
    iid: 55230,
    name: 'Giao tiếp',
    displayIcon: true,
    cover: `${mediaRoot}images/giaotiep.png`,
  },
  {
    iid: null,
    name: 'Xpeak +',
    cover: `${mediaRoot}images/xpeakplus.png`,
    children: [
      {
        iid: 60145,
        name: 'TOEIC',
        displayIcon: true,
        cover: `${mediaRoot}images/demo-cover.jpg`,
      },
      {
        iid: 56036,
        name: 'Từ vựng',
        displayIcon: true,
        cover: `${mediaRoot}images/demo-cover.jpg`,
      },
      {
        iid: 56385,
        name: 'Tiếng anh cho Trẻ Em',
        displayIcon: true,
        cover: `${mediaRoot}images/demo-cover.jpg`,
      },
    ],
  },
];

const getLearningPathConfigById = (iid, learningPaths) => {
  let result;
  for (let i = 0; i < learningPaths.length; i++) {
    if (learningPaths[i].iid === parseInt(iid)) {
      result = learningPaths[i];
      break;
    }
    if (learningPaths[i].children) {
      result = getLearningPathConfigById(iid, learningPaths[i].children);
    }
  }

  return result;
};

const Configuration = {
  autoDetectMissingMessage: true,
  learningPaths: getLearningPaths,
  getLearningPathConfigById,

  media: {
    img: {
      path: `${mediaRoot}images`,
    },
  },
  defaultLogo: `${mediaRoot}images/default/lotus.png`,
};

export default Configuration;
