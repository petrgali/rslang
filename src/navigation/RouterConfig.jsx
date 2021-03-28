import { Switch, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import { NotFound } from "./NotFound"
import { MINI_GAMES_ROUTE, ROOT } from "./CONSTANT"
import MiniGames from "../pages/MiniGames/MiniGames"

export const RouterConfig = () => {
    return (
        <>
            <Switch>
                {/*Public route example*/}
                <Route exact path={ROOT} component={Home} />
                <Route exact path={MINI_GAMES_ROUTE} component={MiniGames} />
                {/*generic 404 route*/}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}