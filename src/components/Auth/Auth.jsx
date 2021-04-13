import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Message } from "rsuite"
import { USER } from "../../services/constant"
import CustomDrawer from "../CustomDrawer/CustomDrawer"
import interfaceAPI from "../../services/interfaceAPI"
import { updateUserCredentials } from "../../redux/actions/credentialsAction"
import LoginForm from "../LoginForm"
import RegisterForm from "../RegisterForm"
import setDefault from "../../services/setOptionsDefault"
import "./Auth.css"

const Auth = ({ showLogin, handleShow }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.credentials.name)
    const [title, updateTitle] = useState("Вход")
    const [registerMode, updateRegistermode] = useState(false)
    const [queryInProgress, updateQueryProgress] = useState(false)
    const [loginError, updateLoginError] = useState()
    const [registerError, updateRegisterError] = useState()

    useEffect(() => {
        user
            ? updateTitle(`Привет, ${user}!`)
            : updateTitle("Вход")
    }, [user])
    useEffect(() => {
        updateLoginError()
        updateRegisterError()
    }, [registerMode])
    const handleRegister = () => {
        updateRegistermode(true)
        updateTitle("Регистрация")
    }
    const handleCloseRegister = () => {
        updateRegistermode(false)
        updateTitle("Вход")
    }
    const isFormFulilled = (form) => {
        return Object.keys(form)
            .some(key => !form[key] && key !== "avatar")
    }

    const authService = {
        sendLoginInfo: (data) => {
            updateQueryProgress(true)
            updateLoginError()
            interfaceAPI.loginUser(data)
                .then(response => {
                    if (response.status === 200) {
                        let { name, userId } = response.payload
                        dispatch(updateUserCredentials({
                            name: name,
                            userId: userId,
                        }))
                        window.location.reload()
                    } else {
                        updateLoginError(response.payload)
                    }
                    updateQueryProgress(false)
                })
        },
        sendRegisterInfo: (data) => {
            if (isFormFulilled(data)) {
                updateRegisterError("Заполните все поля")
                return
            }
            updateQueryProgress(true)
            updateRegisterError()
            let form = new FormData()
            form.append("avatar", data.avatar)
            interfaceAPI.avatarUpload(form)
                .then(response => {
                    if (response.status === 200) {
                        interfaceAPI.registerUser({
                            name: data.name,
                            email: data.email,
                            password: data.password,
                            avatar: response.payload.secure_url
                        }).then(response => {
                            if (response.status === 200) {
                                authService.sendLoginInfo({
                                    email: data.email,
                                    password: data.password
                                })
                                handleCloseRegister()
                                return
                            }
                            updateRegisterError(response.payload)
                        })
                    } else {
                        updateRegisterError(response.payload)
                    }
                    updateQueryProgress(false)
                })
        },
        logout: () => {
            dispatch(updateUserCredentials({}))
            localStorage.removeItem(USER.ID)
            localStorage.removeItem(USER.NAME)
            localStorage.removeItem(USER.TOKEN)
            localStorage.removeItem(USER.REFRESH_TOKEN)
            setDefault(true)
            window.location.reload()
        }
    }
    return (
        <CustomDrawer
            title={title}
            show={showLogin}
            handleShow={handleShow}
            content={(
                <>
                    {registerError &&
                        <Message
                            style={{ width: 270 }}
                            showIcon
                            closable
                            onClose={() => updateRegisterError()}
                            type="warning"
                            title="Что-то не в порядке"
                            description={registerError} />
                    }
                    {loginError && <Message
                        showIcon
                        closable
                        onClose={() => updateLoginError()}
                        type="warning"
                        title="Что-то не в порядке"
                        description={loginError} />}
                    {registerMode
                        ? <>
                            <RegisterForm
                                queryInProgress={queryInProgress}
                                registerError={registerError}
                                handleError={updateRegisterError}
                                sendRegister={authService.sendRegisterInfo}
                            />
                            <Button
                                className="form-button"
                                appearance="subtle"
                                onClick={handleCloseRegister}
                            >Отмена</Button>
                        </>
                        : <LoginForm
                            user={user}
                            handleShow={handleShow}
                            logOut={authService.logout}
                            queryInProgress={queryInProgress}
                            loginError={loginError}
                            sendLoginInfo={authService.sendLoginInfo} />}
                    {!user && !registerMode && <Button
                        className="form-button"
                        appearance="link"
                        onClick={handleRegister}>
                        Зарегистрироваться</Button>}
                </>
            )}
        />
    )
}

export default Auth