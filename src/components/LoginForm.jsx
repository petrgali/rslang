import { Button, Form, FormGroup, FormControl, ButtonToolbar } from "rsuite"

const centered = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const LoginForm = ({ user, handleShow, formValue, setFormValues, logOut, queryInProgress, sendLoginInfo }) => {
    return (
        <>
            { user
                ? <>
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
                : <Form onChange={setFormValues} >
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
                                onClick={sendLoginInfo}
                            >ВОЙТИ</Button>
                        }
                    </ButtonToolbar>
                </Form>
            }
        </>
    )
}

export default LoginForm