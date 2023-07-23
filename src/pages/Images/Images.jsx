import "./images.css";
import { useEffect } from 'react';
import useHandleFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile/ChooseFile";
import Btns from "../../components/Btns/Btns";

const Images = () => {
  const reference = "images/";
  const type = "image/";
  const uploadType = "Image";
  const { uploadFile, fileLists, setFileLists, setFileUpload, getAllFiles, handleDownloadFile } = useHandleFile(reference, type, uploadType);

  useEffect(() => {
    getAllFiles();
  }, []);

  const handleFileDeleted = (name) => {
    setFileLists((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <section className="images__section">
      <div className="container images__container">
        <ChooseFile uploadFile={uploadFile} setFileUpload={setFileUpload} />
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