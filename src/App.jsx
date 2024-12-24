import { useState, useEffect } from 'react';
import './App.css';
import { db, storage } from './firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import LoadingSpinner from './Loading-spinner';  // Import the spinner component

function App() {
    const [tiles, setTiles] = useState([]);
    const [message, setMessage] = useState('');
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(true);  // Set loading to true initially

    // Fetch messages on mount
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'tiles'), (snapshot) => {
            const fetchedTiles = snapshot.docs.map((doc) => doc.data());
            setTiles(fetchedTiles);
            setLoading(false);  // Set loading to false when data is fetched
        });

        return () => unsubscribe(); // Cleanup on unmount
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message || !photo) return alert('Please add both a message and a photo!');

        setLoading(true);  // Set loading to true when uploading

        try {
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
        } catch (error) {
            console.error('Error uploading photo or adding message:', error);
            alert('An error occurred. Check your uploaded image is less than 10Mb. Otherwise if this error persists, please contact your elf service.');
        } finally {
            setLoading(false); // Set loading to false when done
        }
    };

    return (
        <>
            {loading && <LoadingSpinner />}

            <div className="flex justify-center items-center gap-2">
                <img src="/save-our-christmas/pic1.jpeg" className="rounded-lg w-1/4 h-auto" alt="pic1" />
                <img src="/save-our-christmas/pic2.jpeg" className="rounded-lg w-1/4 h-auto" alt="pic2" />
                <img src="/save-our-christmas/pic3.jpeg" className="rounded-lg w-1/4 h-auto" alt="pic3" />
                <img src="/save-our-christmas/pic4.jpeg" className="rounded-lg w-1/4 h-auto" alt="pic4" />
            </div>
            <div className="bg-green-900 flex flex-col w-full items-center p-6 px-8 rounded-lg shadow-lg mt-2">
                <h1 className="text-5xl font-bold text-white mb-6">
                    And Christmas greetings to you too!!!<br /><br />Well done for saving Christmas you puzzle fiends.<br /><br />Lots of festive love and cheer,<br /> Zak xxx
                </h1>
                <h1 className="text-3xl font-bold text-white mb-6">p.s. pls add a Christmas message to the wall below!</h1>

                <form
                    onSubmit={handleSubmit}
                    className="bg-green-700 px-6 py-4 shadow-md rounded-lg flex flex-col items-center gap-2 w-full max-w-2xl text-2xl"
                >
                    <p className='px-2 w-full text-left font-bold'>Leave a message:</p>
                    <input
                        type="text"
                        placeholder="Enter your message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full p-2 border text-black border-white rounded-md focus:outline-none focus:ring-2 focus:ring-white"
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
                        disabled={loading} // Disable button when loading
                        className={`font-bold mt-2 px-4 py-2 rounded-md transition ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                            }`}
                    >
                        {loading ? 'Adding...' : 'Add me to the wall!'}
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
                            <p className="mt-4 text-xl text-gray-800">{tile.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default App;
