import { Pagination } from "rsuite"

const PageToggler = ({ updatePage, activePage, totalPages }) => {
    const handle = (eventKey) => updatePage(eventKey)
    return (
        <Pagination
            first
            last
            prev
            next
            maxButtons={3}
            size="lg"
            pages={totalPages}
            activePage={activePage}
            onSelect={handle}
        />
    )
}

export default PageToggler