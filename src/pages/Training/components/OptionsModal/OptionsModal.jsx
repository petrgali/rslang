import { useState } from "react"
import { Button, Modal, Toggle } from "rsuite"
import "./OptionsModal.css"

const Options = ({ showControl, showTranslate, toggleControl, toggleTranslate }) => {
    const [modalOpen, updateModal] = useState(false)
    const handleModal = () => updateModal(!modalOpen)

    return (
        <>
            <div className="options-box">
                <h3>Список Слов</h3>
                <div onClick={handleModal} className="options-button">
                    <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M27.4662 18.0235L24.9701 16.5821C25.222 15.2227 25.222 13.8282 24.9701 12.4688L27.4662 11.0274C27.7533 10.8633 27.8822 10.5235 27.7884 10.2071C27.1381 8.12115 26.0306 6.23443 24.5834 4.66412C24.3607 4.42388 23.9974 4.36529 23.7162 4.52935L21.2201 5.97076C20.1713 5.06842 18.9642 4.37115 17.6576 3.91412V1.03716C17.6576 0.709039 17.4291 0.42193 17.1068 0.351617C14.9564 -0.128851 12.7533 -0.105414 10.7084 0.351617C10.3861 0.42193 10.1576 0.709039 10.1576 1.03716V3.91998C8.8568 4.38287 7.64977 5.08013 6.59508 5.97662L4.10485 4.53521C3.81774 4.37115 3.46032 4.42388 3.23766 4.66998C1.7904 6.23443 0.682976 8.12115 0.0325851 10.2129C-0.0670243 10.5294 0.0677414 10.8692 0.354851 11.0333L2.85094 12.4747C2.59899 13.834 2.59899 15.2286 2.85094 16.5879L0.354851 18.0294C0.0677414 18.1934 -0.0611649 18.5333 0.0325851 18.8497C0.682976 20.9356 1.7904 22.8223 3.23766 24.3926C3.46032 24.6329 3.8236 24.6915 4.10485 24.5274L6.60094 23.086C7.64977 23.9883 8.8568 24.6856 10.1634 25.1426V28.0254C10.1634 28.3536 10.392 28.6407 10.7142 28.711C12.8646 29.1915 15.0677 29.168 17.1127 28.711C17.4349 28.6407 17.6634 28.3536 17.6634 28.0254V25.1426C18.9642 24.6797 20.1713 23.9825 21.2259 23.086L23.722 24.5274C24.0091 24.6915 24.3666 24.6387 24.5892 24.3926C26.0365 22.8282 27.1439 20.9415 27.7943 18.8497C27.8822 18.5274 27.7533 18.1876 27.4662 18.0235ZM13.9076 19.2129C11.3236 19.2129 9.22009 17.1094 9.22009 14.5254C9.22009 11.9415 11.3236 9.83795 13.9076 9.83795C16.4916 9.83795 18.5951 11.9415 18.5951 14.5254C18.5951 17.1094 16.4916 19.2129 13.9076 19.2129Z" fill="#272C36" />
                    </svg>
                </div>
            </div>
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
                        <div className="options-list">
                            <div className="options-item">
                                показывать перевод
                                <Toggle
                                    checked={showTranslate}
                                    onChange={toggleTranslate}
                                />
                            </div>
                            <div className="options-item">
                                показывать управление
                                <Toggle
                                    checked={showControl}
                                    onChange={toggleControl}
                                />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={() => updateModal(!modalOpen)} appearance="subtle">
                            закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default Options