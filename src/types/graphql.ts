export interface Continent {
	code: string
	name: string
}

export interface ContinentsQuery {
	continents: Continent[]
}
