import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(!!token);

    useEffect(() => {
        if (token) {
            setLoading(true);
            fetch('https://programmino-be.onrender.com/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
                .then(async res => {
                    if (!res.ok) throw new Error('Failed to fetch user');
                    const data = await res.json();
                    setUser(data);
                })
                .catch(() => {
                    setToken(null);
                    localStorage.removeItem('token');
                    setUser(null);
                })
                .finally(() => setLoading(false));
        }
    }, [token]);

    const login = async (username, password) => {
        const res = await fetch('https://programmino-be.onrender.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ username, password })
        });
        if (!res.ok) throw new Error('Invalid credentials');
        const data = await res.json();
        setToken(data.access_token);
        localStorage.setItem('token', data.access_token);
        return data;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuthContext must be used within an AuthProvider');
    }
    return context;
}
