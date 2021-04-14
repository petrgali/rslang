import React from "react";
import { Icon, IconButton, Tooltip, Whisper } from "rsuite";
import "./ContainerFooter.css"

const ContainerFooter = () => {
  const tooltip = (username) => (
    <Tooltip>
      { username }
    </Tooltip>
  )

  return (
    <div className="footer">
      <Whisper placement="auto" trigger="hover" speaker={tooltip("RS School course")}>
        <a href="https://rs.school/react/">
          <img src="https://rs.school/images/rs_school_js.svg" alt="logo course" />
        </a>
      </Whisper>
      <div className="github-accounts">
        <Whisper placement="auto" trigger="hover" speaker={tooltip("@petrgali")}>
          <a href="https://github.com/petrgali">
            <IconButton
              appearance="link"
              icon={<Icon icon="github" />}
              circle
              size="lg"
            />
          </a>
        </Whisper>
        <Whisper placement="auto" trigger="hover" speaker={tooltip("@enthusiast17")}>
          <a href="https://github.com/enthusiast17">
            <IconButton
              appearance="link"
              icon={<Icon icon="github" />}
              circle
              size="lg"
            />
          </a>
        </Whisper>
      </div>
    </div>
  )
}


export default ContainerFooter
