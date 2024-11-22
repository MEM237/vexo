// Initialize Firebase SDKs with global variables instead of imports
const firebaseConfig = {
  apiKey: "AIzaSyDOXTKJgLlNfq7Sn-f_CYEFDn92S74Cw9w",
  authDomain: "vexo-8df2d.firebaseapp.com",
  databaseURL: "https://vexo-8df2d-default-rtdb.firebaseio.com",
  projectId: "vexo-8df2d",
  storageBucket: "vexo-8df2d.firebasestorage.app",
  messagingSenderId: "54849424101",
  appId: "1:54849424101:web:604c71656e7ce3dbdd220c",
  measurementId: "G-T0FVZNZCB4",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();

// Firebase services are now globally accessible as `database` and `auth`
