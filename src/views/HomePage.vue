<template>
	<h1>Exploring countries by continent together</h1>
	<p>
		Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae
		pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean
		sed diam urna tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa
		nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti
		sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
	</p>
	<div v-if="continentsLoading">Loading countries...</div>
	<div v-else-if="continentsError">Error: {{ continentsError.message }}</div>
	<div v-else>
		<ul class="continents">
			<li
				class="continent-card"
				v-for="continent in continents"
				:key="continent.code"
				@click="goToContinent(continent.code)"
			>
				<h2>{{ continent.name }}</h2>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useCountries } from '@/composables/useCountries'

const router = useRouter()
const { continents, continentsLoading, continentsError } = useCountries()

/**
 * Navigate to chosen continent view.
 * @param string continent Continent code.
 * @returns {void}
 */
const goToContinent = (continent: string): void => {
	router.push({ name: 'Countries', params: { code: continent } })
}
</script>

<style scoped>
.continents {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
	gap: 2rem;
	padding: 0;
}

.continent-card {
	height: 6rem;
	padding: 1rem 2rem;
	background-color: var(--grey);
	cursor: pointer;
	list-style: none;

	h2 {
		margin: 0;
	}
}
</style>
