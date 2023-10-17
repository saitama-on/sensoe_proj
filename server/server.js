import {initializeApp} from 'firebase/app';
import { ApifyClient } from "apify-client";
import {ref , getStorage , uploadBytes , getDownloadURL} from  'firebase/storage';
import FirebaseStorage from 'multer-firebase-storage';
import express from "express";
const app= express()
// const emitter = new EventEmitter()
// emitter.setMaxListeners(0)
import bodyParser  from 'body-parser';
import cors from 'cors';
const port = 3001
import Multer from 'multer';
const multer = Multer({
  storage: FirebaseStorage({
    bucketName: 'sensor-proj-b3fdb.appspot.com',
    directoryPath:'images',
    credentials: {
  projectId: "sensor-proj-b3fdb",
  privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDGQuqTeceRIEMB\n/wKU7ktnYKTAZlVgJBYA+rgk52ct6OcRftUnMfyC7d0xTAfvbPHY3ZAL/b4c03Lm\noJh8ROd+6f3HmZNJ1df2VIxao0DSHitYz5hWM1Toas24DK87wVuOf4ugzJOap2HZ\ntvHk6+QenPl9DIa/OI15s022HYLtWZljnLtmpm7NqvaMpFqRw+DZP8h+fxEc+mfE\nUwT5f9WU/BNgLacR6E5sjfQhIcfM1GnBHKqUB3yOOUG3+xE1fyQhTD3AKuHryPZ7\nQr/2ejAufwKtcV5WrS6U8XD6TENJLd9H3HGzfNp04YzLN/UggvwmFLxZtHBOg3jy\n/1C3/bP3AgMBAAECggEAPECn44vV/5/rXVbvpO1Kky9GwoYXGjG9Uizf+68rp0Mp\nviJqiw/g6rV5THsLylK0qTCkj1BdD4ufVsGltdaG+AYKrzdYEM9hY6ZMRVtp3rF2\ngPYOGNxeyId036NTOfjIZ2URvRuPHCgUT8MOfoDGAhu4oq1E4iZAsKSyUE9ls9XG\nJtmk+s567NqMbXlETxwDLaERhwPJa4hrVzaJea3r5tcrbf30FRb6MI1AjTie/A40\nIYGsI5xgjHKoGjVH7BQZCxNRBIf9Y5gTthm4pMrSoQ5MNEln6wxrr4i/5HxJEr+u\nSwoiWv5oczDK7NZPnvq8bvA7/ZSRPqB9G8jvjrlRUQKBgQD9qYpiE2yKgINRSqSz\nKGc3zwVRj4kJVHm4UBCybbWHFawQbd3sm9FxCOYGyYmzEOIiuAW9bCVnOtSoQ3kR\nNDIjm2hji1XJ8vQ/sbNDZni6cWC83W4/NLWjxDS2nkY+ZFrL4xR+gYPf3UGfP2DN\ndj7IoRXaOTmvSQJIoBvMlWG6+QKBgQDIFqt1yhnM6rfHf7LYXXfucJOMkIYFUvlK\nNo0/otF/PYClJAk9W/Hh1GmjdH+/OZxwwtyGfhV4CqqHAyY2bzJUbWmkQAB5hXdX\n6iATvKb3i9Od/edUfnFBAxdMy2iFGwEnidg3nKU/GxKd5hs+/Xy5lYQ2QR6sxmXu\nI28CUiEybwKBgD9JcHQ9wmPf4mOCywrD9tSuuvX5aMhCIkhA+Zl608KLPq2uq6Lf\n0WZxQOrKl6dse+8LmKsE82QJAoukoe0P576IhIfpeJL1IclObZpQU6i4ptkYKext\nGzBrwHcbkAz6/shFtJRHff55dmjj6CP673kg75HNmz3HamFySN1HG+YJAoGAeK2r\nlixhqUT7uPhc/sBJAGenpkTYgEeOEWObh4EFB9ApUfDNHdPhrEn3uN0f2068+wmc\nBgXvnuoX9bxBhN1GJsOizqzHXIPR+hU8aYsDzRPpe0XTCxQD7KkXmXqpPHaQGK+7\n17bDt671aISLdE9gtXHnPu3BuYUjnyCB6I1udkMCgYEAowoCI8fVnVrY2UNBzyKy\nxJFIVq7P5hwYL6IjRNILmohkzWOp3Ndy8Y67ofjPIkeLHTvDZzoFtI/rzYiAuLf3\n8vpBaGbLKpgGapgWMoVcMhV59jAwafo6Yzn0U8hTGxBs/P7FZ/TjaIuVJfektUa4\nQcRyZJcKnEm4XTP7G/WfGQ4=\n-----END PRIVATE KEY-----\n",
  clientEmail: "firebase-adminsdk-osb4y@sensor-proj-b3fdb.iam.gserviceaccount.com",
    }
  })
})

const firebaseConfig = {
    apiKey: "AIzaSyD2RpxeHhLOMaqzS8-Vo5WuUqLtUFYilUE",
    authDomain: "sensor-proj-b3fdb.firebaseapp.com",
    projectId: "sensor-proj-b3fdb",
    storageBucket: "sensor-proj-b3fdb.appspot.com",
    messagingSenderId: "603026668192",
    appId: "1:603026668192:web:f6eceb438b31e2b60567c5"
  };
  
  // Initialize Firebase
  const app1 = initializeApp(firebaseConfig);
  const storage = getStorage(app1);

  const json_ref = ref(storage , "json_data/new.json");
  

let final_str ='';

// function search_exp(final_string) {

//       let len_str = final_string.length;
//       let exp_start_index = 0;
//       for(let i=0 ; i<len_str-3 ; i++){

//         //console.log(final_string[i] + final_string[i+1] + final_string[i+2]);

//         if(final_string[i] + final_string[i+1] + final_string[i+2] =='exp'){

//           exp_start_index = i;
//           final_string.slice(i,len_str);
//           break;
//         }


//       }
      

//       console.log(exp_start_index);

//       return final_string;
// }



app.post('/', (req, res)=>{
    res.send("Welcome to your server")
    console.log("hello")
    })


    app.listen(port, ()=>{
        console.log(`Server is runing on port ${port}`)
    })

let url_img='';
let text_array =[];

const client = new ApifyClient({
  token: 'apify_api_LYREnKRhobR6UIc9hiU2M2q01tpjvq0GZ1aU',
});

app.post("/upload", multer.single("img"), (req,res)=>{

      console.log("Uploaded successfuly!");

      getDownloadURL(ref(storage , 'images/' +req.file['originalname'])).
      then((url)=>{
        //console.log(url);
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
            //console.log('Results from dataset');
            const { items } = await client.dataset(run.defaultDatasetId).listItems();
            items.forEach((item) => {
                //console.dir(item.ocrText);
                let len_arr = item.ocrText.length;

                for(let i=0 ; i<len_arr ;i++) {
                  text_array.push(item.ocrText[i]);

                  if(item.ocrText[i].toLowerCase().includes('exp')){

                    let exp_str = item.ocrText[i].toLowerCase();
                    let exp_str_len = exp_str.length;
                    let exp_start_index = 0;
                    let exp_end_index=0;
                    for(let i=0 ; i<exp_str_len-3 ; i++){
                    if(exp_str[i] + exp_str[i+1] +exp_str[i+2] =='exp'){

                          exp_start_index = i;
                          
                          break;
                        }


                        }

                        // for(let j = exp_start_index; j < exp_str_len ; j++){

                        //   console.log(exp_str[j].charCodeAt(0));

                        //     if(exp_str[j].charCodeAt(0) >60 ){
                        //       exp_end_index = j ;
                        //       break;
                        //     }

                        // }

                        let new_str = exp_str.slice(exp_start_index , exp_str_len);
                        // console.log(exp_start_index);
                        // console.log(exp_end_index);
      

                      console.log(new_str);

              
                  }
                  
                }

                //console.log(search_exp(final_str));


                
                res.json(item);
            });
          })();


      })

      
})