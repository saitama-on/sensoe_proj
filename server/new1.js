import { ApifyClient } from "apify-client";
import {initializeApp} from "firebase/app";
import {ref , getStorage , uploadBytes , getDownloadURL} from "firebase/storage";
import { onObjectFinalized } from 'firebase-functions/v2/storage';


let url_img='';

  //Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD2RpxeHhLOMaqzS8-Vo5WuUqLtUFYilUE",
    authDomain: "sensor-proj-b3fdb.firebaseapp.com",
    projectId: "sensor-proj-b3fdb",
    storageBucket: "sensor-proj-b3fdb.appspot.com",
    messagingSenderId: "603026668192",
    appId: "1:603026668192:web:f6eceb438b31e2b60567c5"
  };

  const client = new ApifyClient({
    token: 'apify_api_LYREnKRhobR6UIc9hiU2M2q01tpjvq0GZ1aU',
  });
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  
  getDownloadURL(ref(storage , 'images/new.jpg')).
      then((url)=>{
        
        url_img += url;
        //console.log(url);
        const input = {
            "startUrls": [
                {
                    "url":url,
                }
              ],
              "proxy": {
                "useApifyProxy": true
            },
            "maxRequestRetries": 10,
            "debugLog": false
          };
          
          (async () => {
            // Run the Actor and wait for it to finish
            const run = await client.actor("RA7fg2mqciGjZM7hM").call(input);
          
            // Fetch and print Actor results from the run's dataset (if any)
            console.log('Results from dataset');
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            items.forEach((item) => {
                console.dir(item.ocrText);
            });
          })();
      }).catch((error)=>{

        console.log(error);
      });

      console.log(url_img);

      
      
     