import React, { Component } from 'react';
import { t1 } from 'translate';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'components/common/mui/Table';
import Utils from 'common/vocabset/Utils';
import Speaker from 'components/common/media-player/speaker/Speaker';

const styles = {
  vocabListWrapper: {
    marginLeft: 0,
    marginRight: 0,
  },
  tableRowColumnStyle: {
    display: 'flex',
    alignItems: 'center',
  },
};

class List extends Component {
  render() {
    let { vocabList, onStartPracticeVocabs } = this.props;
    const language = Utils.getLanguageFromComponent(this);
    vocabList = vocabList || [];

    return (
      <div className="row vocab-list-wrapper" style={styles.vocabListWrapper}>
        <div className="col-md-12 col-sm-12">
          <h3 className="vocab-list-title">{t1('vocab_list')}</h3>
          <Table>
            <TableHeader
              displaySelectAll={false}
              enableSelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn>{t1('name')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('phonetic')}</TableHeaderColumn>
                <TableHeaderColumn>{t1('vname')}</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {vocabList &&
                vocabList.map((vocab) => {
                  const phonetics = Utils.getPhoneticsByLanguage(
                    vocab,
                    language,
                  );
                  return (
                    <TableRow key={vocab.iid}>
                      <TableRowColumn style={styles.tableRowColumnStyle}>
                        <Speaker
                          playerId={`${vocab.iid}-audio`}
                          iid={vocab.iid}
                          className="xpeak-speaker"
                          url={Utils.getAudioByLanguage(
                            vocab,
                            language,
                            vocab.name,
                          )}
                          text={vocab.name}
                        />
                        <div className="m-l-10">{vocab.name}</div>
                      </TableRowColumn>
                      <TableRowColumn>
                        {phonetics && <div>/{phonetics}/</div>}
                      </TableRowColumn>
                      <TableRowColumn>{vocab.vname}</TableRowColumn>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>

          <div className="start-practice-vocabs">
            <a onClick={() => onStartPracticeVocabs()}>{t1('start')}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default List;
