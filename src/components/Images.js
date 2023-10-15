import Image from "./Image";

const Images = ({ images }) => {

  return (
    <div className="images-grid">
      {images.map((image) => (
        <Image key={image.id} image={image}  />
      ))}
    </div>
  );
};

export default Images;
