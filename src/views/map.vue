<template>
	<div id="map-view">
		<my-side-bar @selected-bar="update" :query="myMapClick"></my-side-bar>
		<map-component @clicked="myValue" :query="myMapClick" id="map-container"/>
	</div>
</template>

<script>
	import mapComponent from '../components/molecule/mapComponent';
	import mySideBar from '../components/organisms/sideBar';
	
		export default {
		name: "mapi",
		data(){
			return{
				myMapClick: 0
			}
		},methods: {
			myValue(val){
				this.myMapClick = val;
			},
			update(val){
				this.myMapClick = val;
			}
		},
		components:
		{
			mapComponent,
			mySideBar,
		}
	};
</script>

<style scoped>
	@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
	
	#map-view{
		font-family: 'Open Sans', sans-serif;
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