
export default () => {
    localStorage.clear();
    return ({ type: "LOGOUT" })
}
