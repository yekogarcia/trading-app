
export const Plans = () => {
    return (
        <div className="plans">
            <section className="text-plans">
                <h1 className="title">ESCOGE TU <span>PAQUETE</span></h1>
                <p>Y disfruta del éxito al alcance de tus manos</p>
                <h2>SELECCIONA TUS PAQUETES</h2>
            </section>
            <section className="packages-plan">
                <div className="package">
                    <h1>PAQUETE PRO</h1>
                    <p>Suscripción mensual</p>
                    <h1 className="prices">$200<span> USD</span></h1>
                </div>
                <div className="package">
                    <h1>FRANQUICIA</h1>
                    <p>Suscripción mensual</p>
                    <h1 className="prices">$200<span> USD</span></h1>
                </div>
                <div className="package">
                    <h1>INFO PRODUCTOS</h1>
                    <p>Suscripción mensual</p>
                    <h1 className="prices">$200<span> USD</span></h1>
                </div>
            </section>
            <section className="wallets-plans">
                <h2>FORMAS DE PAGO</h2>
                <div className="wallets">
                    <div className="purse"><p>Monederos digitales</p></div>
                    <a href="#"><img className="skrill" src="" alt="skrill" /></a>
                    <a href="#"><img className="airtm" src="" alt="airtm" /></a>
                    <a href="#"><img className="daviplata" src="" alt="daviplata" /></a>
                    <a href="#"><img className="nequi" src="" alt="nequi" /></a>
                </div>
                <button className="wall-continue">Continuar</button>
            </section>
        </div>
    )
}
