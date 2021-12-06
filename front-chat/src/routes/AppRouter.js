import { BrowserRouter, Navigate } from "react-router-dom";
import { Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../components/LoginScreen';
import { ChatScreen } from '../components/ChatScreen';
import { Navbar } from "../components/ui/NavBar";


export const AppRouter = () => {
    return (
        <BrowserRouter>
        <div className="main-layout">
            <Navbar/>
            <Routes>
                <Route path="/chat" element={<ChatScreen/>} />
                <Route path="/login-logout" element={<LoginScreen/>} />
                <Route path="/*" element={<Navigate to="/chat" replace/>} />
            </Routes>
        </div>
        </BrowserRouter>
    )
}