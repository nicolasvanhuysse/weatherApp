<template>
            <ion-card>
                <ion-card-content>
                    <ion-grid @click="presentActionSheet">
            
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
 } from '@ionic/vue';
import { defineComponent } from 'vue';

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
  name: "Card",
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
            async openToast(msg) {
      const toast = await toastController
        .create({
          message: msg,
          duration: 2000
        })
      return toast.present();
    },
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

    //   const { role } = await actionSheet.onDidDismiss();
    //   console.log('onDidDismiss resolved with role', role);
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