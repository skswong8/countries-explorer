export interface Continent {
	code: string
	name: string
}

export interface ContinentsQuery {
	continents: Continent[]
}

export interface ContinentQuery {
	continent: {
		code: string
		name: string
		countries: Array<{
			code: string
			currency: string | null
			emoji: string
			languages: Array<{
				code: string
				name: string
				native: string
				rtl: string
			}>
			name: string
			native: string
			phone: string
		}>
	} | null
}
