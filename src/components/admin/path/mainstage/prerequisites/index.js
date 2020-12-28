import React from 'react';
import { t1 } from 'translate';
import getLodash from 'lodash.get';
import Loading from 'components/common/loading';
import Icon from 'components/common/Icon';
import apiUrls from 'api-endpoints';
import fetchData from 'components/common/fetchData';
import DetailOnDialog from 'components/common/detail-on-dialog';
import RaisedButton from 'components/common/mui/RaisedButton';
import NodeNew from 'components/admin/node/new';
import Collapse from 'components/common/collapse';
import Warning from 'components/common/Warning';
import CreditSyllabusesCreatedPrerequisitesWithByScoreScale from './CreditSyllabusesCreatedPrerequisitesWithByScoreScale';
import { schemEditPrerequisites } from '../../schema/form';

class EquivalentionPrerequisites extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      updateInfo: false,
    };
  }

  className = 'applied-score-scale-list';

  elementUpdatePrerequisites = (action, node, scoreScale) => {
    let scoreScaleNotYetApply = [];

    const hiddenFields = {
      action,
      id: node && node.id,
      iid: node && node.iid,
    };

    if (action === 'add') {
      const { scoreScales } = this.props;
      const scoreScaleWithPrerequisites = getLodash(
        this.props,
        'node.score_scale_with_prerequisites',
        [],
      );
      scoreScaleNotYetApply =
        (Array.isArray(scoreScales) &&
          scoreScales
            .map(
              (scoreScale) =>
                scoreScale &&
                !scoreScaleWithPrerequisites.includes(scoreScale.id) &&
                scoreScale.id,
            )
            .filter(Boolean)) ||
        scoreScaleNotYetApply;
      if (!scoreScaleNotYetApply.length) {
        return null;
      }
    } else {
      hiddenFields.score_scale = scoreScale;
    }

    return (
      <DetailOnDialog
        renderPreview={({ showFull }) =>
          action === 'add' ? (
            <RaisedButton
              label={t1('apply_score_scale')}
              icon={<Icon icon="plus" />}
              onClick={showFull}
            />
          ) : (
            <Icon icon="delete" onClick={showFull} />
          )
        }
        renderFull={({ closeDialog }) => (
          <NodeNew
            resetForm
            ntype={'path'}
            alternativeApi={apiUrls.update_program_with_apply_prerequisites}
            schema={schemEditPrerequisites({
              scoreScaleNotYetApply,
              hiddenFields,
            })}
            hiddenFields={hiddenFields}
            requestSuccessful={closeDialog}
            submitButton={
              <div className="text-center">
                <RaisedButton
                  icon={<Icon icon={action === 'add' ? 'push' : 'delete'} />}
                  label={action === 'add' ? t1('add_new') : t1('delete')}
                  primary
                  type="submit"
                />
              </div>
            }
          />
        )}
        dialogKey="edit_core_scale"
      />
    );
  };

  elementCreditSyllabusesCreatedPrerequisitesWhithByScoreScale = (
    key,
    scoreScale,
  ) => (
    <CreditSyllabusesCreatedPrerequisitesWithByScoreScale
      node={this.props.node}
      scoreScale={scoreScale}
      scoreScaleKey={key}
      dataOnChange={() => {
        this.setState((state) => ({
          updateInfo: !(state && state.updateInfo),
        }));
      }}
      updateInfo={this.state.updateInfo}
    />
  );

  render() {
    const { node, scoreScales, loadingStatus } = this.props;

    if (!loadingStatus) {
      return <Loading />;
    }

    if (!scoreScales) {
      return <Warning>No score scale has been configured</Warning>;
    }

    const scoreScaleWithPrerequisites = getLodash(
      this.props,
      'node.score_scale_with_prerequisites',
    );

    return (
      <div className="white-box">
        <Collapse
          items={
            Array.isArray(scoreScaleWithPrerequisites) &&
            scoreScaleWithPrerequisites.map((key) => {
              const scoreScale =
                Array.isArray(scoreScales) &&
                scoreScales.find((map) => map && map.id === key);
              const content = this.elementCreditSyllabusesCreatedPrerequisitesWhithByScoreScale(
                key,
                scoreScale,
              );

              const primaryText = (open) => (
                <div>
                  {`${t1('score_scale')}: ${(scoreScale && scoreScale.name) ||
                    key}`}
                  &nbsp; &nbsp;
                  {open ? (
                    this.elementUpdatePrerequisites('remove', node, key)
                  ) : (
                    <Icon icon="edit" />
                  )}
                </div>
              );

              const handlePrimaryTogglesNestedList = (open) => !open;

              return {
                content,
                primaryText,
                handlePrimaryTogglesNestedList,
              };
            })
          }
        />
        {this.elementUpdatePrerequisites('add', node)}
      </div>
    );
  }
}

export default fetchData(() => ({
  baseUrl: apiUrls.get_all_score_scale,
  propKey: 'scoreScales',
  fetchCondition: true,
  refetchCondition: () => false,
  // Never refetch, I did not add this logic here, I just refactor based on the previous coder logic
  // he/she did not pass refetchCondition here, therefore, it will never refetch
  // I just refactor make it clearer
}))(EquivalentionPrerequisites);
