import "./videos.css";
import { useEffect } from 'react';
import useHandleFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile/ChooseFile";
import Btns from "../../components/Btns/Btns";

const Videos = () => {
  const reference = "videos/";
  const type = "video/";
  const uploadType = "Video";
  const { uploadFile, fileLists, setFileLists, setFileUpload, getAllFiles, handleDownloadFile } = useHandleFile(reference, type, uploadType);

  useEffect(() => {
    getAllFiles();
  }, []);

  const handleFileDeleted = (name) => {
    setFileLists((prev) => prev.filter((file) => file.name !== name));
  };

  return (
    <section className="videos__section">
      <div className="container videos__container">
        <ChooseFile uploadFile={uploadFile} setFileUpload={setFileUpload} />
        <main className="vids__container">
          {
            fileLists &&
            fileLists.map(({ url, name, uid, realName }) => (
              <article className="video" key={name}>
                <div className="vid__container">
                  <p>{realName}</p>
                  <video controls src={url} alt={name}></video>
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

export default Videos;