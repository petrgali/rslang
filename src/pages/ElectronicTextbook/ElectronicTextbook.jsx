import React from "react";
import { Divider } from "rsuite";
import SectionsNav from "./components/SectionsNav";
import "./ElectronicTextbook.css"

const ElectronicTextbook = () => {

  return (
    <div className="electronic-textbook">
      <h1 className="title">Электронный учебник</h1>
      <h2 className="subtitle">Раздели</h2>
      <Divider className="divider" />
      <SectionsNav />
      <h2 className="subtitle">Словарь</h2>
      <Divider className="divider" />
    </div>
  )
}

export default ElectronicTextbook
