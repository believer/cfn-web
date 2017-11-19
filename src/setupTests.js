import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(param => param),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}

global.localStorage = localStorageMock

// Mocking the global.fetch included in React Native
window.fetch = jest.fn()

// Helper to mock a success response (only once)
fetch.mockResponseSuccess = body => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({ json: () => Promise.resolve(body) })
  )
}

fetch.mockResponseSuccessWithError = body => {
  fetch.mockImplementationOnce(() => Promise.resolve(body))
}

// Helper to mock a failure response (only once)
fetch.mockResponseFailure = error => {
  fetch.mockImplementationOnce(() => Promise.reject(error))
}
