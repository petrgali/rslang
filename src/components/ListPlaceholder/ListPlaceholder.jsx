import { Placeholder } from "rsuite"
import "./ListPlaceholder.css"
const { Paragraph } = Placeholder
const ListPlaceholder = () => {
    let list = "0123456789"
    return (
        <>
            {[...list].map(value =>
                <div className="placeholder-box" key={value}>
                    <Paragraph
                        rows={4}
                        graph="image"
                        active
                    />
                </div>
            )}
        </>
    )
}

export default ListPlaceholder