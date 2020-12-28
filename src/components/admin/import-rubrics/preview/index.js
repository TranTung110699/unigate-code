import React, { Component } from 'react';
import { scoreScaleTypes } from 'configs/constants';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper/index';
import fetchData from 'components/common/fetchData';
import Loading from 'components/common/loading';
import SearchWrapper from 'components/common/search-wrap-v2/SearchWrapper';
import apiUrls from 'api-endpoints';
import results from './DefaultResults';
import resultsByRubrics from './ResultsByRubrics';
import schema from './schema';

class Preview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: null,
    };
  }

  paperStyle = {
    padding: 20,
  };

  renderPreviewComponent = (items) => {
    this.setState({ items });
  };

  render() {
    const { info, confirmImport, importId } = this.props;

    if (!info) {
      return <Loading />;
    }

    const {
      report,
      course,
      subject,
      semester,
      rubrics,
      extra_info,
      headerRowSpan,
    } = info;
    const { score_scale, type } = extra_info || {};

    return (
      <div>
        {report && (
          <Paper zDepth={1} style={this.paperStyle} className="col-md-12">
            <h3>
              {subject && subject.name && `${t1('subject')}: ${subject.name}`}
              {semester &&
                semester.name &&
                ` - ${t1('semester')}: ${semester.name}`}
              {course && course.name && ` - ${t1('course')}: ${course.name}`}
            </h3>
            {report.error === 0 ? (
              <h4>
                Thông tin trong file đã hợp lệ. Bạn nhấn vào nút{' '}
                {t1('confirm_import')} để hoàn tất quá trình import.
              </h4>
            ) : (
              <h4>
                Thông tin trong file chưa hợp lệ . Bạn cần sửa và upload lại
                file.
              </h4>
            )}

            <ul>
              <li>Tổng số dòng upload: {report.count}</li>
              {report.error > 0 && <li>Tổng số lỗi sai: {report.error}</li>}
            </ul>
            <div className="text-center col-md-12">
              {report.error === 0 && info.status === 'check' && confirmImport}
            </div>
          </Paper>
        )}
        <SearchWrapper
          schema={schema}
          hiddenFields={{
            import_id: importId,
          }}
          showResult
          formid="search_take_tmpl"
          renderResultsComponent={this.renderPreviewComponent}
          alternativeApi={apiUrls.import_rubrics_request_search}
        />
        {Array.isArray(this.state.items) && type === 'by_rubrics'
          ? resultsByRubrics({
              items: this.state.items,
              rubrics,
            })
          : results({
              items: this.state.items,
              rubrics,
              headerRowSpan:
                score_scale === scoreScaleTypes.pmd ? headerRowSpan + 1 : 2,
              scoreScale: score_scale,
            })}
      </div>
    );
  }
}

export default fetchData((props) => ({
  baseUrl: 'import/index/get-detail',
  params: {
    id: props && props.importId,
  },
  propKey: 'info',
  fetchCondition: props.importId,
  refetchCondition: (prevProps) =>
    (props.importId && props.importId !== prevProps.importId) ||
    props.updateView !== prevProps.updateView,
}))(Preview);
