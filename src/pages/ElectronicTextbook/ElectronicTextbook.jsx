import React from "react";
import { Divider } from "rsuite";
import SectionsNav from "./components/SectionsNav";
import Dictionary from "../ElectronicTextbook/components/Dictionary/Dictionary";
import { STATUS } from "../../components/constant";
import "./ElectronicTextbook.css"

const ElectronicTextbook = () => {

  return (
    <div className="electronic-textbook">
      <h1 className="title">Электронный учебник</h1>
      <h2 className="subtitle">Разделы</h2>
      <Divider className="divider" />
      <SectionsNav />
      <h2 className="subtitle">Словарь</h2>
      <Divider className="divider" />
      <Dictionary
        mode={STATUS.DELETED}
      />
    </div>
  )
}

export default ElectronicTextbook
