//eslint-disable-next-line
const mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

const validationRules = {
    name: [
        (data) => { if (data.length < 2) return "имя слишком короткое" },
        (data) => { if (data.length > 20) return "имя слишком длинное" },
        (data) => { if (!data) return "введите имя" }
    ],
    email: [
        (data) => { if (!mailformat.test(data)) return "введите корректный email" }
    ],
    password: [
        (data) => { if (data.length < 8) return "пароль слишком короткий" }
    ],
    passwordVerify: [
        (a, b) => { if (a !== b) return "пароли не совпадают" }
    ]
    ,
    avatar: [
        (data) => { if (data.size > 5000000) return "файл слишком большой" },
        (data) => { if (!data) return "выберите аватар" }
    ]
}

export const formValid = (form) => {
    let error
    Object.keys(form).forEach(property => {
        if (property !== "passwordVerify") {
            validationRules[property].forEach(rule => {
                if (rule(form[property])) {
                    error = rule(form[property])
                }

            })
        } else {
            validationRules[property].forEach(rule => {
                if (rule(form.password, form.passwordVerify)) {
                    error = rule(form.password, form.passwordVerify)
                }
            })
        }
    })
    return { error: error }
}
