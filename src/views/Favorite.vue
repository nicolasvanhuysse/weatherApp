<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <ion-card>
            </ion-card>
            <card :title="'PARIS'" :temp = "22"> </card>
            <card :title="'TOURNAI'" :temp = "21"></card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage,
    IonContent,
    // IonCol,
    // IonGrid,
    // IonRow,
    // IonIcon,
    IonCard, 
    // IonCardContent,
    actionSheetController,
 } from '@ionic/vue';

import { defineComponent } from 'vue';

import Card from './Card.vue';

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
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    // IonIcon,
    // IonCol,
    // IonGrid,
    // IonRow,
    IonCard, 
    // IonCardContent,
    Card
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
    }
});
</script>

<style>

</style>