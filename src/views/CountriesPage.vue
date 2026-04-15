<template>
	<div>
		<div v-if="loading">Loading countries...</div>
		<div v-else-if="error">Error: {{ error.message }}</div>
		<div v-else>
			<p>{{ continent?.countries?.length || 0 }} countries in {{ continent?.name }}</p>
			<div v-for="country in continent?.countries" :key="country.code">
				{{ country.name }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import type { ContinentQuery } from '@/types/graphql'
import { useRoute } from 'vue-router'

const route = useRoute()
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
</script>
