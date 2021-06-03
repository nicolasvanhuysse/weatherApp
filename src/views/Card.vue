<template>
            <ion-card>
                <ion-card-content>
                    <ion-grid @click="openActionSheet">
            
                        <ion-row >
                            <ion-col>
                                <p>{{title}}</p>
                            </ion-col>
                            <ion-col>
                                <ion-icon size="large" :icon="sunnyOutline"></ion-icon>
                            </ion-col>
                            <ion-col>
                                <p>{{temp}}°</p>
                            </ion-col>
                         </ion-row>

                    </ion-grid>
                </ion-card-content>
            </ion-card>

</template>

<script>
import {
    IonCol,
    IonGrid,
    IonRow,
    IonIcon,
    IonCard, 
    IonCardContent,
    actionSheetController,
    toastController,
    alertController,
 } from '@ionic/vue';
import { defineComponent  } from 'vue';

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
    pencilOutline,
     } from 'ionicons/icons';

export default defineComponent({
  name: "Card",
  data() {
      return {
        currentWeather:{ cod : null},
      }
  },
  components: {
    IonIcon,
    IonCol,
    IonGrid,
    IonRow,
    IonCard, 
    IonCardContent,
  },
  props:{
      title: String,
      temp: Number
  },
  methods: {
    async editCity() {
      const alert = await alertController
        .create({
          cssClass: 'my-custom-class',
          header: 'Modifier',
          inputs: [
            {
              name: 'editCity',
              id: 'idEditCity',
              value: this.title,
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                console.log('Cancel')
              },
            },
            {
              text: 'Modifier',
              handler: async ( alertData) => {

                  // méthod modifier

            console.log(alertData.editCity)

            this.currentWeather = await weatherService.getCityName(alertData.editCity)

                if (this.currentWeather.cod === '404') {
                    const msg = 'Erreur : La ville n\'éxiste pas';
                    this.openToast(msg);
                } else {

                    // const Cities = { ...this.Cities }
                    // Cities.name = alertData.editCity

                    // db.collection('Cities').doc(this.Cities)
                    // .set(Cities)
                    // .then(() => {
                    //     console.log('user updated!')
                    // })
                    
                    const updateData = db.collection('Cities').where('name','==',this.title);
                    updateData.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                    doc.ref.set({
                        name: alertData.editCity
                    });
                    });
                });

                    const msg = 'La ville a bien été modifie';
                    this.openToast(msg);
      }

              },
            },
          ],
        });
      return alert.present();
    },
    async openToast(msg) {
      const toast = await toastController
        .create({
          message: msg,
          duration: 2000
        })
      return toast.present();
    },
    async openActionSheet() {
      const actionSheet = await actionSheetController
        .create({
          header: this.title,
          cssClass: 'my-custom-class',
          inputs: [{
              name: 'Code',
              placeholder: 'code',
          }],
          buttons: [
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                  // méthod delete
                  console.log(this.title)

                const deleteData = db.collection('Cities').where('name','==',this.title);
                    deleteData.get().then(function(querySnapshot) {
                    querySnapshot.forEach(function(doc) {
                    doc.ref.delete();
                    });
                });
                const msg = 'La ville a bien été supprimé de vos favoris';
                this.openToast(msg);
                
              },
            },
                        {
              text: 'Modifier',
              icon: pencilOutline,
              handler: () => {
                  this.editCity();
                  console.log(this.title)
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
              handler: () => {
                console.log('Cancel')
              },
            },
          ],
        });
      await actionSheet.present();
    },
  },
  setup() {

    return {
      sunnyOutline,
      rainyOutline,
      thunderstormOutline,
      cloudyOutline,
    }
    }
});
</script>

<style>

</style>