import { List, Placeholder } from "rsuite"
import "./ListPlaceholder.css"

const { Paragraph } = Placeholder

const ListPlaceholder = () => {
  return (
    <>
      <List>
        {[...Array(20)].map((value, valueKey) =>
          <List.Item key={valueKey}>
            <div className="placeholder-box">
              <Paragraph
                  rows={2}
                  graph="circle"
                  active
              />
            </div>
          </List.Item>
        )}
      </List>
    </>
  )
}

export default ListPlaceholder