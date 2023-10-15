const SkeletonLoader = () => {
  const items = new Array(9).fill(0);

  return (
    <div className="images-grid">
      {items.map((item, index) => (
        <div key={index} className="image-container">
          <div className="image-view" style={{ height: "200px" }}></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
