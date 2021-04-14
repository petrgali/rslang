import { generateGuessWords, shuffle } from "../hooks/hooks"
import { formValid } from "../utils/registerFormValidator"

describe("testing outer function in hooks", () => {
  test("testing shuffle", () => {
    const rangeArr = [...Array(10).keys()]

    // 1 test
    expect(shuffle(rangeArr)).not.toBe(rangeArr)

    const shortArr = [1]

    // 2 test
    expect(shuffle(shortArr)).toBe(shortArr)
  })

  test("testing generate guess words", () => {
    const rangeArr = [...Array(10).keys()]

    const guessWords = generateGuessWords(rangeArr, 0, 4)

    // 3 test
    expect(guessWords.length).toBe(4)

    // 4 test
    expect(new Set(guessWords).size).toBe(4)
  })
})

describe("testing register form validators", () => {
  const initialValidData = {
    name: "test",
    email: "test@gmail.com",
    passwordVerify: "Testtest",
    password: "Testtest",
    avatar: { data: 4000 }
  }

  Object.freeze(initialValidData)

  test("testing validator for valid data", () => {
    const validData = initialValidData

    // 5 test
    expect(formValid(validData).error).toBe(undefined)
  })

  test("testing validator for name invalid data", () => {
    const validData = { ...initialValidData }
  
    // 6 test
    validData.name = "a"
    expect(formValid(validData).error).toBe("Имя слишком короткое")

    // 7 test
    validData.name = "a".repeat(25)
    expect(formValid(validData).error).toBe("Имя слишком длинное")

  })

  test("testing validator for email invalid data", () => {
    const validData = { ...initialValidData }
  
    // 8 test
    validData.email = "a"
    expect(formValid(validData).error).toBe("Введите корректный адрес электронной почты")

  })

  test("testing validator for password invalid data", () => {
    const validData = { ...initialValidData }
  
    // 9 test
    validData.password = "pass"
    expect(formValid(validData).error).toBe("Пароль слишком короткий")
    
  })

  test("testing validator for password verify invalid data", () => {
    const validData = { ...initialValidData }
  
    // 10 test
    validData.passwordVerify = "pass"
    expect(formValid(validData).error).toBe("Пароли не совпадают")
    
  })

  test("testing validator for avatar verify invalid data", () => {
    const validData = { ...initialValidData }
  
    // 11 test
    validData.avatar = { size: 6000000 }
    expect(formValid(validData).error).toBe("Файл слишком большой")
    
  })
})