import useHandleFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile/ChooseFile";
import { useEffect } from "react";
import Btns from "../../components/Btns/Btns";
import "./audio.css";

const Audios = () => {
  const reference = "audios/";
  const type = "audio/";
  const uploadType = "Audio";
  const { handleUploadFile, fileLists, setFileLists, setFileUpload, getAllFiles, handleDeleteFile, handleDownloadFile } = useHandleFile(reference, type, uploadType);

  useEffect(() => {
    getAllFiles();
  }, []);


  const handleFileDeleted = (name) => {
    setFileLists((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <section className="audio__section">
      <div className="container audios__container">
        <ChooseFile handleUploadFile={handleUploadFile} setFileUpload={setFileUpload} />
        <main className="auds__container">
          {
            fileLists.map(({ url, name, uid, realName }, index) => (
              <article className="audio" key={index}>
                <div className="aud__container">
                  <p>{realName}</p>
                  <audio controls src={url}></audio>
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

export default Audios;