import React, { useState, createContext, useContext } from "react";

interface AuthContextProps {
    user: any;
    setUser: (user: any) => void;
}

const AuthContext = createContext<AuthContextProps>(
    {} as AuthContextProps
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthContextProps>(() => {
        const auth = localStorage.getItem("user");
        return auth ? JSON.parse(auth) : null;
    });

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextProps {
    return useContext(AuthContext);
}
