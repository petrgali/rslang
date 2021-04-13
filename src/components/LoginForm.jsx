import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Form, FormGroup, FormControl, ButtonToolbar } from "rsuite"
import avatarPlaceholder from "../assets/png/avatarPlaceholder.png"

const centered = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const LoginForm = ({ user, logOut, queryInProgress, sendLoginInfo }) => {
    const avatar = useSelector(state => state.credentials.avatar) || avatarPlaceholder
    const [formValue, updateFormValue] = useState({
        email: "",
        password: ""
    })
    const setFormValues = (data) => updateFormValue({ ...formValue, ...data })
    return (
        <>
            { user
                ? <>
                    {avatar && <img
                        className="form-avatar"
                        src={avatar}
                        alt="аватар пользователя" />}
                    <Button
                        className="form-button"
                        appearance="primary"
                        onClick={logOut}
                        color="orange"
                    >Выйти</Button>
                </>
                : <Form onChange={setFormValues}>
                    <FormGroup style={centered} >
                        <FormControl
                            style={{ width: "100%" }}
                            className="form-field"
                            value={formValue.email}
                            placeholder="Ваша электронная почта"
                            name="email" />
                        <FormControl
                            style={{ width: "100%" }}
                            className="form-field"
                            value={formValue.password}
                            placeholder="Ваш пароль"
                            name="password"
                            type="password" />
                    </FormGroup>
                    <ButtonToolbar style={centered}>
                        {queryInProgress
                            ? <Button
                                className="form-button"
                                appearance="primary"
                                loading />
                            : <Button
                                className="form-button"
                                appearance="primary"
                                onClick={() => sendLoginInfo(formValue)}
                            >Войти</Button>
                        }
                    </ButtonToolbar>
                </Form>
            }
        </>
    )
}

export default LoginForm