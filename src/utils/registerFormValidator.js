//eslint-disable-next-line
const mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validationRules = {
    name: [
        (data) => { if (data.length < 2) return "Имя слишком короткое" },
        (data) => { if (data.length > 20) return "Имя слишком длинное" },
        (data) => { if (!data) return "Введите имя" }
    ],
    email: [
        (data) => { if (!mailformat.test(data)) return "Введите корректный адрес электронной почты" }
    ],
    passwordVerify: [
        (a, b) => { if (a !== b) return "Пароли не совпадают" }
    ],
    password: [
        (data) => { if (data.length < 8) return "Пароль слишком короткий" }
    ],
    avatar: [
        (data) => { if (data.size > 5000000) return "Файл слишком большой" },
    ]
}

export const formValid = (form) => {
    let error
    Object.keys(form).forEach(property => {
        if (property === "passwordVerify" && !!form[property]) {
            validationRules[property].forEach(rule => {
                if (rule(form.password, form.passwordVerify)) {
                    error = rule(form.password, form.passwordVerify)
                }
            })
        }
        if (property !== "passwordVerify" && !!form[property]) {
            validationRules[property].forEach(rule => {
                if (rule(form[property])) {
                    error = rule(form[property])
                }
            })
        }
    })
    return { error: error }
}
