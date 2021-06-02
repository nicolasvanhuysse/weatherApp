<template>
    <ion-page>
      <!-- currentWeather.name -->
        <ion-content :fullscreen="true">
            <ion-searchbar animated @ionChange=onChange @save-option="search"><ion-button @click="search">Rechercher</ion-button></ion-searchbar>
            <!-- {{currentWeather}} -->
            <!-- {{currentWeather5days}} -->
        </ion-content>
        
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonContent,
    IonSearchbar,
    IonButton
    // IonList    
 } from '@ionic/vue';
import { defineComponent } from 'vue';
import { sunnyOutline , rainyOutline, thunderstormOutline , cloudyOutline } from 'ionicons/icons';
import weatherService from "../services/weatherService"
export default defineComponent({
  name: 'Search',
  data() {
    return {
      city: ' ',
      currentWeather : null,
      currentWeather5days : null
    }
  },
  components: {
    IonPage,
    IonContent,
    IonSearchbar,
    IonButton
    // IonList,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    // IonIcon,
    // IonSlides,
    // IonSlide,
    // IonCol,
    // IonGrid,
    // IonRow
  },
  methods: {
    onChange(e: any){
      this.city = e.detail.value
    },
    async search() {
      this.currentWeather = await weatherService.getCityName(this.city)
      this.currentWeather5days = await weatherService.get5daysCityName(this.city);
    }
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