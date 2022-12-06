import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {

    const [value, setValue] = React.useState('');
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {

        console.log("Start effect");

        if (!!loading) {
            setTimeout(() => {
                console.log("validate");

                if (value !== SECURITY_CODE) {
                    setError(true);
                }
                setLoading(false);


            }, 3000);
        }

        console.log("End effect");

    }, [loading]);

    return (
        <div>
            <h2>Eliminar {name}</h2>
            <p>Por favor, escribe el código de seguridad.</p>

            {(error && !loading) && (
                <p>Error: El codigo es incorrecto</p>
            )}

            {loading && (
                <p>Cargando...</p>
            )}

            <input placeholder='Código de seguridad'
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                }}
            />
            <button
                onClick={() => {
                    setError(false);
                    setLoading(true);
                }}
            >Comprobar</button>
        </div >
    );
}

export { UseState };