import { Link } from "react-router-dom"
import { ROOT } from "./CONSTANT"

export const NotFound = () => {
    return (
        <>
            <Link to={ROOT}>Home</Link>
            <h2>Not found - 404</h2>
        </>
    )
}