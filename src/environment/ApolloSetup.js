import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpLink = createHttpLink({ uri: process.env.REACT_APP_API_URL })

const middlewareLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')

  // Set token on all requests
  operation.setContext({
    headers: {
      authorization: `Basic ${token}` || null
    }
  })

  return forward(operation)
})

export const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
})
