import { useEffect } from "react"
import { Form, FormGroup, ButtonToolbar, FormControl, Button } from "rsuite"

const centered = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const RegisterForm = ({ formValue, setFormValues, queryInProgress, sendRegister }) => {

    return (
        <Form onChange={setFormValues}>
            <FormGroup style={centered} >
                <FormControl className="form-field"
                    value={formValue.name}
                    placeholder="Ваше имя"
                    name="name" />
                <FormControl className="form-field"
                    value={formValue.email}
                    placeholder="Ваш email"
                    name="email" />
                <FormControl className="form-field"
                    value={formValue.password}
                    placeholder="Ваш пароль"
                    name="password"
                    type="password" />
                <FormControl className="form-field"
                    placeholder="повторите Ваш пароль"
                    name="passControl"
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
                        onClick={sendRegister}
                    >ОТПРАВИТЬ</Button>
                }
            </ButtonToolbar>
        </Form>
    )
}

export default RegisterForm