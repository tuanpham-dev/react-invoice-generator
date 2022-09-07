import {initializeApp} from "firebase/app"
import {getFirestore,collection, getDocs,addDoc,doc, getDoc, setDoc} from 'firebase/firestore'
// import { useNavigate } from "react-router-dom";
// import { initialData } from "../data/initialData";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_apiKey,
  authDomain: process.env.REACT_APP_FIREBASE_authDomain,
  projectId: process.env.REACT_APP_FIREBASE_projectId,
  storageBucket: process.env.REACT_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_messagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_appId,
};



initializeApp(firebaseConfig);


const db = getFirestore();

const colRef = collection(db,'invoice');






 export const getData = async()=>{

    try {
      console.log("[FIREBASE-GET 🔥]")
      const snapshot = await getDocs(colRef);
      console.log("[200 🆗] :",snapshot.docs);
      const invoice = []
      snapshot.docs.forEach((doc)=>{
        let value  =  doc.data();
        let jv = JSON.parse(value.jdata);
        jv = {...jv,id:doc.id}
        console.log("[jvalue😁]",jv);
        invoice.push(jv);
      });
      console.log('[RETURN] -',invoice);
      
      return invoice;
    } catch (error) {

      console.log("[Error ❌]",error.message);

      const invoice = null;

      // return invoice
    }
  
  // getDoc(getRef).then((snapshot)=>{console.log(snapshot.docs)}).catch((error)=>{console.log("[Error ❌]",error.message)})
  }

  export const AddData=async(jdata_value,alKey)=>{
    
    try{

      const snapshot = await addDoc(colRef,{jdata:JSON.stringify(jdata_value)});

      if(snapshot){

        console.log("[SCUSESS ✳️]  ",snapshot);
        if(alKey === "new"){
          alert("New invoice Created SucessFully😃")
        
          
        }else{
          alert("Invoice Duplication Added SucessFully😃")
        }
      }
    }catch(error){
      console.log("[Error ❌]",error.message);
    }
  }

  export const GetInvoiceFromId = async(id)=>{

    
    try {
      console.log("[FIREBASE-GET 🔥]")
      const snapshot = await getDocs(colRef);
      console.log("[200 🆗] :",snapshot.docs);
      const invoice = []
      snapshot.docs.forEach((doc)=>{
        let value  =  doc.data();
        let jv = JSON.parse(value.jdata);
        jv = {...jv,id:doc.id}
        console.log("[jvalue💥]",jv);
        if(id === doc.id){
          console.log("[idmatch🧉]",id);
          invoice.push(jv);
        }
      });
      console.log('[RETURN 👨‍🚒] -',invoice);
      
      return invoice;
    } catch (error) {

      console.log("[Error ❌]",error.message);

      const invoice = null;

      // return invoice
    }




  }

  export const UpdateValue = async(data,id)=>{

  

    // const docRef = doc(db, "invoice", id);

    // setDoc(docRef, {jdata:JSON.stringify(data)})
    // .then(docRef => {
    //     console.log("Entire Document has been updated successfully⚕️");

    //     alert("Invoice Updated Sucessfully 😃")

     

    //     // return docRef;
    // })
    // .catch(error => {
    //     console.log(error);
    // })

    try {

      const docRef = doc(db, "invoice", id);
      const setvalue = await setDoc(docRef, {jdata:JSON.stringify(data)})

      console.log("[setValue 💛]",setvalue);
      if(docRef){
        alert("Invoice Updated Sucessfully 😃")

      }
      
    } catch (error) {
      console.log("[Error ❌]",error.message);
      
    }
      }