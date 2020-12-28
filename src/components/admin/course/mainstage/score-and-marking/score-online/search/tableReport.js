/**
 * Created by hungvo on 06/09/17.
 */
import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import PrimaryButton from 'components/common/primary-button';
import { t1 } from 'translate';
import Perm from 'common/utils/Perm';
import sagaActions from 'actions/saga-creators';
import sagaNodeActions from 'actions/node/saga-creators';
import apiUrls from 'api-endpoints';
import { ntype as ntypeDefine } from 'configs/constants';
import {
  getKeyStateInfoTheTest,
  getKeyStateNodeReport,
} from '../utils/keyState';
import {
  filterTreeDataByWhiteList,
  filterTreeDataDrawTabelHeader,
  formatTreeDataDrawTabelHeader,
  getNtypeConfigFilter,
} from './util';
import Content from './tableReportContent';
import lodashGet from 'lodash.get';
import Icon from 'components/common/Icon';
import Loading from 'components/common/loading';

const defaultCheckedNtypes = [
  'path',
  'course',
  'sco',
  'exercise',
  'exam',
  'question',
  'video',
];

class Report extends React.Component {
  style = { paddingTop: 200, textAlign: 'center' };
  spanStyle = { display: 'inline-flex' };

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      dataHeader: null,
      ntypes: defaultCheckedNtypes,
      nodeEditer: false,
      syncProgress: false,
      columnData: [],
    };
  }

  componentWillMount() {
    const modules = this.props.modules || [];
    const node = this.props.node;
    let ntypes = this.props.courseItemsFilters || defaultCheckedNtypes;

    ntypes = ntypes.filter((ntype) => modules.includes(ntype));

    this.setState({
      ntypes,
      nodeEditer: Perm.nodeEditer(node),
    });
    this.fetchNodeDetail(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const node = this.props.node || {};
    const infoTheTests = this.props.infoTheTests;
    if (!nextProps || !nextProps.node || !nextProps.node.iid) {
      return;
    }
    if (
      nextProps &&
      nextProps.node &&
      nextProps.node.iid &&
      nextProps.node.iid !== node.iid
    ) {
      this.fetchNodeDetail(nextProps);
      return;
    }
    if (
      nextProps &&
      nextProps.treeData &&
      (this.state.loading ||
        this.state.dataHeader ||
        (nextProps.infoTheTests && !infoTheTests))
    ) {
      this.setTreeDataReportViewer(nextProps);
    }
  }

  fetchNodeDetail = (props) => {
    const { node, dispatch, treeData } = props;

    let params;
    let url;

    if (!treeData) {
      params = {
        iid: node.ntype === ntypeDefine.COURSE ? node.syllabus : node.iid,
        ntype:
          node.ntype === ntypeDefine.COURSE ? ntypeDefine.SYLLABUS : node.ntype,
        depth: -1,
        editing_syllabus: 2,
      };
      url = apiUrls.get_snippet;
      dispatch(
        sagaNodeActions.getDataRequest(
          { url, keyState: getKeyStateNodeReport(node), post: true },
          params,
        ),
      );
    }

    if (node.ntype === ntypeDefine.COURSE) {
      params = {
        courseIid: node.iid,
        syllabusIid: node.syllabus,
      };
      url = apiUrls.get_info_on_the_tests;
      dispatch(
        sagaNodeActions.getDataRequest(
          { url, keyState: getKeyStateInfoTheTest(node) },
          params,
        ),
      );
    }
  };

  setTreeDataReportViewer = (props, ntypes) => {
    const data = props.treeData;
    const node = props.node;
    const { filterOutHeaderIfPossible } = props;
    const infoTheTests = props.infoTheTests || {};

    const children = data && data.children;
    const { treeData, rowSpan } = filterTreeDataDrawTabelHeader(
      node,
      children,
      ntypes || this.state.ntypes,
      1,
      infoTheTests,
    );
    this.setState({
      columnData: treeData,
    });
    const dataFormat = formatTreeDataDrawTabelHeader(
      treeData,
      rowSpan,
      filterOutHeaderIfPossible,
    );
    this.setState({
      ...dataFormat,
      rowSpan,
      loading: false,
    });
  };

  handleUpdateFilter = (isChecked, value) => {
    let ntypes = this.state.ntypes;
    if (isChecked) {
      ntypes.push(value);
    } else {
      ntypes = ntypes.filter((ntype) => ntype !== value);
    }

    this.setState({
      ntypes,
    });

    this.setTreeDataReportViewer(this.props, ntypes);
  };

  exportGradebook = () => {
    const { dispatch, formValues } = this.props;
    const ntypes = this.state.ntypes;
    const exportUrl = '/report/api/export-gradebook';
    dispatch(
      sagaActions.exportDataRequest(exportUrl, {
        ...formValues,
        page: 1,
        items_per_page: -1,
        ntypes,
      }),
    );
  };

  // exportStudentByCourseResult = () => {
  //   const {dispatch, formValues} = this.props;
  //   const exportUrl = apiUrls.export_students_by_course_ums;
  //   dispatch(sagaActions.exportDataRequest(exportUrl, {...formValues}));
  // };

  render() {
    const {
      dataHeader,
      keyDisplay,
      ntypes,
      nodeEditer,
      syncProgress,
      columnData,
    } = this.state;
    const {
      node,
      modules,
      groupDetails,
      total,
      notShowExport,
      notShowReportName,
      noExam,
    } = this.props;

    if (!dataHeader) {
      return <Loading />;
    }

    const ntypeConfigs = getNtypeConfigFilter(node, ntypes, modules, noExam);
    let nameReport = '';
    groupDetails.forEach((group) => {
      nameReport = `${nameReport} ${group.name}`;
    });

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            {/*
            <span style={this.spanStyle} className="pull-right">
              {ntypeConfigs.map((conf) => (
                <Checkbox
                  style={this.spanStyle}
                  key={`ntype-filter-${conf.value}`}
                  label={conf.label}
                  checked={ntypes.includes(conf.value)}
                  onCheck={(event, isChecked) =>
                    this.handleUpdateFilter(isChecked, conf.value)
                  }
                />
              ))}
            </span>

               */}
            {total && !notShowExport ? (
              [
                <span>
                  <PrimaryButton
                    label={t1('export')}
                    primary
                    icon={<Icon icon="export" />}
                    labelPosition="before"
                    onClick={() => this.exportGradebook()}
                  />
                </span>,
              ]
            ) : (
              <span />
            )}
          </div>
        </div>
        <Content
          {...this.props}
          keyDisplay={keyDisplay}
          nodeEditer={nodeEditer}
          dataHeader={dataHeader}
          className="col-md-12"
          syncProgress={syncProgress}
          columnData={columnData}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const node = props.node || {};
  const keyState = getKeyStateNodeReport(node);
  const groups = props.groups;
  const groupDetails = [];
  const nodes = state.tree;
  if (groups && groups.length) {
    groups.forEach((group) => {
      if (nodes && nodes[group]) {
        groupDetails.push(nodes[group]);
      }
    });
  }

  let modules = lodashGet(state, 'domainInfo.school.modules');

  if (props.modulesToShow) {
    modules = props.modulesToShow.filter(
      (module) => modules && modules.includes(module),
    );
  }

  let treeData = state.dataApiResults[keyState];
  const { whiteListItemsToShow } = props;
  if (whiteListItemsToShow) {
    treeData = filterTreeDataByWhiteList(treeData, whiteListItemsToShow);
  }

  return {
    treeData,
    groupDetails,
    infoTheTests: state.dataApiResults[getKeyStateInfoTheTest(node)],
    modules,
    // courseItemsFilters: lodashGet(state, 'domain.school')
  };
};

export default connect(mapStateToProps)(Report);
