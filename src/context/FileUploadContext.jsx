import {createContext, useContext, useEffect, useState} from "react";
//import { useMutation } from "@tanstack/react-query";
import axios from 'axios';
import {useRoomMappingFormContext} from "./RoomMappingFormContext.jsx";

export const FileUploadContext = createContext(undefined);

export function FileUploadProvider({ children }) {
    const [file, setFile] = useState(null);
    const [status, setStatus] = useState('idle'); // idle, uploading, success, error
    const [uploadProgress, setUploadProgress] = useState(0);
    const [filenameLink, setFilenameLink] = useState(null);

    const {setImageUrl} = useRoomMappingFormContext()

    function handleFileChange(e) {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    }

    async function handleFileUpload() {
        if (!file) return;

        setStatus('uploading');
        setUploadProgress(0);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://programmino-be.onrender.com/upload_pic/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress: (progressEvent) => {
                    const total = progressEvent.total || 0;
                    const progress = total
                        ? Math.round((progressEvent.loaded * 100) / total)
                        : 0;
                    setUploadProgress(progress);
                },
            });

            if (response.data && response.data.filename) {
                setFilenameLink(`${response.data.filename}`);
            }

            setStatus('success');
            setUploadProgress(100);

        } catch {
            setStatus('error');
            setUploadProgress(0);
        }
    }

    useEffect(() => {
        if (!filenameLink) return;
        setImageUrl(`https://programmino-be.onrender.com/download_pic/${filenameLink}`);

    }, [filenameLink]);

    return (
        <FileUploadContext.Provider
            value={{
                file,
                setFile,
                status,
                setStatus,
                uploadProgress,
                setUploadProgress,
                filenameLink,
                setFilenameLink,
                handleFileChange,
                handleFileUpload,
            }}
        >
            {children}
        </FileUploadContext.Provider>
    );
}

export function useFileUploadContext() {
    const context = useContext(FileUploadContext);

    if (context === undefined) {
        throw new Error("useFileUploadContext must be used within a FileUploadProvider");
    }

    return context;
}
