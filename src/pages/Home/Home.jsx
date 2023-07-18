import "./home.css";
import { useEffect, useState } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { auth, storage } from "../../config/firebase";
import { saveAs } from 'file-saver';


const Home = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageLists, setImageLists] = useState([]);

  const imageListsRef = ref(storage, "images/");
  const userId = auth?.currentUser?.uid;

  const handleUploadImage = () => {
    if (imageUpload == null) return;
    const imageName = `${userId}_${imageUpload.name + v4()}`;
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        alert("Image Uploaded");
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImageLists((prev) => [{ url, name: imageName }, ...prev]);
          });
      });
  };

  const handleDeleteImage = async (imageName) => {
    const imageRef = ref(storage, `images/${imageName}`);
    console.log(imageRef);
    try {
      await deleteObject(imageRef);
      setImageLists((prev) =>
        prev.filter((image) => image.name !== imageName)
      );
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };


  useEffect(() => {
    listAll(imageListsRef)
      .then((response) => {
        response.items.forEach(item => {
          getDownloadURL(item)
            .then(url => {
              const imageName = item.name;
              const imageUid = imageName.split("_")[0];
              setImageLists((prev) => [{ url, name: item.name, uid: imageUid }, ...prev]);
            });
        });
      });

    if (imageLists != null) {
      // console.log(imageLists);
    }
  }, []);

  const handleDownloadImage = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, `${url.png}`);
      });
  };

  return (
    <div>
      <input
        type="file"
        name="image"
        id="image"
        onChange={(e) => setImageUpload(e.target.files[0])}
      />
      <div>
        {
          imageLists.map(({ url, name, uid }, index) => (
            <div key={index}>
              <img src={url} />
              <>
                {
                  userId === uid &&
                  <button onClick={() => handleDeleteImage(name)}>Delete</button>
                }
              </>
              <button onClick={() => handleDownloadImage(url)}>Download</button>
            </div>
          ))
        }
      </div>
      <button onClick={handleUploadImage}>Submit Query</button>
    </div>
  );
};

export default Home;