import { Switch, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import NotFound from "../components/NotFound/NotFound"
import {
  AUDIOCALL_LEVELS_ROUTE,
  AUDIOCALL_ROUTE, ELECTRONIC_TEXTBOOK_ROUTE, ELECTRONIC_TEXTBOOK_SECTION_ROUTE, MINI_GAMES_ROUTE,
  OWN_GAME_LEVELS_ROUTE, OWN_GAME_ROUTE,
  ROOT, SAVANNAH_LEVELS_ROUTE,
  SAVANNAH_ROUTE,
  SPRINT_LEVELS_ROUTE,
  SPRINT_ROUTE,
} from "./CONSTANT"
import MiniGames from "../pages/MiniGames/MiniGames"
import MiniGameLevels from "../pages/MiniGameLevels/MiniGameLevels"
import Savannah from "../pages/Savannah/Savannah"
import Audiocall from "../pages/Audiocall/Audiocall"
import Sprint from "../pages/Sprint/Sprint"
import OwnGame from "../pages/OwnGame/OwnGame"
import ElectronicTextbook from "../pages/ElectronicTextbook/ElectronicTextbook"
import Section from "../pages/Section/Section"

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
                <Route exact path={OWN_GAME_ROUTE} component={() => <MiniGameLevels name="Own game" />} />
                <Route exact path={SAVANNAH_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (isNaN(parseFloat(match.params.level)) ||
                      match.params.level < 1 ||
                      match.params.level > 6) return <NotFound />
                  return <Savannah match={match} />
                }} />
                <Route exact path={AUDIOCALL_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (isNaN(parseFloat(match.params.level)) ||
                      match.params.level < 1 ||
                      match.params.level > 6) return <NotFound />
                  return <Audiocall match={match} />
                }} />
                <Route exact path={SPRINT_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (isNaN(parseFloat(match.params.level)) ||
                      match.params.level < 1 ||
                      match.params.level > 6) return <NotFound />
                  return <Sprint match={match} />
                }} />
                <Route exact path={OWN_GAME_LEVELS_ROUTE + "/:level"} component={({ match }) => {
                  if (isNaN(parseFloat(match.params.level)) ||
                      match.params.level < 1 ||
                      match.params.level > 6) return <NotFound />
                  return <OwnGame match={match} />
                }} />
                <Route exact path={ELECTRONIC_TEXTBOOK_ROUTE} component={ElectronicTextbook} />
                <Route exact path={ELECTRONIC_TEXTBOOK_SECTION_ROUTE + "/:section"} component={({ match }) => {
                  match.params.page = 1                  
                  if (isNaN(parseFloat(match.params.section)) ||
                      match.params.section < 1 ||
                      match.params.section > 6) return <NotFound />
                  return <Section match={match} />
                }} />
                <Route exact path={ELECTRONIC_TEXTBOOK_SECTION_ROUTE + "/:section/page/:page"} component={({ match }) => {    
                  if (isNaN(parseFloat(match.params.section)) ||
                      match.params.section < 1 ||
                      match.params.section > 6) return <NotFound />
                  if (isNaN(parseFloat(match.params.page)) ||
                      match.params.page < 1 ||
                      match.params.page > 30) return <NotFound />
                  return <Section match={match} />
                }} />
                {/*generic 404 route*/}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
        </>
    )
}
