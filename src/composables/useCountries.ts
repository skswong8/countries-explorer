import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'
import type { ContinentsQuery, ContinentQuery } from '@/types/graphql'

export function useCountries() {
	const route = useRoute()
	const code = route.params.code as string

	const GET_CONTINENTS_QUERY = gql`
		query getContinents {
			continents {
				code
				name
			}
		}
	`

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

	// Fetch all continents
	const { result: continentsResult, loading: continentsLoading, error: continentsError } = useQuery<ContinentsQuery>(GET_CONTINENTS_QUERY)
	const continents = computed(() => continentsResult.value?.continents ?? [])

	// Fetch countries for a specific continent
	const { result: continentResult, loading: continentLoading, error: continentError } = useQuery<ContinentQuery>(GET_COUNTRIES_BY_CONTINENT_QUERY, { code: code })
	const continentName = computed(() => continentResult.value?.continent?.name ?? null)
	const allCountries = computed(() => continentResult.value?.continent?.countries ?? null)

	/**
	 * The API returns countries sorted by code. Reorder by name.
	 * @returns {Array} Reordered array of countries.
	 */
	const countries = computed(() => {
		return [...(allCountries.value || [])].sort((a, b) => {
			return a.name.localeCompare(b.name)
		})
	})

	return {
		continents,
		continentName,
		countries,
		continentsLoading,
		continentLoading,
		continentsError,
		continentError,
	}
}
