<template>
      <ion-slide>
        <div id="container">
          <ion-grid>
            
            <ion-row>
              <ion-col>
                <h1>{{title}}</h1>
              </ion-col>
            </ion-row>

            <ion-row>
              <ion-col>
                <h2>{{temp}}°</h2>
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
                <p>{{temp1}}°</p>
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
                <p>{{temp2}}°</p>
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
                <p>{{temp3}}°</p>
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
                <p>{{temp4}}°</p>
              </ion-col>
            </ion-row>

          </ion-grid>

        </div>
      </ion-slide>
</template>

<script lang="ts">
import { 
IonIcon, 
IonCol, 
IonGrid, 
IonRow,
IonSlide
 } from '@ionic/vue';
import { defineComponent } from 'vue';
import { sunnyOutline , rainyOutline, thunderstormOutline , cloudyOutline } from 'ionicons/icons';

export default defineComponent({
  name: 'compoHome',
  components: {
    // IonContent,
    // IonHeader,
    // IonPage,
    // IonTitle,
    // IonToolbar,
    IonIcon,
    // IonSlides,
    IonSlide,
    IonCol,
    IonGrid,
    IonRow
  },
    props:{
      title: String,
      temp: Number,
      // day1: String,
      temp1: Number,
      // day2: String,
      temp2: Number,
      // day3: String,
      temp3: Number,
      // day4: String,
      temp4: Number
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
    }
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