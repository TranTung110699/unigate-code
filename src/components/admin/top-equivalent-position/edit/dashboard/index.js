import React from 'react';
import { t1 } from 'translate';
import Paper from 'material-ui/Paper';

const stylePaper = {
  padding: 20,
  marginTop: 10,
};

class TopEquivalentPositionDashboard extends React.Component {
  render() {
    const { node } = this.props;
    return (
      <div>
        <h3>{t1('basic_info')}</h3>
        <Paper style={stylePaper}>
          <div>
            {node && (node.name || node.CDANHTDUONG_EVN) && (
              <div>
                {t1('name')}: <b>{node.name || node.CDANHTDUONG_EVN}</b>
              </div>
            )}
            {node &&
              node.equivalent_position &&
              node.equivalent_position.VTRICDANH_TDUONG && (
                <Paper style={stylePaper}>
                  <div>
                    {t1('equivalent_position')}:{' '}
                    <b>{node.equivalent_position.VTRICDANH_TDUONG}</b> <br />
                    {t1('code')}:{' '}
                    <span className={'text-muted'}>
                      {node.equivalent_position.VTRICDANH_TDUONG_CODE}
                    </span>
                    <br />
                    {t1('id')}:{' '}
                    <span className={'text-muted'}>
                      {node.equivalent_position.VTRICDANH_TDUONG_ID}
                    </span>
                  </div>
                </Paper>
              )}

            {node &&
              node.evn_equivalent_position &&
              node.evn_equivalent_position.CDANHTDUONG_EVN && (
                <Paper style={stylePaper}>
                  <div>
                    {t1('evn_equivalent_position')}:{' '}
                    <b>{node.evn_equivalent_position.CDANHTDUONG_EVN}</b> <br />
                    {t1('code')}:{' '}
                    <span className={'text-muted'}>
                      {node.evn_equivalent_position.CDANHTDUONG_EVN_CODE}
                    </span>{' '}
                    <br />
                    {t1('id')}:{' '}
                    <span className={'text-muted'}>
                      {node.evn_equivalent_position.CDANHTDUONG_EVN_ID}
                    </span>
                  </div>
                </Paper>
              )}
          </div>
        </Paper>
      </div>
    );
  }
}

export default TopEquivalentPositionDashboard;
