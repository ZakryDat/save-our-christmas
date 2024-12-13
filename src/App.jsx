import { useState, useEffect } from 'react'
import './App.css'

import { db, storage } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

function App() {
    const [tiles, setTiles] = useState([]);
    const [message, setMessage] = useState('');
    const [photo, setPhoto] = useState(null);

    // Fetch messages on mount
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tiles'), (snapshot) => {
            const fetchedTiles = snapshot.docs.map((doc) => doc.data());
            setTiles(fetchedTiles);
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message || !photo) return alert('Please provide both a message and a photo');

        // Upload photo to Firebase Storage
        const photoRef = ref(storage, `photos/${photo.name}`);
        const snapshot = await uploadBytes(photoRef, photo);
        const photoURL = await getDownloadURL(snapshot.ref);

        // Add message and photo URL to Firestore
        const newTile = { message, photoURL };
        await addDoc(collection(db, 'tiles'), newTile);

        // Reset form
        setMessage('');
        setPhoto(null);
    };

    return (
        <>
            <div className='relative my-2'>
                <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl font-bold">
                    And Christmas greetings to you too!!!<br />Lots of festive love and cheer,<br /> Zak xxx
                </h1>
                <img src="/zak.jpg" className='rounded-lg'></img>
            </div>
            <div className="bg-green-900 flex flex-col w-full items-center p-6 px-8 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-white mb-6">Add a Christmas message to the wall!</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-green-700 px-6 py-4 shadow-md rounded-lg flex flex-col items-center gap-2 w-full max-w-md"
                >
                    <p className='px-2 w-full text-left font-bold'>Leave a message:</p>
                    <input
                        type="text"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
                    />
                    <p className='px-2 w-full text-left font-bold'>And choose a photo (portrait works better):</p>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setPhoto(e.target.files[0])}
                        className="w-full p-2 rounded-md focus:outline-none bg-green-500 file:bg-blue-600 file:rounded-lg file:p-2 file:border-0 file:hover:bg-blue-700 transition file:hover:cursor-pointer file:mr-4 file:text-white"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white font-bold mt-2 px-4 py-2 rounded-md hover:bg-blue-700 transition"
                    >
                        Add me to the wall!
                    </button>
                </form>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8 w-full">
                    {tiles.map((tile, index) => (
                        <div
                            key={index}
                            className="bg-white shadow-md rounded-md overflow-hidden flex flex-col items-center p-4"
                        >
                            <img
                                src={tile.photoURL}
                                alt={`Uploaded ${index}`}
                                className="w-full h-96 object-cover rounded-md"
                            />
                            <p className="mt-4 text-sm text-gray-800">{tile.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
