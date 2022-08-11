import React from 'react'
import { MethodsPayments } from './MethodsPayments'
import { Plans } from './Plans'

export const Services = () => {
    return (
        <div className="plans">
            <section className="text-plans">
                <h1 className="title">SELECCIONA TU <span>SERVICIO</span></h1>
                <p>Y disfruta del éxito al alcance de tus manos</p>
            </section>
            <Plans />
            <MethodsPayments />
            {/* <button className="wall-continue button" onClick={handleRegisteruser}>Continuar</button> */}
        </div>
    )
}
