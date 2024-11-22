import { createContext, useContext, useState } from "react";
import { useMutation } from "@tanstack/react-query";

export const FileUploadContext = createContext(undefined);

export function FileUploadProvider({ children }) {
    const [file, setFile] = useState(null);
    const [sourceUrl, setSourceUrl] = useState(undefined);

    const mutation = useMutation({
        mutationFn: async (file) => {
            const formData = new FormData();
            formData.append("file", file);

            const response = await fetch("https://programmino-be.onrender.com/upload_pic/", {
                method: "POST",
                body: formData,
                headers: {
                    "Accept": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error("File upload failed");
            }

            return response.json();
        },
        onSuccess: (data) => {
            setSourceUrl(data.filename);
        },
        onError: (error) => {
            alert(
                "Error while uploading the file; accepted extensions: .png, .jpeg, .jpg only. Please try with a different file, or again in a few minutes."
            );
            console.error("Error uploading file", error);
        },
    });

    const handleUpload = () => {
        if (file) {
            mutation.mutate(file);
        }
    };

    return (
        <FileUploadContext.Provider
            value={{
                file,
                setFile,
                sourceUrl,
                setSourceUrl,
                handleFileChange: (e) => setFile(e.target.files[0]),
                handleUpload,
                mutation,
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
