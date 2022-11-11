import React, {useState} from 'react';
import './App.css';

import RegisterPage from './routes/RegisterPage';
import LoginPage from './routes/LoginPage';
import Home from './routes/Home';
import Layout from './components/Layout';
import Casero from './routes/Casero';
import Missing from './routes/Missing';
import Unauthorized from './routes/Unauthorized';
import LinkPage from './routes/LinkPage';
import ProfilePage from './routes/ProfilePage';
//import RequireAuth from './components/RequireAuth';
import { Routes, Route } from 'react-router-dom';
import CargaPropiedad from './components/CargaPropiedad';
import ShowsLodgings from './routes/ShowsLodgings';
import UpdateData from './components/UpdateData';
import NavBar from './components/NavBar';
import {FileLoader} from './components/FileLoader';
import {FileLoaderGallery2} from './components/FileLoaderGallery2';
import EditProfile from './routes/EditProfilePage';
import MakePublication from './components/MakePublication';
import ShowsMyPublications from './routes/ShowsMyPublications';
import UpdatePublications from './components/UpdatePublcations';
import ViewPublication from './components/ViewPublcation';
import MakeReservation from './components/MakeReservation';
import ShowsAllPublications from './routes/ShowsAllPublications';
import ShowsMyReservations from './routes/ShowsMyReservations';
import Review from './components/Review';
import DateReservation from './routes/DateReservation'
import ViewPublicationReviews from './components/ViewPublicationRatings';





const ROLES = {
  'Inquilino': 2001,
  'Casero': 1984,
  'Admin': 5150
}


function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false)

  return (
    <>
    <NavBar/>
    <Routes>
    <Route path="/" element={<Layout />}>
      {/* public routes */}
      <Route path="login" element={<LoginPage />} />
      <Route path="register" element={<RegisterPage />} />
      <Route path="/" element={<Home />} />
      <Route path="linkpage" element={<LinkPage />} />
      <Route path="casero" element={<Casero />} />
      <Route path="cargaPropiedad" element={<CargaPropiedad />} />
      <Route path="showLodgings" element={< ShowsLodgings/>} />
      <Route path="updateData/" element={<UpdateData/>} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="fileLoader" element={<FileLoader />} />
      <Route path="fileLoaderGallery2" element={<FileLoaderGallery2 />} />
      <Route path="profile" element={<ProfilePage />} />
      <Route path="makePublication"  element={<MakePublication />}/>
      <Route path="showsMyPublications"  element={<ShowsMyPublications />}/>
      <Route path="showsAllPublications"  element={<ShowsAllPublications />}/>
      <Route path="showsMyReservations"  element={<ShowsMyReservations />}/>
      <Route path="updatePublications/" element={<UpdatePublications/>} />
      <Route path="viewPublication/:id" element={<ViewPublication/>} />
      <Route path="viewPublication/:id/reviews" element={<ViewPublicationReviews/>} />
      <Route path="makeReservation/" element={<MakeReservation/>} />
      <Route path="profile/edit" element={<EditProfile />} />
      <Route path="review" element={<Review />} />
      <Route path="dateReservation" element={<DateReservation/>} />
      
      
      {/*
      <Route element={<RequireAuth allowedRoles={[ROLES.Inquilino]} />}>
        <Route path="/" element={<Home />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Casero]} />}>
        <Route path="editor" element={<Editor />} />
      </Route>


      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
        <Route path="admin" element={<Admin />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={[ROLES.Casero, ROLES.Admin]} />}>
        <Route path="lounge" element={<Lounge />} />
      </Route> */}

      
      <Route path="*" element={<Missing />} /> 
    </Route>
  </Routes>
  </>
);
   
  
}

export default App;
