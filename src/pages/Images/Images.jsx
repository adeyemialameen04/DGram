import "./images.css";
import { useEffect, useRef, useState } from 'react';
import { auth } from "../../config/firebase";
import useHandleFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile/ChooseFile";
import Btns from "../../components/Btns/Btns";

const Images = () => {
  const [authCompleted, setAuthCompleted] = useState(false);
  const reference = "images/";
  const type = "image/";
  const uploadType = "Image";
  const { handleUploadFile, fileLists, setFileLists, setFileUpload, getAllFiles, handleDeleteFile, handleDownloadFile } = useHandleFile(reference, type, uploadType);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setAuthCompleted(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleFileDeleted = (name) => {
    setFileLists((prev) => prev.filter((file) => file.name !== name));
  };

  useEffect(() => {
    getAllFiles();
  }, []);

  if (fileLists.length == []) {
    return (
      <h1>There are not {uploadType} files saved</h1>
    );
  }

  return (
    <section className="images__section">
      <div className="container images__container">
        <ChooseFile handleUploadFile={handleUploadFile} setFileUpload={setFileUpload} />
        <main className="imgs__container">
          {
            fileLists &&
            fileLists.map(({ url, name, uid }) => (
              <article className="image" key={name}>
                <div className="img__container">
                  <img src={url} alt={name} />
                </div>
                <Btns
                  name={name}
                  url={url}
                  uid={uid}
                  onFileDeleted={handleFileDeleted}
                  reference={reference}
                  type={type}
                  uploadType={uploadType}
                />
              </article>
            ))
          }
        </main>
      </div>
    </section>
  );
};

export default Images;