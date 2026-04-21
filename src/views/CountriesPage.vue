<template>
	<div>
		<div v-if="continentLoading">Loading countries...</div>
		<div v-else-if="continentError">Error: {{ continentError.message }}</div>
		<div v-else>
			<h1>Countries in {{ continentName }}</h1>
			<p>There are {{ countries?.length || 0 }} countries in {{ continentName }}</p>
			<p>
				Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
				pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu
				aenean sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
				Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class
				aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
			</p>
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
				<CountryCard v-for="country in filteredCountries" :key="country.code" :country="country" />
			</div>
			<router-link to="/" class="button">Back to continents</router-link>
		</div>
	</div>
	<ScrollToTop />
</template>

<script setup lang="ts">
import { computed, watch, ref } from 'vue'
import { useRouter } from 'vue-router'
import ScrollToTop from '@/components/ScrollToTop.vue'
import { useCountries } from '@/composables/useCountries'
import CountryCard from '@/components/CountryCard.vue'

const router = useRouter()
const { continentName, countries, continentLoading, continentError } = useCountries()
const selectedCurrency = ref('')

// Catch invalid continent value and redirect them to 404.
watch([continentName, continentLoading], ([newContinent, isLoading]) => {
	if (!isLoading && !newContinent) {
		router.replace({ name: 'NotFound' })
	}
})

/**
 * Get all available currencies from the countries and return a collection of unique values.
 * @returns {Array} Unique currency values.
 */
const availableCurrencies = computed(() => {
	const selectedCountries = countries.value ?? null
	const allCurrencies = selectedCountries
		?.flatMap((country) => {
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
	return countries.value.filter((country) => country?.currency?.includes(selectedCurrency.value))
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
</style>
