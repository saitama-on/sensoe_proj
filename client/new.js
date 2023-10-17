// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {ref , getStorage , uploadBytes , getDownloadURL} from  'https://www.gstatic.com/firebasejs/9.22.2/firebase-storage.js';



const img_file = document.getElementById("image");
console.log(1 - '0');



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

//const storageref = ref(storage);
const imagesref = ref(storage , 'images/new.jpg');

//const storageRef = ref(storage, 'some-child');
// 'file' comes from the Blob or File API
const upload_button = document.getElementById("upload");

upload_button.setAttribute("disabled", '');


let ok = ["Levocetirizine Dihydrochloride Tablets IP 5 mg",
"Keep all medicines outsid fuch if children",
"My L. No: 31/20",
"20176234",
"AFG.DATE 37 2022 EXPIRY DATE 12/2024 M.R.P.42.30 FOR 10 TABS.INCL.OF ALL TAXES",
"LEVOZET",
"Earn im coated tablet containe",
"Levocetirizine Dihydrochloride IP Colour Thenium Dioxide P",
"5mg",
"Dosage A directed by the Physician Storage: Store protected from light & moisture.a temperature not exceeding 30°C",
"Manufactured by Plite & Cure Heathcare P",
"subsidiary of",
"Aems Draft & Pharmaceuticals (4)P N 25A, 27-36, Sect-A13DCUL",
"Rariou, Haridwar 24840) Ushand","Marketed by CADILA",
"Ahmedabed.","1308, Dholka-382 226 Diss."]

let len_ok = ok.length;

for(let i=0 ; i< len_ok ; i++){

  if (ok[i].toLowerCase.includes("exp")){
    
  }
}


img_file.addEventListener("change",()=>{
     const render_img = document.querySelector('img');
     const file = document.querySelector('input[type=file]').files[0];

    // const new_reader = new FileReader();
    upload_button.removeAttribute("disabled");

    // new_reader.addEventListener('load' , ()=> {
    //     render_img.src = new_reader.result;
    //     console.log(render_img.src);
    //   }, false)
    
      // if(file){
      //   new_reader.readAsDataURL(file);
      // }

      console.log(file);
      
})
upload_button.addEventListener("click" , ()=>{

    // image goes to api and converts to text;
    const render_img = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];

    uploadBytes(imagesref, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      upload_button.setAttribute("disabled" , '');

      getDownloadURL(ref(storage , 'images/new.jpg')).
      then((url)=>{
        console.log(url);
      })

    })
    .catch((error)=>{

      console.log(error);
    });
})

