import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import { t1 } from 'translate';
import Marking from 'components/admin/course/mainstage/score-and-marking/score-online/common/marking';
import { timestampToDateString } from 'common/utils/Date';
import Icon from 'components/common/Icon/index';
import FlatButton from 'components/common/mui/NewButton';
import get from 'lodash.get';
import { connect } from 'react-redux';
import InfoRubric from 'components/common/rubric/common/info/InfoRubric';
import isEqual from 'lodash.isequal';
import { setScore } from './common/util';
import Note from './common/Note';
import './stylesheet.scss';

const width = {
  rubric_name: '30%',
  score: '30%',
  note: '40%',
};

/**
 * Chỉ support 1 level
 */
class SubRubric extends React.Component {
  static propTypes = {
    user: PropTypes.shape().isRequired,
    scoreScale: PropTypes.shape().isRequired,
    rubric: PropTypes.shape().isRequired,
  };

  static defaultProps = {
    user: null,
    scoreScale: null,
    rubrics: null,
  };

  constructor(props) {
    super(props);
    this.state = { score: {} };
  }

  componentWillMount() {
    this.initScore(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.progress, this.props.progress)) {
      this.initScore(nextProps);
    }
  }

  initScore = (props) => {
    const { rubric, progress, scoreScale } = props;
    if (!rubric) return;

    const score = {};
    const children = get(rubric, 'children', []);
    children.map((item) => {
      setScore(score, item, get(progress, `[${item.iid}].p_original`));
      setScore(score, item, get(progress, `[${item.iid}].comment`), 'comment');
      setScore(score, item, scoreScale, 'score_scale');
    });
    this.setState({
      score,
    });
  };

  handleMarking = () => {
    const { onMarking } = this.props;
    const { score } = this.state;
    onMarking(score);
  };

  checkEnableSubmit = () => {
    const { score } = this.state;
    const { rubric } = this.props;
    return Object.keys(score).length === get(rubric, 'children.length');
  };

  makeKeyRowTable = (iid, index) => iid || index;

  render() {
    const { rubric, scoreScale, user, progress, anythingValue } = this.props;
    if (!rubric || !rubric.children) {
      return <div>{t1('rubric_is_empty')}</div>;
    }
    const { score } = this.state;
    return (
      <div className="table-rubric">
        <div>
          <span className="rubric-name">
            {t1('rubric')}: {rubric.name}
          </span>
          <span>
            &nbsp;&nbsp;&nbsp;#
            {user.code} - {user.name} - {timestampToDateString(user.birthday)}
          </span>
        </div>
        <Table className="table" selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn
                width={width.rubric_name}
                className="border-right"
              >
                {t1('rubric_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.score} className="border-right">
                {t1('score')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.note}>
                {t1('note')}
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>

          <TableBody
            displayRowCheckbox={false}
            showRowHover={false}
            stripedRows={false}
          >
            {rubric.children.map((item, index) => (
              <TableRow key={this.makeKeyRowTable(item.iid, index)}>
                <TableRowColumn
                  width={width.rubric_name}
                  className="cell-relative border-right"
                >
                  {item.name}
                  {item.description && (
                    <div className="info">
                      <InfoRubric content={item.description} />
                    </div>
                  )}
                </TableRowColumn>
                <TableRowColumn width={width.score} className="border-right">
                  <Marking
                    anythingValue={anythingValue}
                    scoreScale={scoreScale}
                    scalePartIdAsValue
                    editingValue={
                      get(score, `[${item.iid}].p_original`) ||
                      get(progress, `[${item.iid}].p_original`)
                    }
                    label={
                      <Fragment>
                        <span style={{ width: 100 }}>
                          {get(score, `[${item.iid}].p_original`) ||
                            get(progress, `[${item.iid}].p_original`)}
                        </span>
                        <Icon icon="edit" />
                      </Fragment>
                    }
                    onChange={(value) => {
                      const newScore = { ...score };
                      setScore(newScore, item, value);
                      this.setState({ score: newScore });
                      if (this.props.onMarking) {
                        this.props.onMarking(score, true);
                      }
                    }}
                  />
                </TableRowColumn>
                <TableRowColumn width={width.note}>
                  <Note
                    value={get(score, `[${item.iid}].comment`)}
                    onChange={(value) => {
                      const newScore = { ...score };
                      setScore(newScore, item, value, 'comment');
                      this.setState({ score: newScore });
                    }}
                  />
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="footer">
          <div>
            {get(progress, `[${rubric.iid}].p_original`)
              ? t1(
                  'medium_score:_%d',
                  get(progress, `[${rubric.iid}].p_original`),
                )
              : ''}
          </div>
          <div>
            {t1('score_scale')}
            :&nbsp;
            {scoreScale}
          </div>
        </div>
        <div className="text-center">
          <FlatButton
            icon={<Icon icon="edit" />}
            label={t1('mark')}
            disabled={!this.checkEnableSubmit()}
            onClick={this.handleMarking}
          />
        </div>
      </div>
    );
  }
}

export default connect()(SubRubric);
