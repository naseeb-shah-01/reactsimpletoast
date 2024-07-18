import { createContext, useContext, useState, useEffect } from 'react';
import "./toast.css";

let showToast;

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

const baseStyle = {
    bottomRight: {
        position: 'fixed',
        bottom: '10px',
        right: '10px',
    },
    bottomLeft: {
        position: 'fixed',
        bottom: '10px',
        left: '10px',
    },
    bottomCenter: {
        position: 'fixed',
        bottom: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    topRight: {
        position: 'fixed',
        top: '10px',
        right: '10px',
    },
    topLeft: {
        position: 'fixed',
        top: '10px',
        left: '10px',
    },
    topCenter: {
        position: 'fixed',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
    },
    center: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateY(-50%) translateX(-50%)',
    }
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const show = (message, type, position = 'bottomRight', duration = 3000) => {
        const id = Date.now();
        setToasts((prevToasts) => [...prevToasts, { id, message, type, position }]);

        setTimeout(() => {
            setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
        }, duration);
    };

    useEffect(() => {
        showToast = show;
    }, []);

    return (
        <ToastContext.Provider value={{}}>
            <div className="toast-container">
                {toasts.map((toast, index) => (
                    <div 
                        key={toast.id} 
                        className={`toast ${toast.type} ${toast.position}`} 
                        style={{ 
                            ...baseStyle[toast.position], 
                            zIndex: toast.id, 
                            bottom: toast.position.includes('bottom') ? `${10 + index * 50}px` : undefined,
                            top: toast.position.includes('top') ? `${10 + index * 50}px` : undefined
                        }}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
            {children}
        </ToastContext.Provider>
    );
};

export const toast = {
    success: (message, position = 'bottomRight', duration = 3000) => {
        if (showToast) {
            showToast(message, 'success', position, duration);
        } else {
            console.error('ToastProvider is not initialized.');
        }
    },
    error: (message, position = 'bottomRight', duration = 3000) => {
        if (showToast) {
            showToast(message, 'error', position, duration);
        } else {
            console.error('ToastProvider is not initialized.');
        }
    },
    info: (message, position = 'bottomRight', duration = 3000) => {
        if (showToast) {
            showToast(message, 'info', position, duration);
        } else {
            console.error('ToastProvider is not initialized.');
        }
    },
    custom: (content, position = 'bottomRight', duration = 3000) => {
        if (showToast) {
            showToast(content, 'custom', position, duration);
        } else {
            console.error('ToastProvider is not initialized.');
        }
    }
};
