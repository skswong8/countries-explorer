<template>
	<header>
		<router-link to="/">
			<img id="logo" src="/public/logo.svg" alt="Country Explorer logo" />
		</router-link>
	</header>
	<router-view />
</template>

<style scoped>
header {
	margin-top: 1rem;
}

#logo {
	width: 250px;
}
</style>
