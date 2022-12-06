import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseState({ name }) {

    const [state, setState] = React.useState({
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    });

    React.useEffect(() => {

        console.log("Start effect");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("validate");

                if (state.value === SECURITY_CODE) {
                    setState({
                        ...state,
                        error: false,
                        loading: false,
                        confirmed: true,
                    });
                } else {
                    setState({
                        ...state,
                        error: true,
                        loading: false
                    });
                }


            }, 3000);
        }

        console.log("End effect");

    }, [state.loading]);

    if (!state.deleted && !state.confirmed) {
        return (
            <div>
                <h2>Eliminar {name}</h2>
                <p>Por favor, escribe el código de seguridad.</p>

                {(state.error && !state.loading) && (
                    <p>Error: El codigo es incorrecto</p>
                )}

                {state.loading && (
                    <p>Cargando...</p>
                )}

                <input placeholder='Código de seguridad'
                    value={state.value}
                    onChange={(event) => {
                        setState({
                            ...state,
                            value: event.target.value
                        });
                    }}
                />
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            loading: true
                        });
                    }}
                >Comprobar</button>
            </div >
        );
    }
    else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Estas seguro de querer eliminar?</p>

                <button
                    onClick={() => {
                        setState({
                            ...state,
                            deleted: true,
                        });
                    }}
                >Si, eliminar
                </button>
                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            value: '',
                        });
                    }}
                >No, me arrepenti
                </button>
            </React.Fragment>
        );
    } else {
        return (
            <React.Fragment>
                <p>Eliminado con exito</p>

                <button
                    onClick={() => {
                        setState({
                            ...state,
                            confirmed: false,
                            deleted: false,
                            value: '',
                        });
                    }}
                >Resetear, volver atras
                </button>
            </React.Fragment>
        );
    }
}

export { UseState };