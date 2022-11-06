import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import axios from '../api/axios';
import { Avatar, Button, CircularProgress, Paper, TextField } from '@mui/material';
import swal from 'sweetalert2';


const EditProfile = () => {
  const CLOUD_NAME = 'dwx9rqfjh';
  const UPLOAD_PRESET = 'z87owhgv';
  const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`

  const navigate = useNavigate();

  let username = window.localStorage.getItem("username")

  const [profileData, setProfileData] = useState();

  const [file, setFile] = useState("");

  const [url, setUrl] = useState("");


  const setFileAsync = (state) => {
    return new Promise((resolve) => {
      this.setFile(state, resolve)
    });
  }

    
  if (!username){
    console.log("no autorizado")
    //navigate("/login");
    window.location.href = "/login";
    return;
  }

  

  if(!profileData){
    const params = new URLSearchParams([['user_email', username]]);

    axios.get('/getProfile/',{ params: params })
    .then((response) => {
      setProfileData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  }

  const upload = async (filec) => {
    const data = new FormData();
    data.append('file', filec);
    data.append('upload_preset', UPLOAD_PRESET);
    data.append('cloud_name', CLOUD_NAME);

    fetch(cloudinaryUrl,
        {method: "POST",
            body: data})
        .then(resp => resp.json())
         .then(data => {
              console.log(data);
             setUrl(data.url)})
        //.then(swal.fire({title:"Exito", text: "Foto subida exitosamente", icon:"success"}))
        .catch(err => console.log(err))
    }


  const updateProfile = async(e) => {
    e.preventDefault()
    const form = new FormData(e.currentTarget);

    const body = {
        'email': username, 'name': form.get("name"), 'bio': form.get("bio"), 'location': form.get("location"), 'ocupation': form.get("ocupation"), 'pic': (url || form.get("oldPic"))
    }

    const headers = { 'Content-Type': 'application/json' }


    axios.put('/updateProfile/', JSON.stringify(body),{headers: headers})
    .then((response) => {
      swal.fire({title:"Exito", text: "Perfil actualizado exitosamente", icon:"success"}).then(() => {window.location.href = "/profile"})
    })
    .catch((error) => {
      console.log(error);
      swal.fire({title:"Error", text: error, icon:"error"})
    });
  }


  return (
    <Paper sx={{width: 700, paddingBottom: "30px", display: 'flex', flexDirection:'column', alignItems:'center', textAlign: 'left'}}
      noValidate
      component="form"
      onSubmit={(e) => updateProfile(e)}
      autoComplete="off">
      {profileData ? <>

          <div style={{width: "60%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center"}}>
          <Avatar
            alt={username.toLocaleUpperCase()}
            src={(file ? URL.createObjectURL(file) : null) || profileData.pic || ""}
            sx={{ width: 100, height: 100 , marginTop: "10px", marginBottom: "20px"}}
          />

          <Button sx={{height: "50px"}} component="label"> Cambiar imagen 
            <input style={{display:"none"}} type="file" onChange={(e) => {setFile(e.target.files[0]); upload(e.target.files[0])}} />
          </Button> 
          </div>

          {/* <TextField
              name="email"
              label="E-mail"
              defaultValue={profileData.email}
              sx={{margin: "10px 0 10px 0", width: "450px"}}
            /> */}

          <TextField
              name="oldPic"
              defaultValue={profileData.pic}
              sx={{display: 'none'}}
            />

          <TextField
              name="name"
              label="Nombre"
              defaultValue={profileData.name}
              sx={{margin: "10px 0 10px 0", width: "450px"}}
            />
          
          

          <TextField
              name="bio"
              label="Biografia"
              defaultValue={profileData.bio}
              sx={{margin: "10px 0 10px 0", width: "450px"}}
              multiline
            />

          <TextField
              name="ocupation"
              label="Ocupación"
              defaultValue={profileData.ocupation}

              sx={{margin: "10px 0 10px 0", width: "450px"}}

            />

          <TextField
              name="location"
              label="Ubicación"
              defaultValue={profileData.location}
              sx={{margin: "10px 0 10px 0", width: "450px"}}

            />

          <Button sx={{marginTop: "10px"}} variant="contained" type="submit">
            Aceptar
          </Button>
        </>
     :<CircularProgress></CircularProgress>}
  </Paper>
  
  )
}

export default EditProfile
