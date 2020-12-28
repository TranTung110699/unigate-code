import Loadable from 'components/common/async-loader/Loadable';

const RadarChart = Loadable({
  loader: () =>
    import(/* webpackChunkName: "RadarChartComponent" */ './RadarChartComponent'),
});

export default RadarChart;
