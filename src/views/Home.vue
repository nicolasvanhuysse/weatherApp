<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-slides pager="true" :options="slideOpts" v-if="cities.length>0">
      <ion-slide>
        <div id="container">
          <ion-grid>
            
            <ion-row>
              <ion-col>
                <h1>Ma position</h1>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <h2>19 °</h2>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <ion-icon size="large" :icon="sunnyOutline"></ion-icon>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <p>Lundi</p>
              </ion-col>
              <ion-col>
                <ion-icon size="large" :icon="sunnyOutline"></ion-icon>
              </ion-col>
              <ion-col>
                <p>19 °</p>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <p>Mardi</p>
              </ion-col>
              <ion-col>
                <ion-icon size="large" :icon="cloudyOutline"></ion-icon>
              </ion-col>
              <ion-col>
                <p>19 °</p>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <p>Mercredi</p>
              </ion-col>
              <ion-col>
                <ion-icon size="large" :icon="thunderstormOutline"></ion-icon>
              </ion-col>
              <ion-col>
                <p>19 °</p>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <p>Jeudi</p>
              </ion-col>
              <ion-col>
                <ion-icon size="large" :icon="rainyOutline"></ion-icon>
              </ion-col>
              <ion-col>
                <p>19 °</p>
              </ion-col>
            </ion-row>

          </ion-grid>
        </div>
      </ion-slide>
      <!-- cities[0].name -->
      <!-- v-if="cities.length>0" :title="cities[0].name" -->
      <!-- temp="city.currentWeather.list[0].main.temp" -->
        <compoHome  v-for="(city,index) in cities" :key="index" :title="city.name" :temp="city.name"  ></compoHome>
      
      </ion-slides>
    </ion-content>
  </ion-page>
</template>

<script>

import { 
IonContent,
IonPage, 
IonIcon, 
IonCol, 
IonGrid, 
IonRow,
IonSlides,
IonSlide
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
    IonIcon,
    IonSlides,
    IonSlide,
    IonCol,
    IonGrid,
    IonRow,
    compoHome
  },
  data(){
    return {
      cities: [],
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
    },
    async mounted() {
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
        console.log(this.cities)
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