const selectedDomainAction = (domain) => async (dispatch, getState) => {
  
    dispatch({
        type: "SELECT_DOMAIN",
        payload:{
            selectedDomainSlug:domain,
            selectedDomain:domain.split("-").join(" ")
    }
    })
}
export default selectedDomainAction;