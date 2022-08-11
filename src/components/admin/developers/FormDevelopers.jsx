import { Button } from "antd";
import { useDispatch } from "react-redux";
import { sendNotTypesEdit } from "../../../actions/actionsTypes";
import { addDynamicTables } from "../../../actions/config-menu";
import { FormCreateItems } from "./FormCreateItems";

const FormDevelopers = ({ setData, visible, setVisible }) => {
  const dispatch = useDispatch();

  const onCreate = (values, data) => {
    console.log(data);
    console.log(values);
    values.columns = data;
    const dat = dispatch(addDynamicTables(values));
    dat.then(function (dt) {
      dt.key = dt.id;
      setData(dt);
    });
    setVisible(false);
    dispatch(sendNotTypesEdit());
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Nuevo
      </Button>
      <FormCreateItems
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          dispatch(sendNotTypesEdit());
        }}
      />
    </div>
  );
};

export default FormDevelopers;
