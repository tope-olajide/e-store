import React, {useState} from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { FETCH_MY_IMAGE_GALLERY } from "../../queries/imageGallery";
import { DELETE_IMAGE_MUTATION } from "../../mutations/imageGallery";
import Modal from '../Commons/Modal'
const ImageGallery = () => {
  const [isModal, setIsModal] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState()
const [deletePicture, { data:imageData, error:deletePictureQueryError,  loading:deletePictureQueryLoading}] = useMutation(DELETE_IMAGE_MUTATION);
  const { data:gallery, error:fetchGalleryQueryError, loading:fetchGalleryQueryLoading} = useQuery (FETCH_MY_IMAGE_GALLERY);
  if (fetchGalleryQueryLoading) return "Loading...";
  if (fetchGalleryQueryError) return `Error! ${fetchGalleryQueryError.message}`;
  if (!gallery) return <p>Not found</p>;
 
  const toggleModal = (imageId) => {
    setSelectedImageId(imageId)
    return setIsModal(!isModal)
  }
  
  const deleteImage = async () => {
     try {
      await deletePicture({
        variables: {imageId:selectedImageId},
      });
    } catch (error) {
      console.log(error);
    } 
    toggleModal()
  }
  return (
    <>
{isModal?<Modal closeModal={toggleModal} modalBodyContents={"Delete picture?"} confirmAction={deleteImage} modalTitle={"Modal"} />:""}
       <section className="dashboard-container">
        
        <h1 class="admin-panel-title">Image Gallery</h1>
        <section class="image-gallery-container">
          {gallery.fetchUserGallery.map((gallery) => {
            return (
              <div key={gallery._id} class="image-gallery">
                <figure class="image">
                  <img src={gallery.imageUrl} alt={""} />
                </figure>
                <button onClick={()=>toggleModal(gallery._id)} class="gallery-button">DELETE</button>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
};
export default ImageGallery;
