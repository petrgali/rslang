import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button, Message } from "rsuite"
import { USER } from "../../services/constant"
import CustomDrawer from "../CustomDrawer/CustomDrawer"
import interfaceAPI from "../../services/interfaceAPI"
import { getUserCredentials } from "../../redux/actions/credentialsAction"
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
    }, [registerMode])
    const handleRegister = () => {
        updateRegistermode(true)
        updateTitle("Регистрация")
    }
    const handleCloseRegister = () => {
        updateRegistermode(false)
        updateTitle("Вход")
    }

    const authService = {
        sendLoginInfo: (data) => {
            updateQueryProgress(true)
            updateLoginError()
            interfaceAPI.loginUser(data)
                .then(response => {
                    if (response.status === 200) {
                        let { name, userId } = response.payload
                        interfaceAPI.getUserbyId(userId)
                            .then(response => {
                                let { avatar } = response.payload
                                dispatch(getUserCredentials({ name: name, userId: userId, avatar: avatar }))
                            })
                    } else {
                        updateLoginError(response.payload)
                    }
                    updateQueryProgress(false)
                })
        },
        sendRegisterInfo: (data) => {
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
                        })
                            .then(response => {
                                if (response.status !== 200) updateRegisterError(response.payload)
                            })
                    } else {
                        updateRegisterError(response.payload)
                    }
                    updateQueryProgress(false)
                })
        },
        logout: () => {
            dispatch(getUserCredentials({}))
            localStorage.setItem(USER.ID, "")
            localStorage.setItem(USER.NAME, "")
            setDefault(true)
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
                            showIcon
                            type="warning"
                            title="Что-то не в порядке"
                            description={registerError} />
                    }
                    {loginError && <Message
                        showIcon
                        type="warning"
                        title="Что-то не в порядке"
                        description={loginError} />}
                    {!registerMode && <LoginForm
                        user={user}
                        handleShow={handleShow}
                        logOut={authService.logout}
                        queryInProgress={queryInProgress}
                        loginError={loginError}
                        sendLoginInfo={authService.sendLoginInfo} />}
                    {registerMode &&
                        <>
                            <RegisterForm
                                queryInProgress={queryInProgress}
                                registerError={registerError}
                                sendRegister={authService.sendRegisterInfo}
                            />
                            <Button
                                className="form-button"
                                appearance="subtle"
                                onClick={handleCloseRegister}
                            >Отмена</Button>
                        </>
                    }
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