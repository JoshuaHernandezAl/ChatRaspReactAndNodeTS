import React from 'react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { fetchSinToken } from './helpers/fetch';
import { useNavigate } from "react-router-dom";
import './login.css';


export const LoginScreen =() => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [formLoginValues,handleLoginInputChange]=useForm({
        lusername:'joshDan',
        lPassword:'123123',
    });
    const [formRegisterValues,handleRegisterInputChange]=useForm({
        rusername:'ihokyHdz',
        rPassword1:'123123',
    });
    const {rusername,rPassword1}= formRegisterValues;
    const {lusername,lPassword}=formLoginValues;
    const handleLogin=async(e)=>{
        e.preventDefault();
        if(lusername==='' || lPassword===''){
            return Swal.fire('Error','Todos los campos son obligatorios','error')
        }
        const data={
            username:lusername,
            password:lPassword
        }
        const res=await fetchSinToken('login',data,'POST');
        const user=await res.json();
        if(user.ok){
            localStorage.setItem('username',user.user.username);
            localStorage.setItem('token',user.token);
            navigate('/chat',{replace:true});
        }else{
            Swal.fire('Error',user.msg,'error');
        }
        
    }
    const handleRegister=async(e)=>{
        e.preventDefault();
        if(rusername===''){
            return Swal.fire('Error','Todos los campos son obligatorios','error')
        }
        const data={
            username:rusername,
            password:rPassword1,
        }
        const res=await fetchSinToken('signup',data,'POST');
        const user=await res.json();
        if(user.ok){
            localStorage.setItem('username',user.user.username);
            localStorage.setItem('token',user.token);
            navigate('/chat',{replace:true});
        }else{
            Swal.fire('Error',user.msg,'error');
        }
    }
    const handleShowPassword=(e)=>{
        e.preventDefault();
        setShow(!show);
    }
    const handleShowPassword1=(e)=>{
        e.preventDefault();
        setShow1(!show1);
    }
    if(!localStorage.getItem('username')){
        return (
            <>
                <div className="container login-container">
                    <div className="row">
                        <div className="col-md-5 login-form-1">
                            <h3>Ingreso</h3>
                            <form onSubmit={handleLogin} className="mt-5">
                                <div className="row mb-3">
                                    <label className="col-md-4 form-label">UserName</label>
                                    <div className="col-md-8">
                                        <input 
                                            type="text"
                                            className="form-control f-size"
                                            placeholder="Email"
                                            name='lusername'
                                            value={lusername}
                                            onChange={handleLoginInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label  className="col-md-4 form-label">Contraseña</label>
                                    <div className="col-md-8 d-flex justify-content-start">
                                        <input
                                            type={(show?'text':'password')}
                                            className="form-control f-size"
                                            placeholder="Contraseña"
                                            name='lPassword'
                                            value={lPassword}
                                            onChange={handleLoginInputChange}
                                        />
                                        <button className="btn btn-dark" onClick={handleShowPassword}><span className='fs-4'>{(show)?"Hide":"Show"}</span></button>
                                    </div>
                                </div>
                                <div className="form-group btn-center mt-4">
                                    <input 
                                        type="submit"
                                        className="btnSubmit btn-center"
                                        value="Ingresar" 
                                    />
                                </div>
                            </form>
                        </div>
    
                        <div className="col-md-6 login-form-2">
                            <h3>Registro</h3>
                            <form onSubmit={handleRegister}>
                                <div className="row mb-3">
                                    <label  className="col-md-4 form-label">UserName</label>
                                    <div className="col-md-8">
                                        <input
                                            type="text"
                                            className="form-control f-size"
                                            placeholder="Nombre"
                                            name=''
                                            value={rusername}
                                            onChange={handleRegisterInputChange}
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <label  className="col-md-4 form-label">Contaseña</label>
                                    <div className="col-md-8 d-flex justify-content-start">
                                        <input
                                            type={(show1?'text':'password')}
                                            className="form-control f-size"
                                            placeholder="Contraseña"
                                            name='rPassword1'
                                            value={rPassword1}
                                            onChange={handleRegisterInputChange} 
                                        />
                                        <button className="btn btn-dark" onClick={handleShowPassword1}><span className='fs-4'>{(show1)?"Hide":"Show"}</span></button>
                                    </div>
                                </div>
                                <div className="form-group btn-center">
                                    <input 
                                        type="submit"
                                        className="btnSubmit btn-center"
                                        value="Registrar" 
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        localStorage.clear();
    }
    
}