import { Switch, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import { NotFound } from "./NotFound"
import { ROOT } from "./CONSTANT"

export const RouterConfig = () => {
    return (
        <>
            <Switch>
                {/*Public route example*/}
                <Route exact path={ROOT} component={Home} />
                {/*generic 404 route*/}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}