import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDynamicTables } from "../../../actions/config-menu";

export const Settings = () => {
  const [iconOptions, setIconOptions] = useState("arrow_drop_up");
  const [data, setData] = useState([]);
  const [init, setInit] = useState("start");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tables = dispatch(getDynamicTables("services"));
    tables.then(function (pr) {
      if (pr.length > data.length) {
        setData(pr);
      }
      console.log(pr);
    });
  }, []);

  const handleDinamicTable = (e, table) => {
    setInit(table);
    if (iconOptions == "arrow_drop_up") {
      setIconOptions("arrow_drop_down");
    } else {
      setIconOptions("arrow_drop_up");
    }
    navigate("/ad/list/"+table);
  };

  return (
    <div className="ct">
      {/* {init == "start" && ( */}
        <div className="page-table">
          <div className="page-one">
            {data.map(({ name, key, table_name }) => (
              <div key={key}>
                <a
                  key={key}
                  className="table"
                  onClick={(e) => handleDinamicTable(e, table_name)}
                >
                  {name} <i className="large material-icons">{iconOptions}</i>
                </a>
              </div>
            ))}
          </div>
        </div>
      )
      {/* } */}
      {/* {init != "start" && <ListDynamic />} */}
    </div>
  );
};
