import React from 'react'
import './Main.css'

function Main() {

    const handleLogout = () => {
        localStorage.removeItem("token")
        window.location.reload()
    }

    return (
        <div className='main_container'>
            <nav className='navbar'>
                <h1>Sample</h1>
                <button className='white_btn' onClick={handleLogout}>
                    LogOut
                </button>
            </nav>
        </div>
    )
}

export default Main
