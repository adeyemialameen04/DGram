import { AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import useHandleFile from "../../CustomHooks/useHandleFile";
import "./btns.css";
import { auth } from "../../config/firebase";

const Btns = ({ name, uid, url, onFileDeleted, reference, type, uploadType }) => {
  // const reference = "images/";
  // const type = "image/";
  // const uploadType = "Image";
  const { handleDeleteFile, handleDownloadFile } = useHandleFile(reference, type, uploadType);

  const handleDelete = async () => {
    const currentUserUid = auth.currentUser?.uid;
    try {
      if (currentUserUid !== uid) {
        alert("You are not eligible to delete this file because you are not the one that uploaded it");
      } else {
        await handleDeleteFile(name, uid);
        onFileDeleted(name);
        alert("File deleted successfully");
      }
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  return (
    <aside className="btns">
      <button onClick={handleDelete}>
        <AiFillDelete />
      </button>
      <button onClick={() => handleDownloadFile(url)}>
        <AiOutlineDownload />
      </button>
    </aside>
  );
};

export default Btns;