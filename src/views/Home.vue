<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-slides pager="true" :options="slideOpts" v-if="cities.length>0">

      <!-- Position actuelle -->
      <compoHome :title="posGeolocation.city.name" :temp="posGeolocation.list[0].main.temp" :temp1="posGeolocation.list[8].main.temp" :temp2="posGeolocation.list[16].main.temp" :temp3="posGeolocation.list[24].main.temp" :temp4="posGeolocation.list[32].main.temp"></compoHome>

      <!-- Boucle pour récup données bdd -->
      <compoHome  v-for="(city,index) in cities" :key="index" :title="city.name" :temp="city.currentWeather.list[0].main.temp" :temp1="city.currentWeather.list[8].main.temp" :temp2="city.currentWeather.list[16].main.temp" :temp3="city.currentWeather.list[24].main.temp" :temp4="city.currentWeather.list[32].main.temp"></compoHome>
      
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>

import { 
IonContent,
IonPage,
IonSlides,
 } from '@ionic/vue';

import { defineComponent } from 'vue';
import { sunnyOutline , rainyOutline, thunderstormOutline , cloudyOutline } from 'ionicons/icons';

import compoHome from './compoHome.vue';
import weatherService from "../services/weatherService"

import {DATABASE_CONFIGURATION} from '../config';

import firebase from 'firebase/app'
import 'firebase/firestore'

if (firebase.apps.length === 0) {
        firebase.initializeApp(DATABASE_CONFIGURATION);
    }

export const db = firebase.firestore();

export default defineComponent({
  name: 'Home',
  components: {
    IonContent,
    IonPage,
    IonSlides,
    compoHome,
  },
  data(){
    return {
      cities: [],
      posGeolocation: [],
      location:null,
      gettingLocation: false,
      errorStr:null
    };
  },
  setup() {

    const slideOpts = {
      initialSlide: 1,
      speed: 400
    };
    return {
      sunnyOutline,
      rainyOutline,
      thunderstormOutline,
      cloudyOutline,
      slideOpts 
    }
    },
    methods: {
      async getLocation() {
      
      return new Promise((resolve, reject) => {

        if(!("geolocation" in navigator)) {
          reject(new Error('Geolocation is not available.'));
        }

        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          reject(err);
        });

      });
    },
    },
    async mounted() {

      // Géoloc
      this.gettingLocation = true;
      try {
        this.gettingLocation = false;
        this.location = await this.getLocation();
        console.log(this.location.coords.latitude)
        console.log(this.location.coords.longitude)
      } catch(e) {
        this.gettingLocation = false;
        this.errorStr = e.message;
      }

      this.posGeolocation = await weatherService.get5daysGeolocation(this.location.coords.latitude, this.location.coords.longitude)
      console.log(this.posGeolocation.city.name)
      console.log(this.posGeolocation.list[0].main.temp)

      // récup données bdd
      db.collection("Cities")
      .get()
      .then(async (querySnapshot) => {
        const documents = querySnapshot.docs.map((doc) => doc.data());

        const weatherList = await Promise.all(
          documents.map(async (city) => ({
             name: city.name,
             currentWeather: await weatherService.get5daysCityName(city.name),
          }))
         
        );
        this.cities = weatherList;
      });
    },

});
</script>

<style scoped>
#container {
  text-align: center;
  
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  
  color: #8c8c8c;
  
  margin: 0;
}

#container a {
  text-decoration: none;
}

    ion-slides {
      height: 100%;
    }

    .swiper-slide {
      display: block;
    }

    .swiper-slide h2 {
      margin-top: 2.8rem;
    }

    .swiper-slide img {
      max-height: 50%;
      max-width: 80%;
      margin: 60px 0 40px;
      pointer-events: none;
    }

    b {
      font-weight: 500;
    }

    p {
      padding: 0 40px;
      font-size: 14px;
      line-height: 1.5;
      color: var(--ion-color-step-600, #60646b);
    }

    p b {
      color: var(--ion-text-color, #000000);
    }

</style>