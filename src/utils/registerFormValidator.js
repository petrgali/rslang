export const formValid = (form) => {
    let error
    let mailformat = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


    let { name, email, password, passwordVerify, avatar } = form
    if (!avatar) error = "выберите аватар"
    if (password !== passwordVerify) error = "пароли не совпадают"
    if (avatar.size > 5000000) error = "файл слишком большой"
    if (password.length < 8) error = "пароль слишком короткий"
    if (name.length > 20) error = "имя слишком длинное"
    if (name.length < 2) error = "имя слишком короткое"
    if (!mailformat.test(email)) error = "введите корректный email"
    if (!name) error = "введите имя"
    return { error: error }
}