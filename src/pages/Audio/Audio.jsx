import useUploadFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile";
import { useEffect } from "react";
import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';

const Audio = () => {
  const reference = "audios/";
  const type = "audio/";
  const uploadType = "Audio";
  const { handleUploadFile, fileLists, setFileUpload, getAllFiles, handleDeleteFile, handleDownloadFile } = useUploadFile(reference, type, uploadType);

  useEffect(() => {
    getAllFiles();
    console.log(fileLists);
  }, []);

  return (
    <div>
      <ChooseFile handleUploadFile={handleUploadFile} setFileUpload={setFileUpload} />
      {
        fileLists.map(({ url, name, uid }, index) => (
          <article key={index}>
            <button onClick={() => handleDeleteFile(name, uid)}>
              <AiFillDelete />
            </button>
            <button onClick={() => handleDownloadFile(url)}>
              <AiOutlineDownload />
            </button>
            <audio controls src={url}></audio>
          </article>
        ))
      }

    </div>
  );
};

export default Audio;