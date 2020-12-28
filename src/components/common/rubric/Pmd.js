import React from 'react';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import FlatButton from 'components/common/mui/NewButton';
import { t1, t3 } from 'translate';
import { timestampToDateString } from 'common/utils/Date';
import Icon from 'components/common/Icon/index';
import get from 'lodash.get';
import Select from 'components/common/select/ActionSelect';
import { connect } from 'react-redux';
import { setScore } from 'components/common/rubric/common/util';
import InfoRubric from 'components/common/rubric/common/info/InfoRubric';
import Note from './common/Note';
import './stylesheet.scss';

const width = {
  rubric_name: '30%',
  score: '30%',
  note: '40%',
};

const scale = (parentValue = 1) => [
  {
    value: '1',
    disabled: !parentValue,
    primaryText: t1('yes'),
  },
  {
    value: '0',
    primaryText: t1('no'),
  },
  {
    value: '-1',
    primaryText: t1('dns'),
  },
];

const scoreColor = {
  F: '#ff0000',
  P: '#29b2b3',
  M: '#47d370',
  D: '#009309',
};

/**
 * Chỉ support 1 level
 */
class Pmd extends React.PureComponent {
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
    this.state = {
      score: {},
      totalScore: '',
      enableSubmit: false,
    };
  }

  componentWillMount() {
    this.initScore(this.props);
  }

  initScore = (props) => {
    const { rubric, progress } = props;
    if (!rubric) return;

    const score = {};
    this.createScore(rubric, progress || {}, score);
    const totalScore = this.calculateTotalScore(get(rubric, 'children'), score);
    this.setState({
      score: { ...score },
      totalScore: get(score, `[${rubric.iid}].p_original`, totalScore),
    });
  };

  createScore = (rubric, progress, score) => {
    if (!rubric) return;

    const p = get(progress, `[${rubric.iid}].p_original`);
    if (p) {
      setScore(score, rubric, p);
    }
    const comment = get(progress, `[${rubric.iid}].comment`);
    if (comment) {
      setScore(score, rubric, comment, 'comment');
    }
    setScore(score, rubric, 'pmd', 'score_scale');
    if (!rubric.children) return;

    rubric.children.map((item) => {
      this.createScore(item, progress, score);
    });
  };

  calculateTotalScore = (rubricChildrens, score) => {
    let totalScore = '';
    const enableSubmit = false;
    if (get(score, `[${rubricChildrens[0].iid}].p_original`) == 1) {
      totalScore = 'P';
      if (get(score, `[${rubricChildrens[1].iid}].p_original`) == 1) {
        totalScore = 'M';
        if (get(score, `[${rubricChildrens[2].iid}].p_original`) == 1) {
          totalScore = 'D';
        }
      }
    } else if (
      parseInt(get(score, `[${rubricChildrens[0].iid}].p_original`)) == 0 ||
      parseInt(get(score, `[${rubricChildrens[0].iid}].p_original`)) == -1
    ) {
      totalScore = 'F';
    }
    return totalScore;
  };
  makeKeyRowTable = (iid, index) => iid || index;

  doMarking = (item, value) => {
    const p = parseInt(value);
    const { score } = this.state;
    const { requiedFullMarking } = this.props;
    setScore(score, item, p);
    if (requiedFullMarking && p === 1) {
      this.calculatorParentScore(item, score);
    } else {
      this.setNotPassToAllParent(item, score, p);
      this.calculatorParentScore(item, score);
    }

    const children = get(this.props, 'rubric.children');
    const totalScore = this.calculateTotalScore(children, score);

    this.setState({ score: { ...score }, totalScore });

    if (!this.props.onDialog) {
      this.handleMarking();
    }
  };

  handleMarking = () => {
    if (!this.checkSubmitEnable()) {
      return;
    }

    const { onMarking, rubric } = this.props;
    const { score, comment, totalScore } = this.state;
    const res = {
      ...score,
      [rubric.iid]: { p_original: totalScore, score_scale: 'pmd' },
    };
    onMarking(res);
  };

  /**
   * gán toàn bộ điểm của các rubric tiếp theo là 0 vì rubric hiện tại điểm là 0.
   * @param item
   * @param score
   */
  setNotPassToAllParent = (item, score, p) => {
    const res = [];
    this.convertTreeToArray(this.props.rubric, res);

    let index = null;
    for (let i = 0; i < res.length; i += 1) {
      if (p === 1 && index === null) {
        setScore(score, res[i], 1);
      }

      if (res[i].iid === item.iid) {
        index = i;
      }

      if (index !== null && i > index) {
        setScore(
          score,
          res[i],
          get(score, `[${res[i].iid}].p_original`) == -1 ? -1 : 0,
        );
      }
    }
  };

  /**
   * Trải phẳng 1 rubric tree thành array
   * @param tree
   * @param res
   * @returns {Array}
   */
  convertTreeToArray = (tree, res = []) => {
    if (!tree) return res;

    res.push(tree);
    const { children } = tree;
    if (!children || children.length === 0) return res;

    const { length } = children;
    for (let i = 0; i < length; ++i) {
      this.convertTreeToArray(children[i], res);
    }
  };

  /**
   * tính lại toàn bộ điểm của parent item
   * @param item
   * @param score
   */
  calculatorParentScore = (item, score) => {
    const { parent } = item;
    if (!parent) return;

    const { children } = parent;
    const { length } = children;
    let passed = 0;
    let count = 0;
    for (let i = 0; i < length; ++i) {
      const child = children[i];
      const s = get(score, `[${child.iid}].p_original`);
      if (typeof s !== 'undefined' && s !== '') {
        count += 1;
        if (s == 1) {
          passed += 1;
        }
      }
    }
    if (count === length) setScore(score, parent, passed === length ? 1 : 0);

    this.calculatorParentScore(parent, score);
  };

  checkSubmitEnable = () => {
    const { score } = this.state;
    const { rubric, requiedCommentMarking } = this.props;
    if (!rubric) return true;

    const keys = Object.keys(score);
    const lengthKey = keys.length;
    for (let i = 0; i < lengthKey; i += 1) {
      if (typeof get(score, `[${keys[i]}].p_original`) === 'undefined') {
        return false;
      }
    }
    if (requiedCommentMarking) {
      return this.checkSubmitEnableByComment(rubric, score);
    }

    return true;
  };

  checkSubmitEnableByComment = (rubric, score) => {
    if (!rubric) return true;

    const length = get(rubric, 'children.length', 0);
    if (length === 0) {
      const comment = get(score, `[${rubric.iid}].comment`);
      return typeof comment !== 'undefined' && comment !== '';
    }

    const { children } = rubric;
    for (let i = 0; i < length; i += 1) {
      const enable = this.checkSubmitEnableByComment(children[i], score);
      if (!enable) {
        return false;
      }
    }
    return true;
  };

  /**
   * enable marking rubric
   * @param rubric
   * @param enable
   * @param requiedFullMarking
   * @returns {boolean}
   */
  checkComponentEnable = (rubric, enable, requiedFullMarking) => {
    const length = get(rubric, 'children.length', 0);
    rubric.enable = enable && length === 0;
    const { children } = rubric;
    let en = enable;
    for (let i = 0; i < length; i += 1) {
      en = this.checkComponentEnable(children[i], en, requiedFullMarking);
    }
    if (requiedFullMarking) {
      if (rubric.enable) {
        if (
          typeof get(this.state, `score[${rubric.iid}].p_original`) !==
          'undefined'
        ) {
          return true;
        }
        return false;
      }
      if (
        length > 0 &&
        typeof get(this.state, `score[${rubric.iid}].p_original`) !==
          'undefined'
      ) {
        return true;
      }
      return false;
    }
    /**
     * TODO viet comment
     */
    if (rubric.enable) {
      if (parseInt(get(this.state, `score[${rubric.iid}].p_original`)) !== 1) {
        return false;
      }
      return true;
    }
    if (
      length > 0 &&
      typeof get(this.state, `score[${rubric.iid}].p_original`) !== 'undefined'
    ) {
      if (parseInt(get(this.state, `score[${rubric.iid}].p_original`)) !== 1) {
        return false;
      }
      return true;
    }
    return false;
  };

  renderItems = (rubric) => {
    if (!rubric) return null;

    const { requiedFullMarking, requiedCommentMarking } = this.props;
    const res = [];
    this.checkComponentEnable(rubric, true, requiedFullMarking);

    this.renderRow(rubric, null, res, 0, 0, requiedCommentMarking, 1);
    return res;
  };

  renderRow = (
    item,
    parent,
    res,
    depth,
    indexInChildren,
    requiedCommentMarking,
    parentValue = 1,
  ) => {
    if (!item) return res;
    const { score } = this.state;
    item.parent = parent;
    res.push(
      <TableRow key={`${item.iid}-${indexInChildren}`}>
        <TableRowColumn
          className="border-right cell-relative"
          width={width.rubric_name}
        >
          <span style={{ paddingLeft: depth * 20 }}>
            {item.name} <span className="text-muted">{item.iid}</span>
          </span>
          {item.description && (
            <div className="info">
              <InfoRubric content={item.description} />
            </div>
          )}
        </TableRowColumn>
        <TableRowColumn className="border-right" width={width.score}>
          {parent ? (
            <Select
              type="radio"
              inline
              dataSet={scale(parentValue)}
              disabled={!item.enable}
              handleChange={(ss, value) => {
                this.doMarking(item, value);
              }}
              value={(() => {
                const p = get(score, `[${item.iid}].p_original`);
                if (typeof p !== 'undefined') {
                  return `${p}`;
                }
                return '';
              })()}
            />
          ) : (
            <div>{t3(this.state.totalScore)}</div>
          )}
        </TableRowColumn>
        <TableRowColumn width={width.note}>
          {!item.children && (
            <Note
              requiedCommentMarking={requiedCommentMarking}
              value={get(score, `[${item.iid}].comment`)}
              onChange={(value) => {
                const newScore = { ...score };
                setScore(newScore, item, value, 'comment');
                this.setState({ score: newScore });
                if (!this.props.onDialog) {
                  this.handleMarking();
                }
              }}
            />
          )}
        </TableRowColumn>
      </TableRow>,
    );

    const { children } = item;
    if (children) {
      children.forEach((child, index) => {
        let newParentValue = parentValue;
        if (parentValue && depth !== 0 && index === 0) {
          newParentValue = [1, '1', null].includes(
            get(score, `[${item.iid}].p_original`, null),
          )
            ? 1
            : 0;
        } else if (index !== 0) {
          const preChild = children[index - 1];
          newParentValue = [1, '1', null].includes(
            get(score, `[${preChild.iid}].p_original`, null),
          )
            ? 1
            : 0;
        }
        this.renderRow(
          child,
          item,
          res,
          depth + 1,
          index,
          requiedCommentMarking,
          newParentValue,
        );
      });
    }
  };

  render() {
    const { rubric, scoreScale, user, onDialog } = this.props;
    if (!rubric || !rubric.children) {
      return <div>{t1('rubric_is_empty')}</div>;
    }

    const score = get(this.state, 'totalScore');
    return (
      <div className="table-rubric">
        <div>
          {onDialog && (
            <span className="rubric-name">
              {t1('rubric')}: {rubric.name}
            </span>
          )}
          {onDialog && user && (
            <span>
              &nbsp;&nbsp;&nbsp;#
              {user.code} - {user.name} - {timestampToDateString(user.birthday)}
            </span>
          )}
        </div>
        <Table className="table" selectable={false}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn width={width.rubric_name}>
                {t1('rubric_name')}
              </TableHeaderColumn>
              <TableHeaderColumn width={width.score}>
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
            {this.renderItems(rubric)}
          </TableBody>
        </Table>

        {onDialog && [
          <div className="row">
            <div className="col-md-6">
              {t1('score_scale')}
              :&nbsp;
              {scoreScale}
            </div>
            {score && (
              <div className="col-md-6" style={{ color: scoreColor[score] }}>
                {t1('medium_score')}: {score}
              </div>
            )}
          </div>,
          <div className="text-center">
            <FlatButton
              icon={<Icon icon="edit" />}
              disabled={!this.checkSubmitEnable()}
              label={t1('mark')}
              onClick={this.handleMarking}
            />
          </div>,
        ]}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  requiedFullMarking: get(state, 'domainInfo.conf.pmd_required_full_marking'),
  requiedCommentMarking: get(
    state,
    'domainInfo.conf.pmd_required_comment_marking',
  ),
});

export default connect(mapStateToProps)(Pmd);
