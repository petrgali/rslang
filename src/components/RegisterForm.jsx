import { useState, useEffect } from "react"
import { Form, FormGroup, ButtonToolbar, FormControl, Button, Uploader, Message } from "rsuite"
import { formValid } from "../utils/registerFormValidator"

const centered = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
}

const RegisterForm = ({ queryInProgress, sendRegister }) => {
    const [formValue, updateFormValue] = useState({
        name: "",
        email: "",
        password: "",
        passwordVerify: "",
        avatar: ""
    })
    useEffect(() => {
        updateValidationError(formValid(formValue).error)
    }, [formValue])
    const setFormValues = (data) => updateFormValue({ ...formValue, ...data })
    const [validationError, updateValidationError] = useState()
    const setBase64Image = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = setFormValues({ avatar: file })
    }
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
                    value={formValue.passwordVerify}
                    placeholder="повторите Ваш пароль"
                    name="passwordVerify"
                    type="password" />
            </FormGroup>
            <Uploader
                listType="picture"
                autoUpload={false}
                multiple={false}
                accept="image/*"
                onChange={(data) => {
                    if (data.length > 0) setBase64Image(data[0].blobFile)
                }}
            >
                <Button className="form-button" appearance="subtle">АВАТАР</Button>
            </Uploader>

            {validationError && <Message
                showIcon
                type="warning"
                title="Что-то не в порядке"
                description={validationError} />
            }
            {!validationError &&
                <ButtonToolbar style={centered}>
                    {queryInProgress
                        ? <Button
                            className="form-button"
                            appearance="primary"
                            loading ></Button>
                        : <Button
                            className="form-button"
                            appearance="primary"
                            onClick={() => sendRegister(formValue)}
                        >ОТПРАВИТЬ</Button>
                    }
                </ButtonToolbar>
            }

        </Form>
    )
}

export default RegisterForm