// pepsi12

const { initializeApp } = require("firebase/app");

const {
    getFirestore,
    doc,
    setDoc
} = require("firebase/firestore");

const {
    getAuth,
    signInWithEmailAndPassword
} = require("firebase/auth");

const fs = require("fs");
const readline = require("readline");


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4gUtAL7Kbnu4lap68dZp985nHXBNnSao",
  authDomain: "qrzz-967e5.firebaseapp.com",
  projectId: "qrzz-967e5",
  storageBucket: "qrzz-967e5.firebasestorage.app",
  messagingSenderId: "92273846691",
  appId: "1:92273846691:web:ce4ac50d72ff1806861216",
  measurementId: "G-4MY39C2HGY"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);


const cards = JSON.parse(
    fs.readFileSync("cards.json", "utf8")
);


// Ask questions in terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function ask(question) {
    return new Promise(resolve => {
        rl.question(question, answer => {
            resolve(answer);
        });
    });
}


async function uploadCards() {

    try {

        const email = await ask("Firebase email: ");
        const password = await ask("Firebase password: ");

        await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        console.log("Logged in successfully");


        for (const card of cards) {

            const cardID = card.name
                .toLowerCase()
                .replaceAll(" ", "-");


            await setDoc(
                doc(db, "cards", cardID),
                card
            );


            console.log("Uploaded:", card.name);
        }


        console.log("Finished uploading!");

        rl.close();

        process.exit(0);


    } catch (error) {

        console.error("Upload failed:");
        console.error(error);

        rl.close();

        process.exit(0);
    }

}


uploadCards();