import './App.css';
import { BrowserRouter, Route, Routes, Link, useParams } from 'react-router-dom';
import Homepage from './pages/homepage';
import CreateObject from './pages/CreateObject';
import Object from './pages/Object';
import Login from './pages/Login';
import Users from './pages/Users';
import Profile from './pages/Profile';
import ModifUsers from './pages/ModifUsers';
import ModifObjects from './pages/ModifObjects';
// import ChangePassword from './pages/ChangePassword';
import Registration from './pages/Registration';
import PageNotFound from './pages/PageNotFound';
import ShoppingCart from './pages/ShoppingCart';
import { AuthContext } from './helpers/AuthContext';
import { useState, useEffect } from 'react';
import axios from 'axios';


function App() {

  const [authState, setAuthState] = useState({
    email: "", 
    id: 0,
    role: false,
    status: false,
  });

  const [user, setUser] = useState({
    email: "",
    id: 0,
    role: false,
  });


  const role = localStorage.getItem('role');
  // récupérer le role de l'utilisateur connecté dans le localstorage

  const postId = localStorage.getItem('id');

  useEffect(() => {
    axios.get('http://localhost:3001/auth/auth', { headers: {
      accessToken: localStorage.getItem('accessToken'),
    },
  })
  .then((response) => {
    console.log("-------", response);
      if (response.data.error) {
        setAuthState({...authState, status: false});
      } else {
        setAuthState({
          email: response.data.email, 
          id: response.data.id, 
          status: true,
        });
        }
      });

      const id = authState.id
      console.log(authState);

      axios.get(`http://localhost:3001/auth/byId/${id}`)
      .then((response) => {
        console.log(response);
      if (response.data.error) {
        setUser({ ...user, role: false });
      } else {
        setUser(
          {
          email: response.data.email,
          role: response.data.role,
        }
        );
      }
    });

    console.log(user.role);

    // requète GET qui permet de récupérer et de savoir si le role de l'utilisateur en fonction de l'ID est 'true' ou 'false'








  }, []);



  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({ email: "", id: 0, status: false});
    localStorage.clear();
    // met à vide tout le localstorage
  };
  // fonction qui, dés que l'utilisateur a appuyé sur le bouton déconnexion, supprime le token d'authentification et enlève les données stockées dans le localstorage




  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <BrowserRouter>
        <div className='smallpres'>
        <h1>Homing Homies</h1>
        <h4>Auvergne</h4>
        </div>
        <div className='banner'></div>
        <div className='button-blue'><Link to="/" text-decoration="none"> Accueil</Link></div>
          {!authState.status ? (
            <>
          <div className='button-blue'><Link to="/registration">S'Inscrire</Link></div>
          <div className='button-blue'><Link to="/login">Se Connecter</Link></div>
          <div></div>
            </>
        ) : (
          <>
          <div className='button-blue'><Link to="/shoppingcart">Panier</Link></div>
          <div classname='button-blue'><Link to={`/profile/${postId}`}>Profil</Link></div>
          <div className='button-red'><a onClick={logout}>Déconnexion</a></div>
          
          {/* Quand l'utilisateur clique, appelle la fonction 'logout' */}
          </>
        )}
        {role && (
          <>
          <div className='button-blue'><Link to="/users">Users Admin</Link></div>
          <div className='button-blue'><Link to="/createobject"> Créer un article</Link></div>
          </>
        )}

        <div className='banner'></div>
        <h1>Welcome ! {authState.email}</h1>

        <Routes>
          <Route path="/" exact element={<Homepage/>} />
          <Route path="/createobject" exact element={<CreateObject />} />
          <Route path="/object/:id" exact element={<Object />} />
          <Route path="/registration" exact element={<Registration />} />
          <Route path="/login" exact element={<Login />} />
          <Route path ="/profile/:id" exact element={<Profile />} />
          <Route path="/users" exact element={<Users />} />
          <Route path ="/modifusers/:id" exact element={<ModifUsers />} />
          <Route path ="/modifobjects/:id" exact element={<ModifObjects />} />
          {/* <Route path='/changepassword' exact element={<ChangePassword />} /> */}
          <Route path='/shoppingcart' exact element={<ShoppingCart />} />
          <Route path="*" exact element={<PageNotFound />} />

          {/* Les routes servent à indiquer le chemin aux requètes */}
        </Routes>
        </BrowserRouter>
      </AuthContext.Provider >
    </div>
      );
}
      export default App;
