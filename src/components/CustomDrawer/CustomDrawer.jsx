import React from "react";
import { Drawer } from "rsuite";
import "./CustomDrawer.css";

const CustomDrawer = ({ title, content, show, handleShow }) => {
  const handleHide = () => handleShow(false)

  return (
    <Drawer
      size="xs"
      placement="right"
      show={show}
      onHide={handleHide}
    >
      <Drawer.Header>
        <Drawer.Title>{ title }</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body className="custom-drawer-body">
        { content }
      </Drawer.Body>
      {/* <Drawer.Footer>
        <Button onClick={handleHide} appearance="subtle">
          Cancel
        </Button>
      </Drawer.Footer> */}
    </Drawer>
  )
}

export default CustomDrawer
