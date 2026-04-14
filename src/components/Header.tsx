import { useState } from 'react';
import { authService } from '../services/auth';

interface HeaderProps {
    username: string;
}

export default function Header({ username }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const firstLetter = username.charAt(0).toUpperCase();

    return (
        <header className="app-header">
            <div className="header-left">
                <div className="logo-icon">
                    <img src="/logo.png" alt="" id='logo'/>
                </div>
                <h1>NoteNest</h1>
            </div>

            <div className="header-right" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <span className="username">{username}</span>
                <div className="avatar">{firstLetter}</div>
                <span className={`arrow ${isMenuOpen ? 'open' : ''}`}>▼</span>

                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <button onClick={() => authService.logout()}>Log Out</button>
                    </div>
                )}
            </div>
        </header>
    );
}