import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { getPlans } from "../../actions/auth";

export const Plans = ({ plan, setPlan }) => {
    // inputEl.current.focus();

    const [plans, setPlans] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        const planes = dispatch(getPlans());
        planes.then(function (pr) {
            setPlans(pr);
        })
        console.log('useEfect');
    }, [])


    const handleSelectPlans = (id, e) => {
        if (typeof plan !=='undefined') {
            const clases = document.getElementsByClassName('package');
            for (let i = 0; i < clases.length; i++) {
                clases[i].style.opacity = 1;
            }
            document.querySelector('.package' + id).style.opacity = 0.5;
            setPlan(id);
        }
    }

    const handleSelectPack = (e, text) => {
        const ele = document.querySelector('.subtitle' + e);
        if (ele) {
            ele.innerHTML = "";
            ele.insertAdjacentHTML('afterbegin', text);
        }
    }


    return (
        <section className="packages-plan">
            {
                plans.map(val => (
                    <div className={`package package${val.id}`} key={val.id} onClick={(e) => handleSelectPlans(val.id, e)}>
                        <h2>{val.title}</h2>
                        <p>{val.subtitle}</p>
                        <h1 className="prices">${val.price}<span> {val.abbreviation}</span></h1>
                        <p className={`description-plan subtitle${val.id}`}></p>
                        {
                            handleSelectPack(val.id, val.descriptions)
                            // setTimeout(function () {
                            //     handleSelectPack(val.id, val.descriptions)
                            // })
                        }
                    </div>
                ))
            }
        </section>
    )
}
