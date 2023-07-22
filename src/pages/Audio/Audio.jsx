import useHandleFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile/ChooseFile";
import { useEffect } from "react";
import Btns from "../../components/Btns/Btns";

const Audio = () => {
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
        <main className="aud__container">
          {
            fileLists.map(({ url, name, uid }, index) => (
              <article style={{
                borderBottom: "1px solid black",
                paddingBottom: "0.5rem",
                marginBottom: "1rem",
              }} key={index}>
                <audio controls src={url}></audio>
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

export default Audio;