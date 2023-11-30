// jest.config.ts
import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  testEnvironment: 'jsdom',
  verbose: true,
  collectCoverage: true
}
export default config
