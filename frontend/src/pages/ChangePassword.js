// import React, { useState }from 'react';
// import axios from 'axios';

// function ChangePassword() {

//   const [ oldPassword, setOldPassword ] = useState("");
//   const [ newPassword, setNewPassword ] = useState("");

//   const passwordChange = () => {
//     axios.put("http://localhost:3001/auth/changepassword", {
//       oldPassword: oldPassword,
//       newPassword: newPassword,
//     }, 
//     {
//       headers: {
//         accessToken: localStorage.getItem("accessToken")
//       },
//     }
//     ).then((response) => {
//       if(response.data.error) {
//         alert(response.data.error);
//       }
//     })
//   };

//   return (
//     <div>
//         <h1>Changer son mot de passe</h1>
//         <input 
//         type="text" 
//         placeholder='ancien mot de passe'
//         onChange={(event) => {
//           setOldPassword(event.target.value);
//         }}
//         ></input>

//         <input 
//         type="text" 
//         placeholder='nouveau mot de passe'
//         onChange={(event) => {
//           setNewPassword(event.target.value);
//         }}
//         ></input>
//         <button onClick={passwordChange}>Valider le changement</button>
//     </div>
//   )
// }

// export default ChangePassword