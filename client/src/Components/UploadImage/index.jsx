import React, { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "@apollo/react-hooks";
import { SAVE_UPLOADED_PICTURES } from "../../mutations/imageUpload";
const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const thumbs = files.map((file) => (
    <div class={"selected-image"} key={file.name}>
      <img src={file.preview} /* style={img} */ />
    </div>
  ));
  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const [savePictures, { loading, data, error }] = useMutation(SAVE_UPLOADED_PICTURES);
  const saveImageUrls = async() => {
     let uploadedImagesUrl = [];
    const uploadPictures = files.map(async (file) => {
      // Initial FormData
      const formData = new FormData();
      formData.append("upload_preset", "sijxpjkn");
      formData.append("api_key", "139423638121511");
      formData.append("file", file);
      formData.append("timestamp", (Date.now() / 1000) | 0);
      try {
        let response = await fetch("https://api.cloudinary.com/v1_1/temitope/image/upload",{
          method: "post",
          body: formData,
        });
        let data = await response.json()
        console.log(data)
        const { secure_url, public_id } = data;
        uploadedImagesUrl.push({ imageUrl: secure_url, imageId: public_id });
      } catch (err) {
        console.log(err);
      }
    });
     // Once all the files are uploaded
    return Promise.all(uploadPictures).then(async () => {
      console.log(uploadedImagesUrl);

      try {
        await savePictures({
          variables: {uploadedImagesUrl},
        });
      } catch (error) {
        console.log(error);
      }
    }); 
  };
  return (
    <>
      <section class="dashboard-container">
        <h1 class="admin-panel-title">Image Upload</h1>
        <section class="image-upload-container">
          <div {...getRootProps({ className: "image-upload-section" })}>
            <input {...getInputProps()} />
            <h2>Drop any image files here</h2>
            <p>or</p>
            <h3>Select files</h3>
          </div>
          <section class="selected-image-container">{thumbs}</section>
        </section>
        <button className="upload-button" onClick={saveImageUrls}>Upload</button>
      </section>
    </>
  )
}

export default ImageUpload;
