<template>
  <ion-page>
    <ion-router-outlet />
        <ion-tabs @ionTabsWillChange="beforeTabChange" @ionTabsDidChange="afterTabChange">
      <ion-tab-bar>
        <ion-tab-button tab="search" href="/Search">
          <ion-icon :icon="searchOutline"></ion-icon>
          <ion-label>Rechercher</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="homeOutline"></ion-icon>
          <ion-label>Accueil</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="favorite" href="/Favorite">
          <ion-icon :icon="reorderFourOutline"></ion-icon>
          <ion-label>Favori</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { 
  IonRouterOutlet,
  IonIcon, 
  IonLabel,
  IonPage,
  IonTabBar, 
  IonTabButton, 
  IonTabs,
} from '@ionic/vue';
import { defineComponent } from 'vue';
import { searchOutline, reorderFourOutline, homeOutline} from 'ionicons/icons';

export default defineComponent({
  name: 'App',
  components: {
    IonRouterOutlet,
    IonIcon,
    IonLabel, 
    IonPage, 
    IonTabBar, 
    IonTabButton, 
    IonTabs
  },
    setup() {
    const beforeTabChange = () => {
      // do something before tab change
    }
    const afterTabChange = () => {
      // do something after tab change
    }
    return {
      searchOutline,
      reorderFourOutline,
      homeOutline,
      beforeTabChange,
      afterTabChange
    }
  }
});
</script>