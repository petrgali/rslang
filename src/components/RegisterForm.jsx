import { useState, useEffect } from "react"
import { Form, FormGroup, FormControl, Button, Uploader, Icon } from "rsuite"
import { formValid } from "../utils/registerFormValidator"

const centered = {
    position: "relative",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    overflowX: "hidden",
    overflowY: "hidden",
}

const RegisterForm = ({ queryInProgress, sendRegister, handleError }) => {
    const [formValue, updateFormValue] = useState({
        name: "",
        email: "",
        password: "",
        passwordVerify: "",
        avatar: ""
    })
    useEffect(() => {
        const validated = formValid(formValue)
        updateValidationError(validated.error)
        handleError(validated.error)
    }, [formValue, handleError])
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
                <FormControl
                    style={{ width: "100%" }}
                    className="form-field"
                    value={formValue.name}
                    placeholder="Ваше имя"
                    name="name" />
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
                <FormControl
                    style={{ width: "100%" }}
                    className="form-field"
                    value={formValue.passwordVerify}
                    placeholder="Повторите Ваш пароль"
                    name="passwordVerify"
                    type="password" />
                <Uploader
                    style={{ width: 227 }}
                    listType="picture"
                    autoUpload={false}
                    multiple={false}
                    accept="image/*"
                    onRemove={() => updateFormValue({ ...formValue, avatar: "" })}
                    onChange={(data) => {
                        if (data.length > 0) setBase64Image(data[0].blobFile)
                    }}
                >
                    <button>
                      <Icon icon='avatar' size="lg" />
                    </button>
                </Uploader>
            </FormGroup>
            <div className="form-submit" style={centered}>
                {queryInProgress
                    ? <Button
                        className="form-button"
                        appearance="primary"
                        loading />
                    : <Button
                        appearance="primary"
                        disabled={validationError}
                        onClick={() => sendRegister(formValue)}
                    >Зарегистрироваться</Button>
                }
            </div>
        </Form>
    )
}

export default RegisterForm