import { Avatar, CardHeader, CircularProgress, ListItemIcon, Typography } from "@mui/material";
import { useState } from "react"
import axios from "../api/axios";

export default function UserAvatar({user_email, prefix}) {

    const [profileData, setProfileData] = useState()

    if (!profileData){
        let params = new URLSearchParams([['user_email', user_email]]);

    axios.get('/getProfile/',{ params: params })
        .then((response) => {
        setProfileData(response.data);
        })
        .catch((error) => {
        console.log(error);
        });
    }

    return (
         profileData ? 
         <>

                <CardHeader sx={{ textAlign:"left" }}
                        avatar={<Avatar
                            alt={profileData.email.toLocaleUpperCase()}
                            src={ profileData.pic  || ""}
                        /> }
                        title={((prefix || "") + " ") + (profileData.name || "sin nombre")}
                        subheader={profileData.email}  /> 
                    </>
            : <CircularProgress></CircularProgress>   
    )
}