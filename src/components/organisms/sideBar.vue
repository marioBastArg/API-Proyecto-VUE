<template>
	<div id="mySearchBar" :query="query">
		<my-session :session="computedName" @login="constructlogin" @logout="logout" @register="constructregister" @createPlace="constructPlace"></my-session>
		<my-input v-model="valuee" @input='search' placeholder="que buscas" type="text"></my-input>
		<div>
			<ul v-if="storeValue!=''">
			  <li v-for="(place,index) in storeValue" :key="index+'li'">
			  	<my-button v-if="search(place)" @click="onClick({id:place.id})">{{ place.name }}</my-button>
			  	<my-button v-if='computedName!= null && place.userId == computedId' classButton="blue" @click='constructUpdatePlace(place)'>Modificar</my-button>
			  	<my-button v-if='computedName!= null && place.userId == computedId' classButton="crimson" @click='deletePlace(place.id)'>Eliminar</my-button>
			  </li>
			</ul>
		</div>
		<my-description  v-if="!active"  :query="getmyQuery"></my-description>
		<my-form v-if="active" :myFormData="formConstructor" @myFormSubmit="directForm" :response="response"></my-form>
	</div>
</template>

<script>

	import axios from 'axios';
	import myButton from '../atom/myButton';
	import myInput from '../atom/myInput';
	import mySession from '../molecule/mySession';
	import myDescription from '../molecule/myDescription';
	import myForm from '../molecule/myForm';
	import VueLocalStorage from 'vue-localstorage'

		export default {
		name: "mySearchBar",
		props: ["query"],
		data(){
			return{
				valuee: '',
				dataQuery: 0,
				formConstructor: {},
				active: false,
				response: "",
				sessionid: "",
				localid: '',
				localName: '',
				localToken: ''
			}
		},
		mounted(){
			this.localid = this.$localStorage.get('id');
			this.localName = this.$localStorage.get('name');
			this.localToken = this.$localStorage.get('token');
			console.log(this.$localStorage.get("id"));
		},
		methods: {
			onClick(value)
			{
				this.active = false
				this.$emit('selected-bar',value.id);
			},
			search(place)
			{
				if (this.valuee!='null') {
					if (place.name.toUpperCase().indexOf(this.valuee.toUpperCase())> -1) {
						return true;
					}else{
						return false;
					}
				}else{
					return true;
				}
			},
			directForm(value){
				if (value.type=="Logearme") {
					this.sendLogin(value.form);
				}else if (value.type=="Registrarme") {
					this.sendRegister(value.form);
				}else if (value.type=="registerPlace") {
					this.sendnewPlace(value.form);
				}else if (value.type=="updatePlace") {
					this.sendUpdatePlace(value.form,valie.id);
				}
			},
			constructlogin(){
				this.active = true;
				this.formConstructor = {
					title: "Iniciar sesion",
					action: "postLogin",
					submitType: "submit",
					submitName: "Logearme",
					data:[
						{title: "E-mail:",type:"email",name:"email",value:""},
						{title: "Password:",type:"password",name:"password",value:""}
					]

				};
			},
			constructregister(){
				this.active = true;
				this.formConstructor = {
					title: "Registrarse",
					action: "postPlace",
					submitType: "submit",
					submitName: "Registrarme",
					data:[
						{title: "Nombre completo:",type:"text",name:"name",value:""},
						{title: "E-mail:",type:"email",name:"email",value:""},
						{title: "Password:",type:"password",name:"password",value:""},
						{title: "Fecha de nacimiento:",type:"date",name:"birthday",value:""}
					]
				};
			},
			constructUpdatePlace(place){
				this.active = true;
				this.formConstructor = {
					title: "Modificar Lugar",
					action: "putRegister",
					submitType: "submit",
					submitName: "updatePlace",
					data:[
						{title: "Nombre del lugar:",type:"text",name:"name",value:place.name},
						{title: "Longitud:",type:"text",name:"lon",value:"",value:place.lon},
						{title: "Latitud:",type:"text",name:"lat",value:place.lat},
						{title: "Descripcion:",type:"text",name:"description",value:place.description},
						{title: "Imagen:",type:"file",name:"image",scr:place.scr,value: ''},

					]
				};

			},
			constructPlace(){
				this.active = true;
				this.formConstructor = {
					title: "Registrar Lugar",
					action: "postRegister",
					submitType: "submit",
					submitName: "registerPlace",
					data:[
						{title: "Nombre del lugar:",type:"text",name:"name",value:""},
						{title: "Longitud:",type:"text",name:"lon",value:""},
						{title: "Latitud:",type:"text",name:"lat",value:""},
						{title: "Descripcion:",type:"text",name:"description",value:""},
						{title: "Imagen:",type:"file",name:"image",value:""},
						{title: "",type:"hidden",name:"id",value: '1'}
					]
				};
			},
			sendLogin(e){
				axios.post('http://localhost:3000/usuarios/login', e)
					.then((res) => {
						this.$localStorage.set('name',JSON.stringify(res.data.data.user.name));
						this.$localStorage.set('id',JSON.stringify(res.data.data.user.id));
						this.$localStorage.set('token',JSON.stringify(res.data.data.token));
						this.localid = this.$localStorage.get('id');
						this.localName = this.$localStorage.get('name');
						this.localToken = this.$localStorage.get('token');
						console.log(this.$localStorage.get('id')," id");
						this.response =  res.data.message;
						setTimeout(()=>{
							this.response = '';
							this.active = false;
						}, 5000);
					}).catch((err) => {
						this.response =  "Correo electronico o contraseña incorrecto/s";
						setTimeout(()=>{
							this.response = '';
						}, 5000);
					});
			},
			sendRegister(e){
				console.log(e);
				axios.post('http://localhost:3000/usuarios/create', e)
					.then((res) => {
						this.response =  res.data.message;
						setTimeout(()=>{
							this.response = '';
							this.active = false;
						}, 5000);
					}).catch((err) => {
						this.response =  "Los datos no son correctos";
						setTimeout(()=>{
							this.response = '';
						}, 5000);
					});
			},
			sendnewPlace(e){
				console.log(this.localToken.replace(/['"]+/g, ''));
				axios.post('http://localhost:3000/lugares/registerPlace',e,
					{ headers:{'authorization': this.localToken.replace(/['"]+/g, '')} 
				}).then((res) => {
					console.log(res);
					this.response =  res.data.message;
					setTimeout(()=>{
						this.response = '';
						this.active = false;
						location.reload();
					}, 5000);
				}).catch((err) => {
					this.response =  "Los datos no son correctos";
					setTimeout(()=>{
						this.response = '';
					}, 5000);
				});
			},
			deletePlace(e){
				console.log(this.localToken.replace(/['"]+/g, ''));
				axios.delete('http://localhost:3000/lugares/'+e,
					{ headers:{'authorization': this.localToken.replace(/['"]+/g, '')} 
				}).then((res) => {
					console.log(res);
					this.response =  res.data.message;
					setTimeout(()=>{
						this.response = '';
						this.active = false;
						location.reload();
					}, 5000);
				}).catch((err) => {
					this.response =  "Los datos no son correctos";
					setTimeout(()=>{
						this.response = '';
					}, 5000);
				});
			},
			sendUpdatePlace(e,id){
				console.log(this.localToken.replace(/['"]+/g, ''));
				axios.put('http://localhost:3000/lugares/'+id,e,
					{ headers:{'authorization': this.localToken.replace(/['"]+/g, '')} 
				}).then((res) => {
					console.log(res);
					this.response =  res.data.message;
					setTimeout(()=>{
						this.response = '';
						this.active = false;
						location.reload();
					}, 5000);
				}).catch((err) => {
					this.response =  "Los datos no son correctos";
					setTimeout(()=>{
						this.response = '';
					}, 5000);
				});
			},
			logout(){
				this.active = false;
				this.$localStorage.set("name",'');
				this.$localStorage.set("id",'');
				this.$localStorage.set("token",'');
				this.localid = this.$localStorage.get('id');
				this.localName = this.$localStorage.get('name');
				this.localToken = this.$localStorage.get('token');
			}

		},
		components:{
			mySession,
			myButton,
			myInput,
			myDescription,
			myForm
		},
		computed:{
			storeValue(){
				return this.$store.state.places;
			},
			getmyQuery(){
				return this.query;
			},
			loginData(){
				return this.formConstructor;
			},
			computedName(){
				return this.localName;
			},
			computedId(){
				return this.localid;
			}
		},
	};
</script>

<style scoped>
	#mySearchBar{
		height: 96%;
		max-height: 100vh;
		padding: 1%;
		overflow: hidden;
		overflow: scroll;
		overflow-x: hidden;
	}
	ul{
		padding: 0px;
		max-height: 200px;
		overflow: scroll;
		overflow-x: hidden;
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