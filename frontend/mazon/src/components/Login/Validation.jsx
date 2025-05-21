function Validation(values) {
    let error = {}

    if (!values.username.trim()) {
        error.username = "Login nie może być pusty"
    }

    if (!values.password.trim()) {
        error.password = "Hasło nie może być puste"
    }

    return error
} export default Validation
