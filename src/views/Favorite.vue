<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-card>
            </ion-card>
            <card  v-for="(city,index) in cities" :key="index" :title="city.name" :temp="city.currentWeather.list[0].main.temp"  ></card>
        </ion-content>
    </ion-page>
</template>

<script>
import {
    IonPage,
    IonContent,
    IonCard, 
    actionSheetController,
 } from '@ionic/vue';

import { defineComponent } from 'vue';

import Card from './Card.vue';

import weatherService from "../services/weatherService"

import {DATABASE_CONFIGURATION} from '../config';

import firebase from 'firebase/app'
import 'firebase/firestore'

if (firebase.apps.length === 0) {
        firebase.initializeApp(DATABASE_CONFIGURATION);
    }

export const db = firebase.firestore();

import { 
    sunnyOutline, 
    rainyOutline,
    thunderstormOutline, 
    cloudyOutline,
    close,
    trash,
     } from 'ionicons/icons';

export default defineComponent({
  name: 'Favorite',
  components: {
    IonPage,
    IonContent,
    IonCard, 
    Card
  },
    data() {
    return {
      cities: [],
    }
  },
  methods: {
    async presentActionSheet() {
      const actionSheet = await actionSheetController
        .create({
          header: 'Favorie',
          cssClass: 'my-custom-class',
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                console.log('Delete clicked')
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked')
              },
            },
          ],
        });
      await actionSheet.present();

      const { role } = await actionSheet.onDidDismiss();
      console.log('onDidDismiss resolved with role', role);
    },
  },
  setup() {
    return {
      sunnyOutline,
      rainyOutline,
      thunderstormOutline,
      cloudyOutline
    }
    },
    async mounted() {

    // Récupérer la liste des Favoris
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

<style>

</style>