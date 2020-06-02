
<template>
	<div id="mapComponet">
		<div :id="id" :value="query" class="map-component"></div>
	</div>
</template>

<script>
	import mapboxgl from 'mapbox-gl';
	import axios from 'axios';
	import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
	
	mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvbnciLCJhIjoiY2s3ZTJoOWh6MWxxOTNscXJjMHRoOXJreiJ9.vB1XKwOqtX0XvzVSiX07ig';
	export default {
		name: "mapComponent",
		props: ["id","query"],
		data(){
			return{
				mapi:null,
				currentCoords : [0,0]
			}
		},
		mounted() {
		    this.mapi = new mapboxgl.Map({
			    container: this.id,
			    style: 'mapbox://styles/mapbox/streets-v10',
			    center: this.currentCoords,
			    zoom: 12,
			    maxPitch: 12,
			    attributionControl: false
			});

			var places;
			axios.get('http://localhost:3000/lugares/getAllPlaces').then(response => {
		    	places = response.data.places;
		    	this.$store.state.places = places;
		    	var myGeoJson = {
					type: 'geojson',
					data: {
					  	type: 'FeatureCollection',
					  	features: []
					}
				};
				
				this.mapi.on('load', () => {
					places.forEach((place) => {
						myGeoJson.data.features.push({
					    	type: 'Feature',
					    	geometry: {
					      		type: 'Point',
					      		coordinates: [place.lon, place.lat]
					    	},
					    	properties: {
					      		title: place.name,
					      		description: place.description,
					      		id: place.id

					    	}
					  	});
					});
					myGeoJson.data.features.forEach((marker,key) => {
						var el = document.createElement('button');
						el.className = 'marker';
						el.value = marker.properties.id;
						el.addEventListener('click',()=>{
				  			this.$emit("clicked", marker.properties.id);
				  		});
						new mapboxgl.Marker(el).setLngLat([parseFloat(marker.geometry.coordinates[0]),parseFloat(marker.geometry.coordinates[1])]).addTo(this.mapi);
					});
				  	
				});
				
			 	this.$getLocation({}).then((cords) => {
					this.mapi.flyTo({
						center: [cords.lng,cords.lat],
						essential: true
					});
					var el = document.createElement('div');
					el.className = 'marker orange';
					el.value = {id : -100};
					new mapboxgl.Marker(el).setLngLat([cords.lng,cords.lat]).addTo(this.mapi);
				})
			}).catch(e => {
		    	console.log(e);
			});
			
		},
	  	methods: {
	  		getCurrentCoords(){
	  			navigator.geolocation.getCurrentPosition((position) => {
					this.currentCoords = [position.coords.longitude, position.coords.latitude];
				});
	  		}
		},
		watch:{
			query: function(){
				var flyloc = this.$store.state.places.find(element => element.id == this.query);
				this.mapi.flyTo({
					center: [flyloc.lon,flyloc.lat],
					essential: true
				});
			}
		}
	};
</script>

<style>
	.map-component{
		height: 100vh;
		width: 100%;
	}
	.marker {
	  background-image: url('../../../public/mapbox-icon.png');
	  background-size: cover;
	  width: 40px;
	  height: 40px;
	  border: 0px;
	  background-color: transparent; 
	  border-radius: 50%;
	  cursor: pointer;
	}
	.orange{
		background-color: orange;
		cursor: default;
	}
	#fly {
		display: block;
		position: relative;
		margin: 0px auto;
		width: 50%;
		height: 40px;
		padding: 10px;
		border: none;
		border-radius: 3px;
		font-size: 12px;
		text-align: center;
		color: #fff;
		background: #ee8a65;
	}
</style>