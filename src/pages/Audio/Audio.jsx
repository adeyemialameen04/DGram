import useUploadFile from "../../CustomHooks/useHandleFile";
import ChooseFile from "../../components/ChooseFile";
import { useEffect } from "react";

const Audio = () => {
  const reference = "audios/";
  const type = "audio/";
  const uploadType = "Audio";
  const { handleUploadFile, fileLists, setFileUpload, getAllFiles, handleDeleteFile } = useUploadFile(reference, type, uploadType);

  useEffect(() => {
    getAllFiles();
    console.log(fileLists);
  }, []);

  return (
    <div>
      <ChooseFile handleUploadFile={handleUploadFile} setFileUpload={setFileUpload} />
      {
        fileLists.map(({ url, name, uid }, index) => (
          <audio key={index} controls src={url}></audio>
        ))
      }
    </div>
  );
};

export default Audio;