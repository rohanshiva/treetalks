// import React from "react";
// import { Nav } from "react-bootstrap";
// import Navbar from "react-bootstrap/Navbar";
// import "./styles/landingpage.css";
// import firebase from "firebase/app";
// import "firebase/auth";

// export default function LandingPage() {
//   const signIn = () => {
//     var provider = new firebase.auth.GoogleAuthProvider();

//     firebase
//       .auth()
//       .signInWithPopup(provider)
//       .then((result) => {
//         console.log("logged in!");
//       })
//       .catch((error) => {
//         // Handle Errors here.
//         var errorCode = error.code;
//         var errorMessage = error.message;

//         console.log(errorCode, errorMessage);
//       });
//   };

//   return (
//     <body>
//       <main class="l-main">
//         <section class="home" id="home">
//           <div class="home__container bd-grid">
//             <div class="home__img">
//               <img
//                 src="https://raw.githubusercontent.com/rohanshiva/Minnehack2021/061ca785b151b0171c98730f989685be88bb012f/src/components/img1.svg"
//                 alt=""
//                 data-speed="-2"
//                 alt=""
//                 data-speed="-2"
//                 class="move"
//               />
//             </div>
//             <div class="home__data">
//               <h1 class="home__title">Pickup</h1>
//               <p
//                 style={{
//                   color: "#C8E1FF",
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                 }}
//                 class="home__description"
//               >
//                 One man's trash is another man's treasure
//               </p>
//               <a
//                 style={{
//                   color: "#2188FF",
//                   fontWeight: "bold",
//                   fontSize: "18px",
//                 }}
//                 href="#"
//                 class="home__button"
//                 onClick={signIn}
//               >
//                 Get Started
//               </a>
//             </div>
//           </div>
//         </section>
//       </main>
//     </body>
//   );
// }
