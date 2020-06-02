<template>
	<div id="mySearchBar" :query="query">
		<my-session></my-session>
		<my-input v-model="valuee" @input='search' placeholder="que buscas" type="text"></my-input>
		<div>
			<ul v-if="storeValue!=''">
			  <li v-for="(place,index) in storeValue" :key="index+'li'">
			  	<my-button @click="onClick({id:place.id})">{{ place.name }}</my-button>
			  </li>
			</ul>
		</div>
		<my-description :query="getmyQuery"></my-description>	
	</div>
</template>

<script>
	import myButton from '../atom/myButton';
	import myInput from '../atom/myInput';
	import mySession from './mySession';
	import myDescription from './myDescription';

		export default {
		name: "mySearchBar",
		props: ["query"],
		data(){
			return{
				valuee: '',
				dataQuery: 0
			}
		},
		methods: {
			onClick(value)
			{
				this.$emit('selected-bar',value.id);
			},
			search()
			{
				
			}

		},
		components:{
			mySession,
			myButton,
			myInput,
			myDescription
		},
		computed:{
			storeValue(){
				return this.$store.state.places;
			},
			getmyQuery(){
				return this.query;
			},
			
		},
	};
</script>

<style scoped>
	#mySearchBar{
		height: 100vh;
		
		padding: 10px;
	}
	ul{
		padding: 0px;
		max-height: 500px;
		overflow: scroll;
	}
	ul > li{
		list-style: none;
		margin-top: 5px;
		margin-bottom: 5px;
		max-width: 100%;

	}
	li > button{
		min-width: 100%;
	}
</style>