import React, { Component } from 'react';
import { t1 } from 'translate';
import lodashGet from 'lodash.get';
import { timestampToDateString } from 'common/utils/Date';
import AntdTable from 'antd/lib/table';
import Icon from 'components/common/Icon';
import DetailOnDialog from 'components/common/detail-on-dialog/index';
import MarkOpenEndedQuestion from 'components/admin/course/mainstage/score-and-marking/marking-open-ended-question';
import OrganizationsOrPhongBan from 'components/admin/group/common/OrganizationsOrPhongBanInResultTable';

const dialogOptionsProperties = {
  width: '95%',
  handleClose: true,
};

class TakeResults extends Component {
  renderMarkingDialog = (take, questionIid) => {
    return (
      <div>
        <h1>{t1('marking_for_"%s"', lodashGet(take, 'u.name'))}</h1>
        {/*

        <TakeDetail
          userIid={lodashGet(take, 'u.iid')}
          nodeIid={lodashGet(node, 'iid')}
          item={question}
          defaultCommentIdToFocus={defaultCommentIdToFocus}
        />
         */}
        <div style={{ width: '100%' }}>
          <MarkOpenEndedQuestion
            userIid={lodashGet(take, 'u.iid')}
            node={{ iid: lodashGet(take, 'course') }}
            questionIid={questionIid}
            peerMarking={this.props.peerMarking}
            courseIid={this.props.courseIid}
          />
        </div>
      </div>
    );
  };

  render() {
    const { items } = this.props;

    // TODO: loop through all the questions
    const columns = [
      {
        title: t1('name'),
        key: 'id',
        render: (text, item) => (
          <div>
            {lodashGet(item, 'u.name')}{' '}
            <div className="text-muted">{lodashGet(item, 'u.mail')}</div>
            <div className="text-muted">{lodashGet(item, 'u.phone')}</div>
          </div>
        ),
      },
      {
        title: t1('organization'),
        key: 'organization',
        render: (item) => {
          return lodashGet(item, 'u.__expand.user_organizations') ? (
            <OrganizationsOrPhongBan
              item={lodashGet(item, 'u')}
              attr={'user_organizations'}
              showParentsInfo
            />
          ) : lodashGet(item, 'u.user_organizations_info', []) ? (
            lodashGet(item, 'u.user_organizations_info', []).map(
              (org) => org.name,
            )
          ) : null;
        },
      },
      {
        title: t1('submitted_date'),
        render: (text, take) => {
          return (
            <div>
              {timestampToDateString(lodashGet(take, 'ts'), {
                showDate: true,
                showTime: true,
              })}
            </div>
          );
        },
      },
      {
        title: t1('score'),
        render: (text, take) => {
          const answers = lodashGet(take, 'answers');
          const questionIid = Object.keys(answers || {})[0];

          return (
            <div>
              <b>{lodashGet(answers, `${questionIid}.score`)}</b>
            </div>
          );
        },
      },
      {
        title: t1('mark'),
        render: (text, take) => {
          const answers = lodashGet(take, 'answers');
          const questionIid = Object.keys(answers || {})[0];

          return (
            <div>
              <DetailOnDialog
                renderPreview={({ showFull }) => (
                  <span onClick={showFull}>
                    <Icon icon="edit" className="m-l-10 m-r-10" />
                    {t1('mark')}
                  </span>
                )}
                renderFull={() => this.renderMarkingDialog(take, questionIid)}
                dialogOptionsProperties={dialogOptionsProperties}
              />
            </div>
          );
        },
      },
    ];

    return (
      <AntdTable
        rowKey="id"
        columns={columns}
        dataSource={items}
        bordered
        pagination={false}
        size="small"
      />
    );
  }
}

export default TakeResults;
