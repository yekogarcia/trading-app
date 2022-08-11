import { Tooltip } from "antd";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getMethodsPay } from "../../actions/auth";
const url_pay = process.env.REACT_APP_URL_FILES;

export const MethodsPayments = ({ setData }) => {
  const dispatch = useDispatch();
  const [pays, setPays] = useState([]);
  const eleRef = useRef(false);
  const nameRef = useRef(false);


  useEffect(() => {
    dispatch(getMethodsPay()).then(function (res) {
      console.log(res);
      setPays(res);
    });
  }, []);

  const handleSelectPay = (ref, key) => {
    if (nameRef.current && nameRef.current != ref) {
      document.querySelector("." + nameRef.current).classList.add("check_none");
      eleRef.current = false;
    }

    if (!eleRef.current) {
      document.querySelector("." + ref).classList.remove("check_none");
      eleRef.current = true;
    } else {
      document.querySelector("." + ref).classList.add("check_none");
      eleRef.current = false;
    }
    nameRef.current = ref;
    setData(key);
  };
  return (
    <div className="plans">
      <section className="wallets-plans">
        <h2>FORMAS DE PAGO</h2>
        <div className="wallets">
          <div className="purse">
            <p>Monederos digitales</p>
          </div>
          {pays.map(({ id, name, url, icon }) => (
            <div className={`select-pay`} key={id}>
              <div className="icon-select">
                <Tooltip placement="topLeft" title="Visitar web">
                  <a href={url} target="_blank">
                    <img
                      className="skrill"
                      src={`${url_pay}${icon}`}
                      alt={name}
                    />
                  </a>
                </Tooltip>
                <i className={`material-icons ${name} check_pay check_none`}>
                  check
                </i>
              </div>
              {typeof setData !== "undefined" ? (
                <a
                  className={`${name} select`}
                  onClick={() => handleSelectPay(name, id)}
                >
                  Seleccionar
                </a>
              ) : (
                console.log("prueba")
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
