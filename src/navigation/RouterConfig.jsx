import { Switch, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import NotFound from "../components/NotFound/NotFound"
import { AUDIOCALL_LEVELS_ROUTE, AUDIOCALL_ROUTE, MINI_GAMES_ROUTE, ROOT, SAVANNAH_LEVELS_ROUTE, SAVANNAH_ROUTE, SPRINT_LEVELS_ROUTE, SPRINT_ROUTE } from "./CONSTANT"
import MiniGames from "../pages/MiniGames/MiniGames"
import MiniGameLevels from "../pages/MiniGameLevels/MiniGameLevels"
import Savannah from "../pages/Savannah/Savannah"
import Audiocall from "../pages/Audiocall/Audiocall"
import Sprint from "../pages/Sprint/Sprint"

export const RouterConfig = () => {
    return (
        <>
            <Switch>
                {/*Public route example*/}
                <Route exact path={ROOT} component={Home} />
                <Route exact path={MINI_GAMES_ROUTE} component={MiniGames} />
                <Route exact path={SAVANNAH_ROUTE} component={() => <MiniGameLevels name="Savannah" />} />
                <Route exact path={AUDIOCALL_ROUTE} component={() => <MiniGameLevels name="Audiocall" />} />
                <Route exact path={SPRINT_ROUTE} component={() => <MiniGameLevels name="Sprint" />} />
                <Route exact path={SAVANNAH_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (match.params.level < 1 || match.params.level > 6) return <NotFound />
                  return <Savannah match={match} />
                }} />
                <Route exact path={AUDIOCALL_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (match.params.level < 1 || match.params.level > 6) return <NotFound />
                  return <Audiocall match={match} />
                }} />
                <Route exact path={SPRINT_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (match.params.level < 1 || match.params.level > 6) return <NotFound />
                  return <Sprint match={match} />
                }} />
                {/*generic 404 route*/}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}
