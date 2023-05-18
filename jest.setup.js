// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Used for __tests__/testing-library.js
// Learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect'
import {server} from './mocks/server'
import {queryClient} from '@/mocks/renderWithProviders';

beforeEach(() => queryClient.clear()) // resetea cache de react-query, util para ambiente testing

beforeAll(() => server.listen())

afterEach(() => server.resetHandlers())

afterAll(() => server.close())
