import React, { Component } from 'react';
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from '../api/axios';
import { Link, Route, useNavigate, BrowserRouter, BrowserRouter as Router, Redirect, Switch} from "react-router-dom";
import Logo from '../components/Logo';
import GoBack from '../components/GoBack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import ImageUploading from "react-images-uploading";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Modal } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export class FileLoaderGallery2 extends Component {
   
    static contextTypes = {
       router: () => true,
       }
       
    fileObj = [];
    fileArray = [];
    
    email_user = window.localStorage.getItem("username");
    
    //browserHistory = ReactRouter.browserHistory;
    
    constructor(props) {
        super(props)
            
        this.state = {
            file: [null],
            array: []
        }
        
        this.uploadMultipleFiles = this.uploadMultipleFiles.bind(this)
        this.uploadFiles = this.uploadFiles.bind(this)
        this.handleClose = () => {
            props.setOpen(false);
        }
        this.handleUpload = (e) => {
            this.uploadFiles(e)
            this.handleClose()
        }
    }
  
   
    upload = async () => {

       const CLOUD_NAME = 'dwx9rqfjh';
       const UPLOAD_PRESET = 'z87owhgv';
       const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`


        const data = new FormData();
        const urls = [];
        
        for (let i = 0; i < this.fileObj[0].length; i++) {
            
           data.append('file', this.fileObj[0][i]);
           data.append('upload_preset', UPLOAD_PRESET);
           data.append('cloud_name', CLOUD_NAME);
           

           await fetch(cloudinaryUrl,
               {method: "POST",
                   body: data})
               .then(async result => result.json())
               .then(async result => {this.state.array.push(result.secure_url)})
               
               .catch(err => console.log(err))
             }
             
        sessionStorage.setItem("urls",  JSON.stringify(this.state.array));

       
    }
    
    uploadMultipleFiles(e) {
        console.log(this.fileObj)
        this.fileObj.push(e.target.files)
        for (let i = 0; i < this.fileObj[0].length; i++) {
            console.log(this.fileObj[0][i])
            this.fileArray.push(URL.createObjectURL(this.fileObj[0][i]))
        }
        this.setState({ file: this.fileArray })
    }
    
    
    uploadFiles (e) {
        e.preventDefault()
        e.currentTarget.disabled = true
        this.upload()
        console.log(this.state.file)

    }
    
   
    render() { 
        return (
            <Stack direction="column" >
                <Modal
                    open={this.props.open}
                    onClose={this.handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Stack direction="column" spacing={2} sx={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
                            <div className="form-group multi-preview">
                                {(this.fileArray || []).map(url => (
                                    <img src={url} alt='preview' height="100"/>
                                ))}
                            </div>
                            
                            <div className="form-group">
                                <input type="file" className="form-control" onChange={this.uploadMultipleFiles} multiple />
                            </div>
                            
                            <button onClick={this.handleUpload}>Cargar fotos</button>
                        </Stack>
                    </Box>  
                </Modal>   
                <Button onClick={this.props.handleOpen}>
                    <AddPhotoAlternateIcon />
                    Cargar Imagenes
                </Button>

            </Stack>
        )
    }
}

export default FileLoaderGallery2
