
export const ColumnsList = (cols, data) => {

  let columns = [];

  cols.forEach(({ label, name, filter, width }) => {
    if (!width) {
      width = "wp-150";
    }
    let col = {
      key: name,
      title: label,
      dataIndex: name,
      className: width
    };
    if (filter) {
      const f = filter.split(".");
      if (f.includes("order")) {
        col.sorter = (a, b) => a.name.length - b.name.length;
        col.sortDirections = ["descend"];
      }
      if (f.includes("search")) {
        col.filterSearch= true;
        col.onFilter = (value, record) => record[name].indexOf(value) === 0;
        col.filters = [];
        data.map((pr) => {
          console.log(pr[name]);
          col.filters.push({
            text: pr[name],
            value: pr[name],
          })
        })
      }
    }
    columns.push(col);
  });

  return columns;
}
