<template>
	<h1>Countries Explorer</h1>
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import type { ContinentsQuery } from '@/types/graphql'
import { useRouter } from 'vue-router'

const router = useRouter()

const GET_CONTINENTS_QUERY = gql`
	query getContinents {
		continents {
			code
			name
		}
	}
`

const { result } = useQuery<ContinentsQuery>(GET_CONTINENTS_QUERY)

const continents = computed(() => result.value?.continents ?? [])

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
