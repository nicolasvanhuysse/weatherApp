<template>
    <ion-page>
      <!-- currentWeather.name -->
        <ion-content :fullscreen="true">
            <ion-searchbar animated @ionChange=onChange @save-option="search"><ion-button @click="search">Rechercher</ion-button></ion-searchbar>
            <!-- <ion-button type="submit" @click.prevent="addCities()">Ajouter</ion-button> -->
            <!-- {{currentWeather}} -->
            <!-- {{currentWeather5days}} -->
        </ion-content>
        
    </ion-page>
</template>

<script>

import { IonPage, IonContent, IonSearchbar, IonButton, toastController } from '@ionic/vue';

import { defineComponent } from 'vue';
import { sunnyOutline , rainyOutline, thunderstormOutline , cloudyOutline } from 'ionicons/icons';

import weatherService from "../services/weatherService"

import {DATABASE_CONFIGURATION} from '../config';

import firebase from 'firebase/app'
import 'firebase/firestore'
// Get a Firestore instance
if (firebase.apps.length === 0) {
        firebase.initializeApp(DATABASE_CONFIGURATION);
    }

    export const db = firebase.firestore();

export default defineComponent({
  name: 'Search',
  data() {
    return {
      city: ' ',
      currentWeather :{ cod : null},
      currentWeather5days : null,
      cities: [],
    }
  },
  components: {
    IonPage,
    IonContent,
    IonSearchbar,
    IonButton,
  },
  methods: {
      async openToast(msg) {
      const toast = await toastController
        .create({
          message: msg,
          duration: 2000
        })
      return toast.present();
    },
    onChange(e){
      this.city = e.detail.value
    },
    async search() {
      this.currentWeather = await weatherService.getCityName(this.city)
      this.currentWeather5days = await weatherService.get5daysCityName(this.city);
      if (this.currentWeather.cod === '404') {
        const msg = 'Erreur : La ville n\'éxiste pas';
        this.openToast(msg);
      } else {
        this.addCities();
        const msg = 'La ville a bien été ajouté à vos favoris';
        this.openToast(msg);
      }
    },
    async addCities() {
      db.collection('Cities').add({
      name: this.city
      })    
    },
  },
  setup() {
    return {
      sunnyOutline,
      rainyOutline,
      thunderstormOutline,
      cloudyOutline
    }
    }
});

</script>

<style>

</style>