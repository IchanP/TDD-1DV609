import { jest } from '@jest/globals'
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

  it('should have a H1 element with id mainWeather', () => {
    const elementToExist = sut.getElementById('mainWeather')
    // Has to be null and not undefined as toBeDefined is not triggered on null for some ungodly reason....
    expect(elementToExist).not.toBeNull()
    expect(elementToExist?.tagName).toBe('H1')
  })

  it('should have a H1 element with id temp', () => {
    const elementToExist = sut.getElementById('temp')
    expect(elementToExist).not.toBeNull()
    expect(elementToExist?.tagName).toBe('H1')
  })

  it('should have a dropdown with id tempStyle', () => {
    const elementToExist = sut.getElementById('tempStyle')
    expect(elementToExist).not.toBeNull()
    expect(elementToExist?.tagName).toBe('SELECT')
  })

  it('tempStyle dropdown should have options Celsius and Fahrenheit', () => {
    const elementToExist = sut.getElementById('tempStyle')
    const optionOne : HTMLOptionElement = elementToExist?.children[0] as HTMLOptionElement
    const optionTwo : HTMLOptionElement = elementToExist?.children[1] as HTMLOptionElement
    expect(optionOne.value).toBe('Celsius')
    expect(optionTwo.value).toBe('Fahrenheit')
  })

  it('should have a p element with id errorMessage', () => {
    const elementToExist = sut.getElementById('errorMessage')
    expect(elementToExist).not.toBeNull()
    expect(elementToExist?.tagName).toBe('P')
  })
})
