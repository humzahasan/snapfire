import { useEffect, useState } from "react";
import Images from "./Images";
import SkeletonLoader from "./SkeletonLoader";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Gallery = () => {
  const [images, setImages] = useState(null);

  const getImages = async () => {
    try {
      const imagesListResponse = await fetch("https://picsum.photos/v2/list");
      // const imagesListResponse = await fetch("https://picsum.photos/v2/lit"); //Error Checking
      if (imagesListResponse.status === 200) {
        const imagesList = await imagesListResponse.json();
        setImages(imagesList);
      } else {
        toast.error("Error fetching API");
        console.error("HTTP error:", imagesListResponse.status);
      }
    } catch (error) {
      toast.error(error);
      console.error(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  return (
    <div className="gallery-container">
      {images ? <Images images={images} /> : <SkeletonLoader />}
      <ToastContainer />
    </div>
  );
};

export default Gallery;
