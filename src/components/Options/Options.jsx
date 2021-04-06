import { useState } from "react"
import { Divider, Icon, IconButton, Toggle } from "rsuite"
import CustomDrawer from "../CustomDrawer/CustomDrawer"
import "./Options.css"

const Options = ({ showControl, showTranslate, toggleControl, toggleTranslate }) => {
    // const [modalOpen, updateModal] = useState(false)
    // const handleModal = () => updateModal(!modalOpen)

    const [showDrawer, setShowDrawer] = useState(false)

    return (
        <>
            <div className="options-box">
                <h2 className="subtitle">Список cлов</h2>
                <IconButton
                  icon={<Icon icon="cog" />}
                  circle
                  size="lg"
                  onClick={() => setShowDrawer(true)}
                />
            </div>
            <Divider className="divider" />
            <CustomDrawer title="Настройки учебника" show={showDrawer} handleShow={setShowDrawer} content={
                <>
                  <div className="options-item">
                    <span>показывать перевод</span>
                    <Toggle
                      className="toggle"
                      checked={showTranslate}
                      onChange={toggleTranslate}
                    />
                  </div>
                  <div className="options-item">
                    <span>показывать управление</span>
                    <Toggle
                      className="toggle"
                      checked={showControl}
                      onChange={toggleControl}
                    />
                  </div>
                </>
              } />
        </>
    )
}

export default Options