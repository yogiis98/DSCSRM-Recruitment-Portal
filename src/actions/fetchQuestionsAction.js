const fetchQuestionsAction = (domain) => async dispatch => {
    dispatch({
        type: "FETCH_QUESTIONS",
        payload: {
            selectedDomainSlug:domain,
            selectedDomain:domain.split("-").join(" "),
            domainQuestions: [
                {
                    _id: "1",
                    attempted: true,
                    question: "What is your name ?",
                    response: "Cyka Blyat"
                },
                {
                    _id: "2",
                    attempted: false,
                    question: "Where do you live ?"
                }
            ]
        }
    })
}

export default fetchQuestionsAction;