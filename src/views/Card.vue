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

<script lang="ts">
import {
    IonCol,
    IonGrid,
    IonRow,
    IonIcon,
    IonCard, 
    IonCardContent,
    actionSheetController,
 } from '@ionic/vue';
import { defineComponent } from 'vue';

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
    // IonPage,
    // IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
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