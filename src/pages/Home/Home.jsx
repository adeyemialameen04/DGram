import "./home.css";
import { useEffect, useRef, useState } from 'react';
import { auth } from "../../config/firebase";
import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import { saveAs } from "file-saver";
import useUploadFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile";

const Home = () => {
  const [authCompleted, setAuthCompleted] = useState(false);
  const reference = "images/";
  const type = "image/";
  const uploadType = "Image";
  const { handleUploadFile, fileLists, setFileUpload, getAllFiles, handleDeleteFile } = useUploadFile(reference, type, uploadType);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthCompleted(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);


  useEffect(() => {
    getAllFiles();
  }, []);

  const handleDownloadImage = (url) => {
    const lll = url + ".png";
    console.log(lll);
    saveAs(lll);
  };

  return (
    <section className="home__section">
      <div className="container homepage__container">
        <ChooseFile handleUploadFile={handleUploadFile} setFileUpload={setFileUpload} />
        <main className="images__container">
          {
            fileLists.map(({ url, name, uid }, index) => (
              <article className="image" key={index}>
                <div className="img__container">
                  <img src={url} alt={url} />
                </div>
                <div className="btns">
                  <button onClick={() => handleDeleteFile(name, uid)}>
                    <AiFillDelete />
                  </button>
                  <button onClick={() => handleDownloadImage(url)}>
                    <AiOutlineDownload />
                  </button>
                </div>
              </article>
            ))
          }
        </main>
      </div>
    </section>
  );
};

export default Home;