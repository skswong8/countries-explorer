import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'
import '@/scss/main.scss'

// HTTP connection to the API
const httpLink = createHttpLink({
	uri: 'https://countries.trevorblades.com/graphql',
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
})

const app = createApp(App)

app.use(router)

app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
