// ✅ Initialize Firebase using compat SDK
const firebaseConfig = {
  apiKey: "AIzaSyCCpTgD1SWGASV1vvLiMzI1RBnq8Yjh7EQ",
  authDomain: "bus-tracker-e7f46.firebaseapp.com",
  projectId: "bus-tracker-e7f46",
  storageBucket: "bus-tracker-e7f46.firebasestorage.app",
  messagingSenderId: "414725550891",
  appId: "1:414725550891:web:5602309db58ee61bd64b6e"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// 🗺️ Initialize Leaflet map
const map = L.map('map').setView([20.5937, 78.9629], 5); // India default view
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

let marker = null;

// 🔁 Real-time location listener
db.collection('busLocations').doc('bus1')
  .onSnapshot((doc) => {
    if (doc.exists) {
      const { latitude, longitude } = doc.data();
      const lat = parseFloat(latitude);
      const lng = parseFloat(longitude);

      if (marker) {
        marker.setLatLng([lat, lng]);
      } else {
        marker = L.marker([lat, lng]).addTo(map).bindPopup("Bus 1");
      }

      map.setView([lat, lng], 16); // zoom into bus location
    } else {
      console.log("No such document!");
    }
  });
