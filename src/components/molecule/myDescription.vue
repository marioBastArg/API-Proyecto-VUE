<template>
	<div id="myDescription" :query="query">

		<my-text v-if="query>0">{{myItem.name}}</my-text>
		<my-text v-if="query>0">{{myItem.description}}</my-text>
		<my-text v-if="query>0">{{myItem.lon}}</my-text>
		<my-text v-if="query>0">{{myItem.lat}}</my-text>
		<my-image v-if="query>0" :scr="'http://localhost:3000/lugares/'+myItem.id"></my-image>

	</div>
</template>
<script>
	import myText from '../atom/myText';
	import myImage from '../atom/myImage';
		export default{
			name : "myDescription",
			props: ['query'],
			data(){
				return{
				}
			},
			methods:{
					
			},
			computed:{
				storeValue(){
					return this.$store.state.places
				},
				myItem(){
					return this.storeValue.find(storeValue => storeValue.id == this.query);
				}
			},
			components:{
				myText,
				myImage
			}

		}
</script>
<style>
	
</style>