<template>
	<ul class="continents">
		<li
			class="continent-card"
			v-for="continent in result?.continents"
			:key="continent.code"
			@click="goToContinent"
		>
			<h2>{{ continent.name }}</h2>
		</li>
	</ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import type { ContinentsQuery } from '@/types/graphql'

const GET_CONTINENTS_QUERY = gql`
	query getContinents {
		continents {
			code
			name
		}
	}
`

export default defineComponent({
	name: 'HomePage',
	props: {},
	components: {},
	setup() {
		const { result } = useQuery<ContinentsQuery>(GET_CONTINENTS_QUERY)

		const goToContinent = () => {
			console.log('Clicked')
		}

		return { result, goToContinent }
	},
})
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
