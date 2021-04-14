import React from "react";
import { Divider } from "rsuite";
import SectionsNav from "./components/SectionsNav";
import Dictionary from "../ElectronicTextbook/components/Dictionary/Dictionary";
import { STATUS } from "../../components/constant";
import "./ElectronicTextbook.css"
import { useSelector } from "react-redux";
import UnAuth from "../../components/UnAuth/UnAuth";

const ElectronicTextbook = () => {
  const userId = useSelector(state => state.credentials.userId)

  return (
    <div className="electronic-textbook">
      <h1 className="title">Электронный учебник</h1>
      <h2 className="subtitle">Разделы</h2>
      <Divider className="divider" />
      <SectionsNav />
      <h2 className="subtitle">Словарь</h2>
      <Divider className="divider" />
      {userId ? (
        <Dictionary
          mode={STATUS.DELETED}
        />
      ) : (
        <UnAuth />
      )}
    </div>
  )
}

export default ElectronicTextbook
