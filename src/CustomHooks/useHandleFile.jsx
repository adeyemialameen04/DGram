import { useEffect, useState } from "react";
import { getDownloadURL, ref, uploadBytes, deleteObject, listAll } from "firebase/storage";
import { auth, storage } from "../config/firebase";
import { v4 } from "uuid";

const useUploadFile = (reference, type, uploadType) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [fileLists, setFileLists] = useState([]);

  const fileListsRef = ref(storage, reference);
  const userId = auth?.currentUser?.uid;

  const handleUploadFile = () => {
    if (fileUpload == null) return;
    if (!fileUpload.type.startsWith(type)) {
      alert("Please select an image to continue 🥹🥹");
      return;
    }
    const fileName = `${userId}_${v4()}_${fileUpload.name}`;
    const fileRef = ref(storage, `${reference}${fileName}`);


    console.log("Upload", fileUpload);
    console.log("Name", fileName);

    uploadBytes(fileRef, fileUpload)
      .then((snapshot) => {
        alert(`${uploadType} Uploaded Successfully😉😉`);
        getDownloadURL(snapshot.ref)
          .then((url) => {
            setFileLists((prev) => [{ url, name: fileName }, ...prev]);
          });
      });
  };

  const handleDeleteFile = async (fileName, uid) => {
    const fileRef = ref(storage, `${reference}${fileName}`);
    try {
      if (userId === uid) {
        await deleteObject(fileRef);
        setFileLists((prev) =>
          prev.filter((file) => file.name !== fileName)
        );
        alert("File deleted successfully");
      } else {
        alert("You are not eligible to delete this file because you are not the one that uploaded it");
      }
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
          console.log(url);
          return { url, name: fileName, uid: fileUid };
        })
      );
      Promise.all(promises).then((imageData) => {
        const uniqueFileData = [...new Map(imageData.map((item) => [item.name, item])).values()];
        setFileLists(uniqueFileData);
      });
    });
  };

  useEffect(() => {
    // fileLists && console.log("111", fileLists[1].uid);
    // console.log("uida", auth?.currentUser?.uid);
    // fileLists && console.log("2222", fileLists[2]);
  }, []);

  return { handleUploadFile, setFileUpload, handleDeleteFile, getAllFiles, fileLists };
};

export default useUploadFile;