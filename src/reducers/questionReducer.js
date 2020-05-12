const initialState = {
    selectedDomain:null,
    domainQuestions:[],
    selectedDomainSlug:null
}

export default (state = initialState, {type, payload}) => {
    switch(type) {
        case "FETCH_QUESTIONS":
            return { ...state, ...payload};
        default:
            return state;
    }
}