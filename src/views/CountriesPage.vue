<template>
	<div>
		<div v-if="loading">Loading countries...</div>
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else>
			<h1>Countries in {{ continent?.name }}</h1>
			<p>There are {{ continent?.countries?.length || 0 }} countries in {{ continent?.name }}</p>
			<div class="filter">
				<label for="currencies">Filter by currency:</label>
				<select id="currencies" v-model="selectedCurrency" class="input">
					<option value="">All Currencies</option>
					<option v-for="currency in availableCurrencies" :key="currency" :value="currency">
						{{ currency }}
					</option>
				</select>
				<button @click="resetFilter()">Reset filter</button>
			</div>
			<div class="country-cards">
				<div class="country-card" v-for="country in filteredCountries" :key="country.code">
					<div class="country-header">
						<h2>{{ country.name }}</h2>
						<span class="emoji">{{ country.emoji }}</span>
					</div>
					<div class="overlay">
						<ul>
							<li>Native name: {{ country.native }}</li>
							<li>Code: {{ country.code }}</li>
							<li>Currencies: {{ country.currency?.replaceAll(',', ', ') }}</li>
							<li>Languages:</li>
							<li
								class="list-has-children"
								v-for="language in country.languages"
								:key="language.code"
							>
								<ul>
									<li>{{ language.name }}</li>
								</ul>
							</li>
							<li>Phone: +{{ country.phone }}</li>
						</ul>
					</div>
				</div>
			</div>
			<router-link to="/" class="button">Back to continents</router-link>
		</div>
	</div>
	<ScrollToTop />
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import type { ContinentQuery } from '@/types/graphql'
import { useRoute, useRouter } from 'vue-router'
import ScrollToTop from '@/components/ScrollToTop.vue'

const route = useRoute()
const router = useRouter()
const code = route.params.code as string
const selectedCurrency = ref('')

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

/**
 * The API returns countries sorted by code. Reorder by name.
 * @returns {Array} Reordered array of countries.
 */
const sortedCountries = computed(() => {
	return [...(result.value?.continent?.countries || [])].sort((a, b) => {
		return a.name.localeCompare(b.name)
	})
})

/**
 * Get all available currencies from the countries and return a collection of unique values.
 * @returns {Array} Unique currency values.
 */
const availableCurrencies = computed(() => {
	const allCurrencies = sortedCountries.value
		.flatMap((country) => {
			if (!country.currency) return []
			return country.currency.split(',').map((c) => c.trim())
		})
		.filter(Boolean)

	return [...new Set(allCurrencies)].sort((a, b) => a.localeCompare(b))
})

/**
 * Filter countries by selected currency binding.
 * @returns {Array} Array of countries by filter value.
 */
const filteredCountries = computed(() => {
	return sortedCountries.value.filter((country) =>
		country?.currency.includes(selectedCurrency.value),
	)
})

/**
 * Reset currency filter.
 * @returns {void}
 */
const resetFilter = (): void => {
	selectedCurrency.value = ''
}
</script>

<style scoped>
.filter {
	margin-bottom: 1rem;
	display: flex;
	gap: 0.5rem;
}

.country-cards {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 1rem;
	margin-bottom: 2rem;

	@media (min-width: 768px) {
		grid-template-columns: 1fr 1fr 1fr;
	}

	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
	}
}

.country-card {
	background-color: var(--grey);
	padding: 1rem;
	position: relative;

	@media (min-width: 1024px) {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		min-height: 26rem;
	}

	&:hover {
		.overlay {
			opacity: 1;
		}
	}

	li + li {
		margin-top: 0.5rem;
	}
}

.country-header {
	display: flex;

	@media (min-width: 1024px) {
		flex-direction: column;
	}

	.emoji {
		order: -1;
		margin-right: 0.5rem;

		@media (min-width: 1024px) {
			margin-right: 0;
			font-size: 6rem;
		}
	}

	h2 {
		margin: 0;
	}

	h2,
	.emoji {
		@media (min-width: 1024px) {
			text-align: center;
		}
	}
}

.list-has-children {
	list-style: none;
	padding: 0;
}

.overlay {
	@media (min-width: 1024px) {
		position: absolute;
		top: 0;
		left: 0;
		opacity: 0;
		transition: opacity 300ms ease;
		background-color: rgba(var(--black-rgb), 0.85);
		color: var(--white);
		height: 100%;
		width: 100%;
		padding: 1rem;
		box-sizing: border-box;
	}
}
</style>
