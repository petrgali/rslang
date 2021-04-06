import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Button } from "rsuite"
import CustomDrawer from "../CustomDrawer/CustomDrawer"
import "./Auth.css"
import interfaceAPI from "../../services/interfaceAPI"
import { getUserCredentials } from "../../redux/actions/credentialsAction"
import LoginForm from "../LoginForm"
import RegisterForm from "../RegisterForm"

const Auth = ({ showLogin, handleShow }) => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.credentials.name)
    const [title, updateTitle] = useState("Вход")
    const [registerMode, updateRegistermode] = useState(false)
    const [formValue, updateFormValue] = useState({
        email: "",
        password: ""
    })
    const [registerFormValue, updateRegisterForm] = useState({
        name: "",
        email: "",
        password: "",
        // avatar: ""
    })
    const [queryInProgress, updateQueryProgress] = useState(false)
    const logOut = () => dispatch(getUserCredentials({}))
    const setFormValues = (data) => updateFormValue({ ...formValue, ...data })
    const setRegisterFormValues = (data) => updateRegisterForm({ ...registerFormValue, ...data })
    useEffect(() => {
        user
            ? updateTitle(`Привет, ${user}!`)
            : updateTitle("Вход")
    }, [user])
    const handleRegister = () => {
        updateRegistermode(true)
        updateTitle("Регистрация")
    }
    const handleCloseRegister = () => {
        updateRegistermode(false)
        updateTitle("Вход")
    }
    const sendLoginInfo = () => {
        updateQueryProgress(true)
        interfaceAPI.loginUser(formValue)
            .then(response => {
                if (response.status === 200) {
                    dispatch(getUserCredentials(response.payload))
                }
                updateQueryProgress(false)
            })
    }
    const sendRegisterInfo = () => {
        updateQueryProgress(true)
        interfaceAPI.registerUser(registerFormValue)
            .then(response => {
                ////////handle register
            })
        updateQueryProgress(false)
    }
    return (
        <CustomDrawer
            title={title}
            show={showLogin}
            handleShow={handleShow}
            content={(
                <>
                    {!registerMode && <LoginForm
                        user={user}
                        handleShow={handleShow}
                        formValue={formValue}
                        setFormValues={setFormValues}
                        logOut={logOut}
                        queryInProgress={queryInProgress}
                        sendLoginInfo={sendLoginInfo} />}
                    {registerMode &&
                        <>
                            <RegisterForm
                                formValue={registerFormValue}
                                setFormValues={setRegisterFormValues}
                                queryInProgress={queryInProgress}
                                sendRegister={sendRegisterInfo}
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