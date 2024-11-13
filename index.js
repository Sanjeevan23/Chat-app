// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXYIWpowy7m-GmNcjPSRt7ZUdRHR4cdsw",
  authDomain: "sanjeevan-cd6e6.firebaseapp.com",
  databaseURL: "https://sanjeevan-cd6e6-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "sanjeevan-cd6e6",
  storageBucket: "sanjeevan-cd6e6.firebasestorage.app",
  messagingSenderId: "908540955184",
  appId: "1:908540955184:web:9967f0bccebbb300d3fbf5",
  measurementId: "G-FSCGSMM77Y"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Database
const db = firebase.database();

// Prompt for username
const username = prompt("Please Tell Us Your Name");

// Send message function
function sendMessage(e) {
  e.preventDefault();

  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value.trim();

  if (message === "") return;  // Prevent empty messages

  // Clear the input box
  messageInput.value = "";

  // Send message data to Firebase
  db.ref("messages/" + timestamp).set({
    username: username,
    message: message,
    timestamp: timestamp,
  });
}

// Listen for form submission
document.getElementById("message-form").addEventListener("submit", sendMessage);

// Fetch chat messages
const fetchChat = db.ref("messages/");
fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  
  document.getElementById("messages").innerHTML += message;

  // Auto-scroll to bottom of messages
  document.getElementById("messages").scrollIntoView({ behavior: "smooth", block: "end" });
});
