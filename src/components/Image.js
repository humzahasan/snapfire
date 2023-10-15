import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const Image = ({ image }) => {
  const [showModal, setShowModal] = useState(false);
  const [imageAdditional, setImageAdditional] = useState(null);
  const [infoCache, setInfoCache] = useState({});

  useEffect(() => {
    const fetchData = async (id) => {
      if (infoCache[id]) {
        setImageAdditional(infoCache[id]);
      } else {
        try {
          const additionalInfoResponse = await fetch(
            `https://picsum.photos/id/${id}/info`
          );
          if (additionalInfoResponse.status === 200) {
            const additionalInfo = await additionalInfoResponse.json();
            setImageAdditional(additionalInfo);
            setInfoCache({ ...infoCache, [id]: additionalInfo });
          } else {
            toast.error("Error fetching API");
            console.error("HTTP error:", additionalInfoResponse.status);
          }
        } catch (error) {
          toast.error(error);
          console.error(error);
        }
      }
    };

    if (showModal) {
      fetchData(image.id);
    }
  }, [showModal, image.id, infoCache]);

  const getAdditionalInfo = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setImageAdditional(null);
  };

  const stopPropagation = (event) => {
    event.stopPropagation();
  };

  return (
    <div key={image.id} className="image-container img-container" onClick={getAdditionalInfo}>
      <img
        className="image-view"
        src={image.download_url}
        alt={image.author}
        style={{ width: "100%" }}
      />
      {showModal && imageAdditional && (
        <div className="image-info-modal" onClick={closeModal}>
          <div className="image-info-container" onClick={stopPropagation}>
            <div
              className="info-modal-header"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <p className="primary-color-text">Image Info</p>
              <span className="primary-color-text" onClick={closeModal}>
                X
              </span>
            </div>
            <div className="info-modal-body">
              <div className="img-details">
                <p>Taken by {imageAdditional.author}</p>
                <p>Width: {imageAdditional.width} </p>
                <p>Height: {imageAdditional.height} </p>
              </div>
              <div className="img-details">
                <img
                  alt={`Taken by ${image.author}`}
                  src={imageAdditional.download_url}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Image;
