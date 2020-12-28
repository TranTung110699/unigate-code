import React from 'react';
import get from 'lodash.get';
import { t1 } from 'translate';
import Menu from 'antd/lib/menu';
import { connect } from 'react-redux';
import CourseSessions from './sessions';
import PeerTakes from './peer-takes';
import QuestionReports from './reports';
import Portal, { portals } from 'components/common/portal';
import Icon from 'components/common/Icon';
import contentItemToEdit from './submission-area/Trinh';
import tableAnswerByStructure from './submission-area/Table';

const handleRowOnChange = (onChange, value, valueChanged = {}) => {
  if (typeof onChange !== 'function' || !get(valueChanged, 'id')) {
    return;
  }

  const newValue = Array.isArray(value)
    ? value.filter(({ id }) => id !== get(valueChanged, 'id'))
    : [];
  newValue.push({ ...valueChanged });

  onChange(newValue);
};

const getMenuItemByDataSource = (
  items,
  setItemToEdit,
  setRubricToShowMarking,
  setHideSubmitButton,
) => {
  if (!Array.isArray(items) || !items.length) {
    return null;
  }

  return items.map((item) => {
    const { id, children, name } = item;
    if (Array.isArray(children) && children.length) {
      return (
        <Menu.SubMenu key={id} title={name}>
          {getMenuItemByDataSource(children, setItemToEdit)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item
        onClick={() => {
          setItemToEdit(item);
          const rubricIidMarking = get(item, 'rubric_iid_marking') || null;
          if (typeof setRubricToShowMarking === 'function') {
            setRubricToShowMarking(rubricIidMarking);
          }
          if (typeof setHideSubmitButton === 'function') {
            setHideSubmitButton(true);
          }
        }}
        key={id}
      >
        <Icon
          themify
          icon={
            item.input_submit.includes('youtube') ? 'control-play' : 'pencil'
          }
        />{' '}
        {name}
      </Menu.Item>
    );
  });
};

const extraMenuItems = [
  !window.isETEP && {
    id: 'virtual_class',
    name: 'Thảo luận trực tuyến',
    icon: 'desktop',
  },
  {
    id: 'peer',
    name: 'Xem Thiết kế của HV khác',
    icon: 'list',
  },
  {
    id: 'report',
    name: 'Phân tích chung',
    icon: 'bar-chart',
  },
].filter(Boolean);

const contentStyle = { minHeight: 450 };

const AnswerByStructure = ({
  dataSource,
  defaultItemToEdit,
  defaultOpenKeys,
  value,
  readOnly,
  onChange,
  takeId,
  courseIid,
  questionIid,
  question,
  resultMarked,
  setHideSubmitButton,
  setRubricToShowMarking,
  formid,
}) => {
  const [itemToEdit, setItemToEdit] = React.useState(null);

  if (!Array.isArray(dataSource) || !dataSource.length) {
    return <div>{t1('structure_for_submit_answer_not_found')}</div>;
  }

  if (question && !question.sp1_layout) {
    // Dạng table để rải phẳng tất cả các câu trả lời.
    return tableAnswerByStructure({
      dataSource,
      value,
      readOnly,
      onChange,
      handleRowOnChange,
    });
  }

  if (!itemToEdit) {
    setItemToEdit(defaultItemToEdit);
    const rubricIidMarking =
      get(defaultItemToEdit, 'rubric_iid_marking') || null;
    if (typeof setRubricToShowMarking === 'function') {
      setRubricToShowMarking(rubricIidMarking);
    }
  }

  const menu = (
    <Menu
      mode={readOnly ? 'horizontal' : 'inline'}
      defaultOpenKeys={defaultOpenKeys}
      defaultSelectedKeys={defaultItemToEdit ? [defaultItemToEdit.id] : []}
    >
      {getMenuItemByDataSource(
        dataSource,
        setItemToEdit,
        setRubricToShowMarking,
        setHideSubmitButton,
      )}

      {!readOnly && <Menu.Divider />}

      {!readOnly &&
        extraMenuItems.map((item) => (
          <Menu.Item
            onClick={() => {
              setItemToEdit(item);
              if (typeof setHideSubmitButton === 'function') {
                setHideSubmitButton(true);
              }
            }}
            key={item.id}
          >
            <Icon icon={item.icon} themify /> {item.name}
          </Menu.Item>
        ))}
    </Menu>
  );

  let content = '';

  switch (itemToEdit && itemToEdit.id) {
    case 'peer': {
      content = (
        <PeerTakes
          courseIid={courseIid}
          questionIid={questionIid}
          question={question}
          peerMarking
        />
      );
      break;
    }
    case 'virtual_class': {
      content = <CourseSessions courseIid={courseIid} />;
      break;
    }
    case 'report': {
      content = (
        <div>
          <h1>Phân tích kết quả sản phẩm học tập</h1>
          <QuestionReports courseIid={courseIid} question={question} />
        </div>
      );
      break;
    }

    default: {
      content = contentItemToEdit({
        value,
        onChange,
        itemToEdit,
        readOnly,
        question,
        courseIid,
        takeId,
        resultMarked,
        formid,
        handleRowOnChange,
      });
    }
  }

  // "port" question parts to either
  // 1. inside the course navigation nav
  // 2. the right hand side

  if (!readOnly) {
    return (
      <div>
        {question.sp1_layout == 1 && (
          <Portal id={portals.SP1_QUESTION_NAV_INSIDE_COURSE_LEARN_NAV}>
            {menu}
          </Portal>
        )}
        {question.sp1_layout == 2 && (
          <Portal id={portals.SP1_QUESTION_NAVIGATIONS_RIGHT_BAR}>
            {menu}
          </Portal>
        )}
        <div className="p-t-30" style={contentStyle}>
          {content}
        </div>
      </div>
    );
  }

  const leftCol = readOnly ? 'col-md-12' : 'col-md-4 col-sm-4 col-xs-4';
  const rightCol = readOnly ? 'col-md-12' : 'col-md-8 col-sm-8 col-xs-8';

  return (
    <div className="row">
      <div className={leftCol}>{menu}</div>
      <div className={rightCol} style={contentStyle}>
        {content}
      </div>
    </div>
  );
};

const getPropsToRenderMenu = (structureAnswer, path = '') => {
  const dataSource = [];
  let defaultItemToEdit = null;
  let defaultOpenKeys = [];

  if (!Array.isArray(structureAnswer) || !structureAnswer.length) {
    return { dataSource, defaultItemToEdit, defaultOpenKeys };
  }

  structureAnswer.forEach(({ children, ...row }, index) => {
    let isParent = false;
    const id = `${path}[${index}]`;
    row.id = id;

    if (Array.isArray(children) && children.length) {
      isParent = true;
      const tmp = getPropsToRenderMenu(children, `${path}[${index}].children`);

      defaultItemToEdit = defaultItemToEdit || tmp.defaultItemToEdit;
      defaultOpenKeys = defaultOpenKeys.concat(tmp.defaultOpenKeys);

      if (Array.isArray(tmp.dataSource) && tmp.dataSource.length) {
        row.children = tmp.dataSource;
      }
    } else {
      defaultItemToEdit = defaultItemToEdit || row;
    }

    row.isParent = isParent;

    defaultOpenKeys.push(id);

    dataSource.push(row);
  });

  return { dataSource, defaultItemToEdit, defaultOpenKeys };
};

const mapStateToProps = (state, props) => {
  const {
    dataSource,
    defaultItemToEdit,
    defaultOpenKeys,
  } = getPropsToRenderMenu(props.structureAnswer);
  return {
    dataSource,
    defaultItemToEdit,
    defaultOpenKeys,
  };
};
export default connect(mapStateToProps)(AnswerByStructure);
