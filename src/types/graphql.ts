export interface Continent {
	code: string
	name: string
}

export interface ContinentsQuery {
	continents: Continent[]
}

export interface Country {
	code: string
	currency: string | null
	emoji: string
	languages:
		| Array<{
				code: string
				name: string
				native: string
				rtl: boolean
		  }>
		| []
	name: string
	native: string
	phone: string
}

export interface ContinentQuery {
	continent: {
		code: string
		name: string
		countries: Country[]
	} | null
}
