<template>
	<div id="map-view">
		<mapComponent id="map-container"/>
	</div>
</template>

<script>
	import mapComponent from '../components/mapComponent';
		export default {
		name: "mapi",

		components:
		{
			mapComponent
		}
	};
</script>

<style scoped>
	.map-view{
		min-height: 100vh;
		width: 100vh;
	}

</style>