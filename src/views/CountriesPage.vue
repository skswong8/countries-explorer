<template>
	<div>
		<div v-if="loading">Loading countries...</div>
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else>
			<h1>Countries in {{ continent?.name }}</h1>
			<p>There are {{ continent?.countries?.length || 0 }} countries in {{ continent?.name }}</p>
			<div class="country-cards">
				<div class="country-card" v-for="country in countries" :key="country.code">
					<h2>{{ country.name }}</h2>
					<span>{{ country.emoji }}</span>
				</div>
			</div>
			<router-link to="/" class="button">Back to continents</router-link>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import type { ContinentQuery } from '@/types/graphql'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const code = route.params.code as string

const GET_COUNTRIES_BY_CONTINENT_QUERY = gql`
	query getCounties($code: ID!) {
		continent(code: $code) {
			code
			name
			countries {
				code
				currency
				emoji
				languages {
					code
					name
					native
					rtl
				}
				name
				native
				phone
			}
		}
	}
`

const { result, loading, error } = useQuery<ContinentQuery>(GET_COUNTRIES_BY_CONTINENT_QUERY, {
	code,
})

const continent = computed(() => result.value?.continent ?? null)

// Catch invalid continent value and redirect them to 404.
watch([continent, loading], ([newContinent, isLoading]) => {
	if (!isLoading && !newContinent) {
		router.replace({ name: 'NotFound' })
	}
})

// The API returns countries sorted by code. Reorder by name.
const countries = computed(() => {
	return [...(result.value?.continent?.countries || [])].sort((a, b) => {
		return a.name.localeCompare(b.name)
	})
})
</script>

<style scoped>
.country-cards {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr 1fr;
	gap: 1rem;
	margin-bottom: 2rem;
}

.country-card {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	background-color: var(--grey);
	min-height: 20rem;
	padding: 1rem;
	text-align: center;

	span {
		order: -1;
		font-size: 6rem;
	}
}
</style>
