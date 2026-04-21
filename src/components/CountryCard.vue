<template>
	<div class="country-card">
		<div class="country-header">
			<h2>{{ country.name }}</h2>
			<span class="emoji">{{ country.emoji }}</span>
		</div>
		<div class="overlay">
			<ul>
				<li>Native name: {{ country.native }}</li>
				<li>Code: {{ country.code }}</li>
				<li>Currencies: {{ country.currency?.replaceAll(',', ', ') ?? 'N/A' }}</li>
				<li>Languages:</li>
				<li class="list-has-children" v-for="language in country.languages" :key="language.code">
					<ul>
						<li>{{ language.name }}</li>
					</ul>
				</li>
				<li>Phone: +{{ country.phone }}</li>
			</ul>
		</div>
	</div>
</template>

<script setup lang="ts">
import type { Country } from '@/types/graphql'
defineProps<{
	country: Country
}>()
</script>

<style scoped>
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
