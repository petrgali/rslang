import { InputGroup, Input, Icon, IconButton } from "rsuite"

const PwdInputHandler = ({ title, inputValue, updateValue, lockType, clearHandle }) => {
    return (
        <>
            <InputGroup inside className="inputgroup-box">
                <Input
                    placeholder={title}
                    size="lg"
                    type="password"
                    value={inputValue}
                    onChange={updateValue} />
                <InputGroup.Addon>
                    {inputValue &&
                        <IconButton
                            icon={<Icon icon="close" />}
                            circle size="sm"
                            className="icon-button"
                            onClick={clearHandle}
                        />
                    }
                    <Icon icon={lockType} size="2x" />
                </InputGroup.Addon>
            </InputGroup>
        </>
    )
}

export default PwdInputHandler