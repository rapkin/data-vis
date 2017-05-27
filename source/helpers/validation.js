export const password = (value) => {
    if (!value) return 'Required'
    else if (!/^[a-z0-9_]{3,20}$/i.test(value)) return 'Invalid password'
}

export const username = (value) => {
    if (!value) return 'Required'
    else if (!/^[a-z0-9_]{3,20}$/i.test(value)) return 'Invalid username'
}

export const loginForm = (values) => ({
    username: username(values.username),
    password: password(values.password)
})
