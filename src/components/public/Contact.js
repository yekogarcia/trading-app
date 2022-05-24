
export const Contact = () => {
    return (
        <div className='contact'>
            <section className="title">
                <img src='' alt='logo' />
                <p>¡Estamos felices de poder ayudarle!</p>
            </section>
            <section className="details">
                <h1 className="title">DETALLES DE CONTACTO</h1>
                <div className="text-contact">
                    <i className="material-icons">email</i>
                    <p><b>Teléfono</b><br/>+57 3215336859</p>
                </div>
                <div className="text-contact">
                    <i className="material-icons">call</i>
                    <p><b>Email</b><br/>edfielacademy@gmail.com</p>
                    <p></p>
                </div>
                <div className="text-contact">
                    <i className="material-icons">question_answer</i>
                    <p><b>Hablemos</b></p>
                </div>
            </section>
            <section className="form">
                <form>
                    <input type="text" name='name' placeholder='Nombre' required />
                    <input type="email" name='email' placeholder='Email' required />
                    <input type="numeric" name='telephone' placeholder='Teléfono' required />
                    <textarea name="descriptions" placeholder='Descripción' />
                    <a><input type="checkbox" name="accept-terms" />
                    Acepto los términos, condiciones y politicas de Edfiel Academy</a>
                    <button>ENVIAR</button>
                </form>
            </section>
        </div>
    )
}
