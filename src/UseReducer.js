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

    const [state, dispatch] = React.useReducer(reducer, initialState);

    React.useEffect(() => {

        console.log("Start effect");

        if (!!state.loading) {
            setTimeout(() => {
                console.log("validate");

                if (state.value === SECURITY_CODE) {
                    dispatch({ type: actionTypes.confirm })
                } else {
                    dispatch({ type: actionTypes.error })
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
                        dispatch({ type: actionTypes.write, payload: event.target.value })
                    }}
                />
                <button
                    onClick={() => {
                        dispatch({ type: actionTypes.check })
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
                        dispatch({ type: actionTypes.delete })
                    }}
                >Si, eliminar
                </button>
                <button
                    onClick={() => {
                        dispatch({ type: actionTypes.reset })
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
                        dispatch({ type: actionTypes.reset })
                    }}
                >Resetear, volver atras
                </button>
            </React.Fragment>
        );
    }

}

const initialState = {
    value: '',
    error: false,
    loading: false,
    deleted: false,
    confirmed: false,
};

const actionTypes = {
    confirm: 'CONFIRM',
    error: 'ERROR',
    check: 'CHECK',
    delete: 'DELETE',
    reset: 'RESET',
    write: 'WRITE',
};

const reducerObject = (state, payload) => ({
    [actionTypes.confirm]: {
        ...state,
        error: false,
        loading: false,
        confirmed: true,
    },
    [actionTypes.error]: {
        ...state,
        error: true,
        loading: false,
    },
    [actionTypes.check]: {
        ...state,
        loading: true,
    },
    [actionTypes.delete]: {
        ...state,
        deleted: true,
    },
    [actionTypes.reset]: {
        ...state,
        confirmed: false,
        deleted: false,
        value: '',
    },
    [actionTypes.write]: {
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
};

export { UseReducer };
