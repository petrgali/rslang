import { useState, useEffect } from "react"
import { Icon, IconButton, InputGroup, Input, Button } from "rsuite"
import CustomDrawer from "../CustomDrawer/CustomDrawer"
import PwdInputHandler from "../PwdInputHandler"
import "./Auth.css"

const Auth = ({ showLogin, handleShow }) => {
    const [title, updateTitle] = useState("ВХОД")
    const [registerModeOn, setRegisterMode] = useState(false)
    const [pwdMain, updatePwdMain] = useState("")
    const [pwdSecond, updatePwdSecond] = useState("")
    const [lockType, updateLockType] = useState("unlock")


    const clearBothPwd = () => {
        updatePwdMain("")
        updatePwdSecond("")
    }

    useEffect(() => {
        registerModeOn
            ? updateTitle("РЕГИСТРАЦИЯ")
            : updateTitle("ВХОД")
        updatePwdMain("")
        updatePwdSecond("")
    }, [registerModeOn])
    useEffect(() => {
        checkPwdIdent()
    }, [pwdMain, pwdSecond])
    useEffect(() => {
        checkPwdIdent()
    }, [])

    const handleRegister = () => setRegisterMode(!registerModeOn)

    const checkPwdIdent = () => {
        if (pwdMain === pwdSecond && !!pwdMain) {
            updateLockType("lock")
            return
        }
        updateLockType("unlock")
    }
    return (
        <CustomDrawer
            title={title}
            show={showLogin}
            handleShow={handleShow}
            content={
                <>
                    <InputGroup inside className="inputgroup-box">
                        <Input placeholder="Ваш email" size="lg" />
                        <InputGroup.Addon>
                            <Icon icon="envelope" size="2x" />
                        </InputGroup.Addon>
                    </InputGroup>
                    {!registerModeOn &&
                        <>
                            <PwdInputHandler
                                title="Ваш пароль"
                                inputValue={pwdMain}
                                updateValue={(value) => updatePwdMain(value)}
                                lockType="shield"
                                clearHandle={clearBothPwd}
                            />
                            <Button
                                className="drawer-button"
                                appearance="primary">ВОЙТИ
                            </Button>
                            <Button
                                style={{ width: "150px" }}
                                appearance="link"
                                onClick={handleRegister}
                            >Зарегистрироваться
                            </Button>
                        </>}
                    {registerModeOn &&
                        <>
                            <InputGroup inside className="inputgroup-box">
                                <Input placeholder="Ваше имя" size="lg" />
                                <InputGroup.Addon>
                                    <Icon icon="avatar" size="2x" />
                                </InputGroup.Addon>
                            </InputGroup>
                            <PwdInputHandler
                                title="придумайте пароль"
                                inputValue={pwdMain}
                                updateValue={(value) => updatePwdMain(value)}
                                lockType={lockType}
                                clearHandle={clearBothPwd}
                            />
                            <PwdInputHandler
                                title="повторите пароль"
                                inputValue={pwdSecond}
                                updateValue={(value) => updatePwdSecond(value)}
                                lockType={lockType}
                                clearHandle={() => updatePwdSecond("")}
                            />
                            <Button
                                className="drawer-button"
                                appearance="primary">
                                ОТПРАВИТЬ</Button>
                            <Button
                                className="drawer-button"
                                appearance="subtle"
                                onClick={handleRegister}
                            >ОТМЕНА</Button>
                        </>
                    }


                </>
            } />
    )
}

export default Auth