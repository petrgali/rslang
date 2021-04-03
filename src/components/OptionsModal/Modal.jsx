import { Button, Modal, Toggle } from "rsuite"
import "./Modal.css"

const ModalBox = ({showControl, showTranslate, toggleControl, toggleTranslate, handleModal, modalOpen}) => {
    return (
        <Modal
            show={modalOpen}
            onHide={handleModal}
            size={"xs"} >
            <Modal.Header closeButton={false}>
                <Modal.Title>
                    Настройки Учебника
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="modal-list">
                    <div className="modal-item">
                        показывать перевод
                    <Toggle
                            checked={showTranslate}
                            onChange={toggleTranslate}
                        />
                    </div>
                    <div className="modal-item">
                        показывать управление
                    <Toggle
                            checked={showControl}
                            onChange={toggleControl}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleModal} appearance="subtle">
                    закрыть
            </Button>
            </Modal.Footer>
        </Modal>
    )
}
export default ModalBox