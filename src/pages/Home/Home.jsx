import "./home.css";
import { useEffect, useRef, useState } from 'react';
import { ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { v4 } from "uuid";
import { auth, storage } from "../../config/firebase";
import { saveAs } from 'file-saver';
import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import { onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";


const Home = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageLists, setImageLists] = useState([]);
  const [authCompleted, setAuthCompleted] = useState(false);
  const fileRef = useRef(null);

  const imageListsRef = ref(storage, "images/");
  const userId = auth?.currentUser?.uid;

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthCompleted(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleUploadImage = () => {
    if (imageUpload == null) return;
    const imageName = `${userId}_${imageUpload.name + v4()}`;
    const imageRef = ref(storage, `images/${imageName}`);
    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        alert("Image Uploaded Successfully");
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setImageLists((prev) => [{ url, name: imageName }, ...prev]);
            // setImageUpload();
          });
      });
  };

  const handleDeleteImage = async (imageName, uid) => {
    const imageRef = ref(storage, `images/${imageName}`);

    try {
      if (userId === uid) {
        await deleteObject(imageRef);
        setImageLists((prev) =>
          prev.filter((image) => image.name !== imageName)
        );
        alert("Image deleted successfully");
      } else {
        alert("You are not eligible to download this file because you are not the one that uploaded it");
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  useEffect(() => {
    listAll(imageListsRef).then((response) => {
      const promises = response.items.map((item) =>
        getDownloadURL(item).then((url) => {
          const imageName = item.name;
          const imageUid = imageName.split('_')[0];
          return { url, name: imageName, uid: imageUid };
        })
      );
      Promise.all(promises).then((imageData) => {
        const uniqueImageData = [...new Map(imageData.map((item) => [item.name, item])).values()];
        setImageLists(uniqueImageData);
      });
    });

  }, []);

  useEffect(() => {
    console.log(authCompleted);
  }, [authCompleted]);

  const handleDownloadImage = (url) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        saveAs(blob, `${url}.png`);
      });
  };
  const handleBrowseClick = () => {
    fileRef.current.click();
  };
  return (
    <section className="home__section">
      <div className="container homepage__container">
        <div className="select-image">
          <input
            type="file"
            name="imageInput"
            id="imageInput"
            ref={fileRef}
            style={{
              display: "none"
            }}
            onChange={(e) => setImageUpload(e.target.files[0])}
          />
          <button onClick={handleBrowseClick} className="browseClick">Choose your file</button>
          <button onClick={handleUploadImage}>Submit Query</button>
        </div>
        <div className="images__container">
          {
            imageLists.map(({ url, name, uid }, index) => (
              <article className="image" key={index}>
                <div className="img__container">
                  <img src={url} alt={name} />
                </div>
                <div className="btns">
                  <button onClick={() => handleDeleteImage(name, uid)}>
                    <AiFillDelete />
                  </button>
                  <button onClick={() => handleDownloadImage(url)}>
                    <AiOutlineDownload />
                  </button>
                </div>
              </article>
            ))
          }
        </div>
      </div>
    </section>
  );
};

export default Home;