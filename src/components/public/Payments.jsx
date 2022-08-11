import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { setRegisterPay } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import { MethodsPayments } from "./MethodsPayments";

export const Payments = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValues, changeInputChange] = useForm({
    method_pay: "",
    code_pay: "",
    email: "",
  });

  const { code_pay, email } = formValues;

  const handleValidatePay = (e) => {
    e.preventDefault();
    formValues.method_pay = data;
    dispatch(setRegisterPay(formValues)).then(function (res) {
      if (res.ok) {
        Swal.fire("ok", "Pago registrado exitosamente!. El pago será validado y se confirmará la activación de tu cuenta por medio de correo electrónico, o un mensaje de texto ", "success")
        navigate("/login");
      }
    });
  };
  return (
    <div className="payments">
      {/* <h1 className="titleh1">Selecciona su plan</h1>
            <p className="subtitle">Suscripción mensual</p> */}
      <MethodsPayments setData={setData} />
      <form onSubmit={handleValidatePay}>
        <div className="pay-inputs">
          <label className="label-mon">Id de Confirmación de pago</label>
          <input
            className="input-contact"
            type="text"
            name="code_pay"
            placeholder="Id pago"
            value={code_pay}
            onChange={changeInputChange}
          />
        </div>
        <div className="pay-inputs">
          <label className="label-mon">Correo electronico</label>
          <input
            className="input-contact"
            type="text"
            name="email"
            placeholder="ejemplo@gmail.com"
            value={email}
            onChange={changeInputChange}
          />
        </div>
        <button className="button wpp3 " type="submit">
          PAGAR
        </button>
      </form>
    </div>
  );
};
