import { useRef } from 'react';
import "./chooseFile.css";

const ChooseFile = ({ setFileUpload, handleUploadFile }) => {
  const fileRef = useRef(null);


  const handleBrowseClick = () => {
    fileRef.current.click();
  };

  return (
    <aside className="select-image">
      <input
        type="file"
        name="imageInput"
        id="imageInput"
        ref={fileRef}
        style={{
          display: "none"
        }}
        onChange={(e) => setFileUpload(e.target.files[0])}
      />
      <button onClick={handleBrowseClick} className="browseClick">Choose your file</button>
      <button onClick={handleUploadFile}>Submit Query</button>
    </aside>
  );
};

export default ChooseFile;