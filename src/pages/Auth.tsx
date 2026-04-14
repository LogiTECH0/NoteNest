import { useState, useEffect } from 'react';
import { authService } from '../services/auth';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setName] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [countdown, setCountdown] = useState(5);

    // useEffect(() => {
    //     if (authService.isAuthenticated()) {
    //         navigate('/');
    //     }
    // }, [navigate]);

    useEffect(() => {
        if (!isSuccess) return;

        if (countdown <= 0) {
            if (isLogin) {
                window.location.href = '/';
            } else {
                setIsSuccess(false);
                setIsLogin(true);
                setCountdown(5);
            }
            return;
        }

        const timer = setTimeout(() => {
            setCountdown(prev => prev - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isSuccess, countdown, isLogin]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(null);

        const endpoint = isLogin ? '/api/User/login' : '/api/User/register';

        try {
            const response = await fetch(`https://notenest-22y7.onrender.com${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const contentType = response.headers.get("content-type");
            let data;
            if (contentType && contentType.includes("application/json")) {
                data = await response.json();
            } else {
                const textData = await response.text();
                data = { message: textData };
            }

            if (response.ok) {
                if (!isLogin) {
                    if (data.token) authService.setToken(data.token);
                    setIsSuccess(true);
                }
                else if (isLogin && data.token) {
                    authService.setToken(data.token);
                    setIsSuccess(true);
                }
                else {
                    setErrorMessage('Could not retrieve token. Please try again.');
                }
            } else {
                setErrorMessage(data.message || 'Authentication error');
            }
        } catch (err) {
            setErrorMessage('Server is unavailable. Please try again later.');
            console.error(err);
        }
    };

    return (
        <div className="auth">
            <div className="scroll">
                <div className="bg-pattern-dark"></div>
            </div>

            <div className="auth-container">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>{isLogin ? 'Login to NoteNest' : 'Create Account'}</h2>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">{isLogin ? 'Sign In' : 'Sign Up'}</button>
                    <p className="auth-toggle-text" onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
                    </p>
                </form>
            </div>
            {isSuccess && (
                <div className="modal-backdrop">
                    <div className="modal success-modal">
                        <div className="success-icon">✅</div>
                        <h3>Успішно!</h3>
                        <p>
                            {isLogin
                                ? 'You have successfully logged in.'
                                : 'Registration completed successfully.'}
                        </p>
                        <p className="redirect-text">
                            {isLogin
                                ? `Redirecting you to the app in ${countdown}s...`
                                : `Moving to login page in ${countdown}s...`}
                        </p>
                        <div className="loader-bar">
                            <div className="loader-fill" style={{ width: `${(5 - countdown) * 20}%` }}></div>
                        </div>
                    </div>
                </div>
            )}
            {errorMessage && (
                <div className="modal-backdrop" onClick={() => setErrorMessage(null)}>
                    <div className="modal error-modal" onClick={(e) => e.stopPropagation()}>
                        <h3>⚠️ Error</h3>
                        <p>{errorMessage}</p>
                        <button onClick={() => setErrorMessage(null)}>OK</button>
                    </div>
                </div>
            )}
        </div>
    );
}