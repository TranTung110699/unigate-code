import Loadable from 'react-loadable';
import Loading from 'components/common/loading';

const PhilosophyLayout = Loadable({
  loader: () => import('components/front-end/apps/xpeak/philosophy/Layout'),
  loading: Loading,
});

export default () => [
  {
    componentId: 'PhilosophiesForgotToPronounce',
    path: '/philosophies/forgot-to-pronounce-the-last-consonant',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesSolution',
    path: '/philosophies/solutions',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesFrequentlyAskedQuestion',
    path: '/philosophies/frequently-asked-questions',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesSymptom',
    path: '/philosophies/symptoms',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesHabit',
    path: '/philosophies/habits',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesEnvironment',
    path: '/philosophies/environments',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesPractice',
    path: '/philosophies/practices',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'PhilosophiesSpeakingEnglishFast',
    path: '/philosophies/speaking-english-fasts',
    component: PhilosophyLayout,
    exact: true,
  },
  {
    componentId: 'Philosophies',
    path: '/philosophies/',
    component: PhilosophyLayout,
    exact: true,
  },
];
