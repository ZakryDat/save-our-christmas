import React, { useState, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const DownloadFile = ({ fileName, buttonText }) => {
    const [downloadUrl, setDownloadUrl] = useState(null);

    useEffect(() => {
        const fetchFileUrl = async () => {
            const storage = getStorage();
            const fileRef = ref(storage, `files/${fileName}`);
            try {
                const url = await getDownloadURL(fileRef);
                setDownloadUrl(url);
            } catch (error) {
                console.error("Error fetching file URL:", error);
                alert("Could not retrieve the file.");
            }
        };

        fetchFileUrl();
    }, [fileName]);

    return (
        <div className="flex flex-col items-center mt-10">
            {downloadUrl ? (
                <a
                    href={downloadUrl}
                    target="_blank" // Opens in a new tab
                    rel="noopener noreferrer" // Security best practice for external links
                    className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600"
                >
                    {buttonText}
                </a>
            ) : (
                <p className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600">{buttonText}</p>
            )}
        </div>
    );
};

export default DownloadFile;
