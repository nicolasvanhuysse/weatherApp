import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';

import { firestorePlugin } from 'vuefire'

// import firebase from 'firebase';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';


  // // Your web app's Firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyAMTirogqF3DfDn2pz12jiKV5CY0koj57I",
  //   authDomain: "weatherservices-9a96f.firebaseapp.com",
  //   projectId: "weatherservices-9a96f",
  //   storageBucket: "weatherservices-9a96f.appspot.com",
  //   messagingSenderId: "412389865846",
  //   appId: "1:412389865846:web:43e31f48292c41fd44a257"
  // };
  // // Initialize Firebase
  // firebase.initializeApp(firebaseConfig);

  // firebase.firestore().settings({ experimentalForceLongPolling: true });
  
const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
app.use(firestorePlugin)

router.isReady().then(() => {
  app.mount('#app');
});