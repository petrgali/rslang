import { useState } from "react"
import { useSelector } from "react-redux"
import { Button, Form, FormGroup, FormControl, ButtonToolbar } from "rsuite"

const centered = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const LoginForm = ({ user, handleShow, logOut, queryInProgress, sendLoginInfo }) => {
    const avatar = useSelector(state => state.credentials.avatar)
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
                        onClick={handleShow}
                    >ПРОДОЛЖИТЬ</Button>
                    <Button
                        className="form-button"
                        appearance="primary"
                        onClick={logOut}
                        color="orange"
                    >ВЫЙТИ</Button>
                </>
                : <Form onChange={setFormValues}>
                    <FormGroup style={centered} >
                        <FormControl className="form-field"
                            value={formValue.email}
                            placeholder="Ваш email"
                            name="email" />
                        <FormControl className="form-field"
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
                                loading ></Button>
                            : <Button
                                className="form-button"
                                appearance="primary"
                                onClick={() => sendLoginInfo(formValue)}
                            >ВОЙТИ</Button>
                        }
                    </ButtonToolbar>
                </Form>
            }
        </>
    )
}

export default LoginForm