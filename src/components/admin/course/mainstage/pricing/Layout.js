/**
 * Created by hungvo on 04/05/2017.
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import sagaActions from 'actions/node/saga-creators';
import Editable from 'components/common/forms/editable';
import Icon from 'components/common/Icon';
import ActionToggle from 'components/common/toggle/ActionToggle';
import routes from 'routes/';
import RaisedButton from 'components/common/mui/RaisedButton';
import { t1 } from 'translate';
import apiUrls from 'api-endpoints';
import IconLock from 'material-ui/svg-icons/action/lock';
import IconUnlock from 'material-ui/svg-icons/action/lock-open';
import './stylesheet.scss';

const keyState = 'course_pricing';

class Pricing extends Component {
  actionToggleDataSet = { on: 1, off: 0 };
  raisedButtonStyle = { margin: 10 };

  constructor(props) {
    super(props);
    this.state = {
      locked: false,
      itemsPrice: [],
    };
  }

  componentWillMount() {
    this.getData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const { node } = this.props;
    if (
      typeof nextProps !== 'undefined' &&
      nextProps.node &&
      nextProps.node.iid &&
      nextProps.node.iid !== node.iid
    ) {
      this.getData(nextProps);
    }
    if (
      nextProps &&
      nextProps.itemsPrice &&
      nextProps.itemsPrice.length &&
      nextProps.itemsPrice !== this.state.itemsPrice
    ) {
      this.setState({
        itemsPrice: nextProps.itemsPrice,
      });
    }
  }

  getData = (prop) => {
    prop = prop || this.props;
    const { dispatch, node } = prop;
    const url = '/course/api/price';
    dispatch(
      sagaActions.getDataRequest(
        { url, keyState },
        {
          id: node && node.id,
          iid: node && node.iid,
          syllabus: node && node.syllabus,
          ntype: 'course',
        },
      ),
    );
  };

  setLockItems = (locked = false, index = -1) => {
    const { itemsPrice } = this.state;
    const tcoPrice = locked ? 1 : 0;
    const tcoIid = [];
    const tmp = [];

    itemsPrice.forEach((item, i) => {
      if (index === -1 || i === index) {
        tcoIid.push(item.iid);
        const children = [];
        if (item.children && item.children.length) {
          item.children.forEach((child) => {
            tcoIid.push(child.iid);
            children.push({ ...child, price: tcoPrice });
          });
        }
        tmp.push({ ...item, price: tcoPrice, children });
      } else {
        tmp.push(item);
      }
    });
    this.setState({
      itemsPrice: tmp,
    });
    this.savePrice(tcoIid, tcoPrice);
  };

  savePrice = (tcoIid, tcoPrice) => {
    const { dispatch, course } = this.props;
    const url = apiUrls.course_set_price_item({ id: course.id, tcoIid });
    const value = { tco_price: tcoPrice, submit: 1 };
    dispatch(sagaActions.submitFormRequest('', { extraParams: value, url }));
  };

  renderItem = (course, item, index = null) => (
    <div>
      <Icon icon={item.ntype} />
      {item.name}
      <span className="pull-right">
        <ActionToggle
          baseURL={apiUrls.course_set_price_item({
            id: course.id,
            tcoIid: item.iid,
          })}
          value={item.price || 0}
          dataSet={this.actionToggleDataSet}
          label={t1('lock')}
          name="tco_price"
          updateValue
          handleChange={(res, logged) => {
            if (index !== null && item.children && res.success) {
              this.setLockItems(logged, index);
            }
          }}
        />
      </span>
    </div>
  );

  render() {
    const { course } = this.props;
    const { itemsPrice } = this.state;

    return (
      <div>
        <div className="row">
          <div className="pull-right whitebox">
            <span className="edit-price">
              <span className="label">
                {t1('price')} &nbsp;
                <Icon icon="money" />
              </span>
              <Editable
                form="course-update-price"
                name="price"
                initialValue={course.price || '0'}
                url={routes.url('node_update', { ...course, step: 'price' })}
              />
            </span>
            <span className="edit-price">
              <span className="label">
                {t1('original_price')} &nbsp;
                <Icon icon="money" />
              </span>
              <Editable
                form="course-update-oprice"
                name="oprice"
                initialValue={course.oprice || '0'}
                url={routes.url('node_update', { ...course, step: 'oprice' })}
              />
            </span>
            <span className="edit-price">
              <span className="label">
                {t1('standard_tco_price')} &nbsp;
                <Icon icon="money" />
              </span>
              <Editable
                form="course-update-tco_standard_price"
                name="tco_standard_price"
                initialValue={course.tco_standard_price || '0'}
                url={routes.url('node_update', {
                  ...course,
                  step: 'tco_standard_price',
                })}
              />
            </span>
          </div>
        </div>
        <div className="row">
          <span className="pull-right">
            <RaisedButton
              style={this.raisedButtonStyle}
              icon={<IconLock />}
              primary={!this.state.locked}
              onClick={() => {
                this.setLockItems(true);
              }}
            />
            <RaisedButton
              style={this.raisedButtonStyle}
              icon={<IconUnlock />}
              primary={this.state.locked}
              onClick={() => {
                this.setLockItems(false);
              }}
            />
          </span>
        </div>
        {itemsPrice &&
          itemsPrice.map((item, index) => (
            <div key={item.iid || index}>
              <div className="item-row">
                {this.renderItem(course, item, index)}
              </div>
              {item.children &&
                item.children.map((child) => (
                  <div className="children-item-row" key={child.iid}>
                    {this.renderItem(course, child)}
                  </div>
                ))}
            </div>
          ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const data = state.dataApiResults[keyState] || {};
  let { course, itemsPrice } = data;
  course = course || {};
  itemsPrice = itemsPrice || [];
  return {
    course,
    itemsPrice,
  };
}

export default connect(mapStateToProps)(Pricing);
