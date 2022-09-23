import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAcademiesProfile } from "../../../actions/config-menu";
import { Spin } from "antd";
import { useNavigate } from "react-router-dom";

export const Academics = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [module, setModule] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    dispatch(getAcademiesProfile()).then((res) => {
      console.log(res);
      setLoading(false);
      setModule(res);
    });
  }, []);

  const openAcademie = (key, name) => {
    navigate("/ad/academics/list/" + key+"/"+name);
  };

  return (
    <div className="ct">
      <div className="page-table">
        <div className="page-one">
          {<Spin className="loading" size="large" spinning={loading} />}
          {module.map(({ name, key, icon }) => (
            <div
              className="module"
              key={key}
              onClick={() => openAcademie(key, name)}
            >
              <h3 className="title-module">{name}</h3>
              <figure>
                <img
                  src={process.env.REACT_APP_URL_FILES + icon}
                  alt="logo academie"
                />
              </figure>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
