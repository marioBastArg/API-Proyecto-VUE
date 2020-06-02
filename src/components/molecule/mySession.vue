<template>
	<div id="mySession" :value="session">
		<my-button v-if="session ==''" @click="register">Registrarme</my-button>
		<my-button v-if="session ==''" @click="login">Iniciar Sesion</my-button>
		<my-button v-if="session !=''" @click="logout">logout</my-button>
		<my-button v-if="session !=''" @click="createPlace">Nuevo lugar</my-button>
	</div>
</template>
<script>
	import myButton from '../atom/myButton';
		export default {
		name: "mySession",
		props:["session"],
		data(){
			return{
				valuee:0,
			}
		},
		methods: {
			register()
			{
				this.$emit('register',true);
			},
			login()
			{
				this.$emit('login',true);
			},
			logout()
			{
				this.$emit('logout',true);
			},
			createPlace()
			{
				this.$emit('createPlace',true);
			}
		}/*,
		watch:{
			session(newSession){
				loca
			}
		}*/,
		components:{
			myButton,
		},
	};
</script>

<style scoped>
	
</style>