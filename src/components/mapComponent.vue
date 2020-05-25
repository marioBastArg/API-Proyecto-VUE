
<template>
	<div id="mapComponet">
		<my-search-bar></my-search-bar>
		<my-session></my-session>
		<div :id="id" class="map-component"></div>
	</div>
</template>

<script>
	import mapboxgl from 'mapbox-gl';
	import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
	import mySearchBar from './molecule/mySearchBar';
	import mySession from './molecule/mySession';
	
	mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvbnciLCJhIjoiY2s3ZTJoOWh6MWxxOTNscXJjMHRoOXJreiJ9.vB1XKwOqtX0XvzVSiX07ig';
	export default {
		name: "mapComponent",
		props: ["id"],
		data(){
			return{
				map:null
			}
		},
		mounted() {
			this.map = new mapboxgl.Map({
			  container: this.id,
			  style: 'mapbox://styles/mapbox/outdoors-v11'
			});
		},
		components:{
			mySearchBar,
			mySession
		}
	};
</script>

<style scoped>
	.map-component{
		height: 100vh;
		width: 100%;
	}
</style>