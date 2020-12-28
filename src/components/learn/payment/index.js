import React from 'react';
import { t1, t3 } from 'translate';
import { displayPrice } from 'common/utils/money';
import { connect } from 'react-redux';
import { activeLoginTab, openLoginDialog } from 'actions/auth/auth-dialog';
import apiUrls from 'api-endpoints';
import nodeSagaActions from 'actions/node/saga-creators';
import nodeActions from 'actions/node/creators';
import { Scrollbars } from 'react-custom-scrollbars';
import Loading from 'components/common/loading';
import { ntype } from 'configs/constants';
import { getUserMoney } from 'actions/learn/payment/saga-creators';
import { payForLearningPathRequest } from 'actions/learn/saga-creators';
import PaymentConfirm from './PaymentConfirm';
import Selection from './Selection';
import SuccessfullPayment from './SuccessfullPayment';
import './stylesheet.scss';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import Card from 'antd/lib/card';
import Button from 'antd/lib/button';
import Statistic from 'antd/lib/statistic';

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPaths: [],
      selectedTrials: [],
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    const { dispatch, isGuest, paperId, courseIid } = this.props;

    const { getDataRequest } = nodeSagaActions;

    if (!isGuest) {
      dispatch(getUserMoney());
    }

    if (paperId) {
      dispatch(
        getDataRequest(
          {
            url: apiUrls.get_package_locked_paper,
            keyState: 'paymentPaper',
          },
          {
            paperId,
            courseIid,
          },
        ),
      );
      return;
    }

    dispatch(
      getDataRequest({
        url: apiUrls.get_paths,
        keyState: 'paymentPaths',
      }),
    );

    dispatch(
      getDataRequest({
        url: apiUrls.get_trial_packages,
        keyState: 'paymentTrialPackages',
      }),
    );
  };

  clearSelections = () => {
    this.setState({
      selectedPaths: [],
      selectedTrials: [],
    });
  };

  isPathSelected = (path) => {
    const selectedPaths = this.state.selectedPaths;
    return selectedPaths.findIndex((item) => item.id === path.id) !== -1;
  };

  addSelectedPath = (path) => {
    const selectedPaths = this.state.selectedPaths;
    if (!this.isPathSelected(path)) {
      const newSelectedPath = selectedPaths.concat([path]);
      this.setState({
        selectedPaths: newSelectedPath,
        selectedTrials: [],
      });
    }
  };

  removeSelectedPath = (path) => {
    const selectedPaths = this.state.selectedPaths;
    const newSelectedPath = selectedPaths.filter((item) => item.id !== path.id);
    this.setState({
      selectedPaths: newSelectedPath,
      selectedTrials: [],
    });
  };

  isTrialSelected = (trial) => {
    const { selectedTrials } = this.state;

    return selectedTrials.findIndex((item) => item.id === trial.id) !== -1;
  };

  handleTrialSelected = (trial) => {
    this.setState({
      selectedPaths: [],
      selectedTrials: [trial],
    });
  };

  handleTrialDeselected = () => {
    this.setState({
      selectedPaths: [],
      selectedTrials: [],
    });
  };

  getTotalPrice = () => {
    const { selectedPaths, selectedTrials } = this.state;
    const trialPrice = selectedTrials.reduce(
      (sum, trial) => sum + trial.price,
      0,
    );
    const pathPrice = selectedPaths.reduce((sum, path) => sum + path.price, 0);
    return trialPrice + pathPrice;
  };

  confirmPay = () => {
    let { selectedPaths, selectedTrials } = this.state;
    const { dispatch, price, paperId, packagePaper } = this.props;

    selectedPaths = selectedPaths.map((selection) => ({
      ...selection,
      codeInBankPayment: `C${selection.iid}`,
    }));

    selectedTrials = selectedTrials.map((selection) => ({
      ...selection,
      codeInBankPayment: `HT${selection.time}`,
    }));

    const selections = selectedPaths.concat(selectedTrials);

    const contentDialog = (
      <PaymentConfirm
        price={paperId && packagePaper && packagePaper.price}
        paperId={paperId}
        selections={selections}
        onBuyButtonClick={this.handleBuyButtonClick}
        onCancelButtonClick={this.handleCancelButtonClick}
      />
    );

    const optionsProperties = {
      repositionOnUpdate: false,
      style: {
        paddingTop: 0,
      },

      title: t1('confirm_payment'),
    };

    dispatch(
      nodeActions.handleOpenDialog({ contentDialog, optionsProperties }),
    );
  };

  handleCancelButtonClick = () => {
    const { dispatch } = this.props;
    dispatch(nodeActions.handleOpenDialog({ openDialog: false }));
  };

  handleBuyButtonClick = () => {
    const { selectedPaths, selectedTrials } = this.state;
    const { dispatch, paperId, courseIid, packagePaper } = this.props;
    const executeOnSuccess = () => {
      this.fetchItems();
      this.clearSelections();
      this.props.executeOnSuccess();

      const contentDialog = <SuccessfullPayment />;
      const optionsProperties = {
        autoHide: true,
        timestamp: 5000,
      };
      dispatch(
        nodeActions.handleOpenDialog({ contentDialog, optionsProperties }),
      );

      setTimeout(() => {
        dispatch(nodeActions.handleOpenDialog({ openDialog: false }));
      }, 5000);
    };

    if (paperId && packagePaper) {
      const params = { courseIid };
      if (packagePaper.ntype === ntype.PATH) {
        params.slug = packagePaper.slug;
      } else if (packagePaper.ntype === ntype.PAPER) {
        params.paperId = paperId;
      }
      dispatch(payForLearningPathRequest(params, executeOnSuccess));
    }
    if (selectedPaths.length > 0) {
      const slugs = selectedPaths.map((path) => path.slug);
      dispatch(payForLearningPathRequest({ slug: slugs }, executeOnSuccess));
    }
    if (selectedTrials.length > 0) {
      const packageId = selectedTrials[0].id;
      dispatch(
        payForLearningPathRequest({ id_package: packageId }, executeOnSuccess),
      );
    }
  };

  showLoginPopup = () => {
    const { dispatch } = this.props;
    dispatch(activeLoginTab());
    dispatch(openLoginDialog());
  };

  handlePayButtonClick = () => {
    const { isGuest } = this.props;
    if (isGuest) {
      this.showLoginPopup();
    } else {
      this.confirmPay();
    }
  };

  isSomethingSelected = () => {
    const { selectedPaths, selectedTrials } = this.state;
    return selectedTrials.length > 0 || selectedPaths.length > 0;
  };

  render() {
    const { paths, trials, paperId, packagePaper } = this.props;

    if (
      typeof paths === 'undefined' &&
      typeof trials === 'undefined' &&
      typeof packagePaper === 'undefined'
    ) {
      return <Loading />;
    }

    return (
      <Scrollbars>
        {!paperId ? (
          <Card
            title={<div className="text-center">{t3('buy_courses')}</div>}
            className="m-t-20"
          >
            <Row gutter={24}>
              {paths &&
                paths.map((path) => (
                  <Col span={6}>
                    <Selection
                      item={path}
                      onSelected={() => this.addSelectedPath(path)}
                      onDeselected={() => this.removeSelectedPath(path)}
                      selected={this.isPathSelected(path)}
                    />
                  </Col>
                ))}

              {trials &&
                trials.map((trial) => (
                  <Col span={6}>
                    <Selection
                      item={trial}
                      onSelected={() => this.handleTrialSelected(trial)}
                      onDeselected={() => this.handleTrialDeselected(trial)}
                      selected={this.isTrialSelected(trial)}
                    />
                  </Col>
                ))}
            </Row>
            <div className="text-center">
              <Button
                type="danger"
                icon="shopping-cart"
                onClick={this.handlePayButtonClick}
                disabled={!this.isSomethingSelected()}
                size="large"
              >
                {this.isSomethingSelected()
                  ? `${t3('buy_courses')} (${displayPrice(
                      this.getTotalPrice(),
                    )})`
                  : t3('please_select_courses')}
              </Button>
            </div>
          </Card>
        ) : (
          <div className="m-t-50">
            <h3>{t1('the_exam_has_price')}</h3>
            <Statistic
              title={
                packagePaper && packagePaper.ntype === ntype.PAPER
                  ? t3('price')
                  : t3('unlock_all_packages_at_a_price')
              }
              value={displayPrice(packagePaper && packagePaper.price)}
            />
            <Button
              style={{ marginTop: 16 }}
              type="danger"
              onClick={this.handlePayButtonClick}
            >
              {t3('pay')}
            </Button>
          </div>
        )}
      </Scrollbars>
    );
  }
}

const mapStateToProps = (state) => {
  const user = state.user && state.user.info;
  const isGuest = !(user && user.iid);
  const userAmount =
    user && user.counter && user.counter.money + user.counter.vmoney;

  const paths =
    state.dataApiResults &&
    state.dataApiResults.paymentPaths &&
    state.dataApiResults.paymentPaths.filter((item) => item.locked);

  const trials =
    state.dataApiResults && state.dataApiResults.paymentTrialPackages;

  const packagePaper =
    state.dataApiResults && state.dataApiResults.paymentPaper;

  return {
    paths,
    trials,
    isGuest,
    userAmount,
    packagePaper,
  };
};

export default connect(mapStateToProps)(Payment);
