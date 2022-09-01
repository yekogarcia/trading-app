
export const addRow = (data, dt) => {
    // console.log(data);
    // console.log(dt);
    const datNew = [...data];
    const index = data.findIndex((b) => b.id === dt.id);
    if (index > -1) {
        const item = datNew[index];
        datNew.splice(index, 1, { ...item, ...dt });
        // setData(datNew);
    } else {
        console.log("prueba");
        // setData([...data, dt[0]]);
        datNew.push(dt);
    }

    console.log(datNew);

    return datNew;
}