import { useState } from "react";

export const Settings = () => {
  const [iconOptions, setIconOptions] = useState("arrow_drop_up");

  const handleDinamicTable = (e) => {
    console.log(iconOptions);
    if (iconOptions == "arrow_drop_up") {
      setIconOptions("arrow_drop_down");
    } else {
      setIconOptions("arrow_drop_up");
    }
  };

  return (
    <div className="ct">
      <div className="page-table">
        <div className="page-one">
          <a className="table" onClick={handleDinamicTable}>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias sasas<i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias assaasaas{" "}
            <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
          <a>
            Academias <i className="large material-icons">{iconOptions}</i>
          </a>
        </div>
      </div>
    </div>
  );
};
