const initialState = {
    selectedDomain:null
}

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case "SELECT_DOMAIN":
            return { ...state, ...payload};
        default:
            return state;
         }
}
