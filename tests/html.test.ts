import { JSDOM } from 'jsdom'
import path from 'path'
import fs from 'fs'

let sut : Document

describe('HTML', () => {
  beforeAll(() => {
    const html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')
    const dom = new JSDOM(html)
    sut = dom.window.document
  })

  expectElementIdToExist('H1', 'mainWeather')
  expectElementIdToExist('H1', 'temp')
  expectElementIdToExist('SELECT', 'tempStyle')
  expectElementIdToExist('P', 'errorMessage')
  expectElementIdToExist('H2', 'cityLocation')

  it('tempStyle dropdown should have options Celsius and Fahrenheit', () => {
    const elementToExist = sut.getElementById('tempStyle')
    const optionOne : HTMLOptionElement = elementToExist?.children[0] as HTMLOptionElement
    const optionTwo : HTMLOptionElement = elementToExist?.children[1] as HTMLOptionElement
    expect(optionOne.value).toBe('Celsius')
    expect(optionTwo.value).toBe('Fahrenheit')
  })
})

/**
 * Helper function to verify that a field is defined on the sut.
 *
 * @param {string} elementType - The type of element to expect.
 * @param {string} id - The id of the element to expect.
 */
function expectElementIdToExist (elementType : string, id : string) {
  it(`should have a ${elementType} element with id ${id}`, () => {
    const elementToExist = sut.getElementById(id)
    expect(elementToExist).not.toBeNull()
    expect(elementToExist?.tagName).toBe(elementType)
  })
}
