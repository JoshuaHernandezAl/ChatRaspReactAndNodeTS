
import { NavLink } from 'react-router-dom';

export const Navbar = () => {
    return (
        <>
            <nav>
                <ul className="mt-5">
                    <li>
                        <NavLink to="/chat" className={({isActive})=>isActive?"nav-active":''} >Chat</NavLink>
                    </li>
                    <li>
                        <NavLink to="/login-logout" className={({isActive})=>isActive?"nav-active":''} >Login/Logout</NavLink>
                    </li>
                </ul>
            </nav>
            
        </>
    )
}
