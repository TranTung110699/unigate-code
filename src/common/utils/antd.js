import React from 'react';

/**
 * Trả về các cột sẽ hiển thị trong bảng
 * columns là tất cả các cột
 * notToShow là mảng các cột bị ẩn
 */
export function showInTable(columns, notToShow) {
  if (!Array.isArray(notToShow)) notToShow = [];
  const filterCol = (col, notToShow) => {
    const key = col.key;
    const children = col.children;
    if (notToShow.includes(key)) {
      return undefined;
    }

    if (!children) {
      return col;
    }

    return {
      ...col,
      children: filterColumns(children, notToShow),
    };
  };

  const filterColumns = (columns, notToShow) => {
    let result = [];
    for (let i = 0; i < columns.length; i++) {
      const col = columns[i];
      const columnFiltered = filterCol(col, notToShow);

      if (columnFiltered !== undefined) result.push(columnFiltered);
    }
    return result;
  };

  return filterColumns(columns, notToShow);
}
