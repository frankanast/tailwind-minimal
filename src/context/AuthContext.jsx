import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(!!token);

    useEffect(() => {
        if (token) {
            setLoading(true);

            fetch('https://programmino-be.onrender.com/auth/users/me', {
                headers: { 'Authorization': `Bearer ${token}` }

            })
                .then(async res => {
                    if (!res.ok) throw new Error('Failed to fetch user');
                    return res.json();
                })
                .then(data => {
                    setUser(data);
                    // Fetch profile after user
                    return fetch('https://programmino-be.onrender.com/auth/users/me/profile', {
                        headers: { 'Authorization': `Bearer ${token}` }

                    });
                })

                .then(async res => {
                    if (!res.ok) throw new Error('Failed to fetch profile');
                    const profData = await res.json();
                    setProfile(profData);
                })

                .catch(() => {
                    setToken(null);
                    localStorage.removeItem('token');
                    setUser(null);
                    setProfile(null);
                })
                .finally(() => setLoading(false));
        }
    }, [token]);

    const login = async (username, password) => {
        const res = await fetch('https://programmino-be.onrender.com/auth/authtoken', {
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

    const updateProfile = async (profileUpdates) => {
        const res = await fetch('https://programmino-be.onrender.com/auth/users/me/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(profileUpdates)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.detail || 'Failed to update profile');
        }
        const updated = await res.json();
        setProfile(updated);
        return updated;
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        setProfile(null);
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ token, user, profile, loading, login, logout, updateProfile }}>
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
