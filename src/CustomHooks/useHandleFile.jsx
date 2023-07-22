import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes, deleteObject, listAll } from "firebase/storage";
import { auth, storage } from "../config/firebase";
import { v4 } from "uuid";
import { saveAs } from "file-saver";


const useHandleFile = (reference, type, uploadType) => {
  const [fileUpload, setFileUpload] = useState({});
  const [fileLists, setFileLists] = useState([]);

  const fileListsRef = ref(storage, reference);
  const userId = auth?.currentUser?.uid;

  const uploadFile = () => {
    if (fileUpload == null) return;
    if (!fileUpload.type.startsWith(type)) {
      alert("Please select an image to continue 🥹🥹");
      return;
    }
    const fileName = `${userId}_${v4()}_${fileUpload.name}`;
    const fileRef = ref(storage, `${reference}${fileName}`);

    uploadBytes(fileRef, fileUpload)
      .then((snapshot) => {
        alert(`${uploadType} Uploaded Successfully😉😉`);
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setFileLists((prev) => [{ url, name: fileName }, ...prev]);
          });
      });
  };

  const deleteFile = async (fileName, uid) => {
    const fileRef = ref(storage, `${reference}${fileName}`);
    try {
      await deleteObject(fileRef);
      setFileLists((prev) =>
        prev.filter((file) => file.name !== fileName)
      );
    } catch (error) {
      return (
        <h1>Error deleting this image</h1>
      );
    }
  };

  const getAllFiles = () => {
    listAll(fileListsRef).then((response) => {
      const promises = response.items.map((item) =>
        getDownloadURL(item).then((url) => {
          const fileName = item.name;
          const fileUid = fileName.split('_')[0];
          const realFileName = fileName.split("_")[2];
          return { url, name: fileName, uid: fileUid, realName: realFileName };
        })
      );
      Promise.all(promises).then((imageData) => {
        const uniqueFileData = [...new Map(imageData.map((item) => [item.name, item])).values()];
        setFileLists(uniqueFileData);
      });
    });
  };

  const handleDownloadFile = (url) => {
    const newUrl = url + ".png";
    saveAs(newUrl);
  };

  return { uploadFile, setFileUpload, deleteFile, getAllFiles, fileLists, setFileLists, handleDownloadFile };
};

export default useHandleFile;