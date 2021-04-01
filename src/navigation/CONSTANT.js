export const ROOT = "/"
export const MINI_GAMES_ROUTE = "/mini-games"
export const SAVANNAH_ROUTE = "/mini-games/savannah"
export const AUDIOCALL_ROUTE = "/mini-games/audiocall"
export const SPRINT_ROUTE = "/mini-games/sprint"
export const OWN_GAME_ROUTE = "/mini-games/own-game"
export const SAVANNAH_LEVELS_ROUTE = "/mini-games/savannah/levels"
export const AUDIOCALL_LEVELS_ROUTE = "/mini-games/audiocall/levels"
export const SPRINT_LEVELS_ROUTE = "/mini-games/sprint/levels"
export const OWN_GAME_LEVELS_ROUTE = "/mini-games/own-game/levels"


export const MINI_GAMES_DATA = {
  savannah: {
    name: "Саванна",
    about: [
      'Мини-игра "Саванна" – это тренажер по переводу твоего пассивного изученного словаря в активную стадию.',
      "Управлять мини-игрой можно как мышкой, так и клавишами на клавиатуре (1, 2, 3, 4)."
    ],
    location: SAVANNAH_LEVELS_ROUTE,
  },
  audiocall: {
    name: "Аудиовызов",
    about: [
      'Мини-игра "Аудиовызов" - это тренировка, развивающая навыки речи и перевода.',
      "Управлять мини-игрой можно как мышкой, так и клавишами на клавиатуре (1, 2, 3, 4, 5)."
    ],
    location: AUDIOCALL_LEVELS_ROUTE,
  },
  sprint: {
    name: "Спринт",
    about: [
      'Мини-игра "Спринт" - это тренировка для повторения заученных слов из вашего словаря.',
      "Управлять мини-игрой можно как мышкой, так и клавишами на клавиатуре (1, 2)."
    ],
    location: SPRINT_LEVELS_ROUTE,
  }
}
