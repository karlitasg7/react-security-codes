/*
// reducer using IF
const reducerIf = (state, action) => {
    if (action.type === 'ERROR') {
        return {
            ...state,
            error: true,
            loading: false,
        };
    } else if (action.type === 'CHECK') {
        return {
            ...state,
            loading: true,
        };
    } else {
        return {
            ...state,
        };
    }
};

// this is the most popular (reducer with switch)
const reducerSwitch = (state, action) => {
    switch (action.type) {
        case 'ERROR':
            return {
                ...state,
                error: true,
                loading: false,
            };
        case 'CHECK':
            return {
                ...state,
                loading: true,
            };
        default:
            return {
                ...state,
            };
    }

}

// reducer with object
const reducerObject = (state) => ({
    'ERROR': {
        ...state,
        error: true,
        loading: false,
    },
    'CHECK': {
        ...state,
        loading: true,
    },
});

const reducer = (state, action) => {
    if (reducerObject(state)[action.type]) {
        return reducerObject(state)[action.type];
    } else {
        return state;
    }
}
*/


import React from 'react';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {

    const initialState = {
        value: '',
        error: false,
        loading: false,
        deleted: false,
        confirmed: false,
    };

    const reducerObject = (state, payload) => ({
        'CONFIRM': {
            ...state,
            error: false,
            loading: false,
            confirmed: true,
        },
        'ERROR': {
            ...state,
            error: true,
            loading: false,
        },
        'CHECK': {
            ...state,
            loading: true,
        },
        'DELETE': {
            ...state,
            deleted: true,
        },
        'RESET': {
            ...state,
            confirmed: false,
            deleted: false,
            value: '',
        },
        'WRITE': {
            ...state,
            value: payload,
        }
    });

    const reducer = (state, action) => {
        if (reducerObject(state)[action.type]) {
            return reducerObject(state, action.payload)[action.type];
        } else {
            return state;
        }
    }

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        console.log("Start effect");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("validate");

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: 'CONFIRM' })
                } else {
                    dispatch({ type: 'ERROR' })
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
                        dispatch({ type: 'WRITE', payload: event.target.value })
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({ type: 'CHECK' })
                    }}
                >Comprobar
                </button>
            </div >
        );
    }
    else if (!!state.confirmed && !state.deleted) {
        return (
            <React.Fragment>
                <p>Estas seguro de querer eliminar?</p>

                <button
                    onClick={() => {
                        dispatch({ type: 'DELETE' })
                    }}
                >Si, eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({ type: 'RESET' })
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
                        dispatch({ type: 'RESET' })
                    }}
                >Resetear, volver atras
                </button>
            </React.Fragment>
        );
    }

}

export { UseReducer };
