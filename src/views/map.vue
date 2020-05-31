<template>
	<div id="map-view">
		<my-search-bar :query="myMapClick"></my-search-bar>
		<map-component @clicked="myValue" id="map-container"/>
	</div>
</template>

<script>
	import mapComponent from '../components/molecule/mapComponent';
	import mySearchBar from '../components/molecule/mySearchBar';
	
		export default {
		name: "mapi",
		data(){
			return{
				myMapClick:0
			}
		},methods: {
			myValue(val){
				this.myMapClick = val;
			}
		},
		components:
		{
			mapComponent,
			mySearchBar,
		}
	};
</script>

<style scoped>
	#map-view{
		max-height: 100vh;
		width: 100%;
		display: flex;
	}
	#mapComponet{
		min-width:70%;
	}
	#mySearchBar{
		width: 100%;
		max-width: 30%;
	}
</style>