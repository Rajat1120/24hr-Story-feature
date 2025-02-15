import { createContext, useContext, useEffect, useRef, useState } from "react";
import addCircle from "./assets/addCircle.svg";

const context = createContext();

const App = () => {
  const [images, setImages] = useState([]);

  return (
    <context.Provider value={{ images, setImages }}>
      <div className="app">
        <StroyHeader />
      </div>
    </context.Provider>
  );
};

const saveImageToLocalStorage = (event, setImages) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
  }

  reader.onload = function () {
    const imageData = reader.result;

    //  Get existing images from localStorage
    const existingImages =
      JSON.parse(localStorage.getItem("savedImages")) || [];

    //  Add the new image
    existingImages.push(imageData);

    //  Store updated array in localStorage
    localStorage.setItem("savedImages", JSON.stringify(existingImages));

    setImages(existingImages);
  };
};

const StroyHeader = () => {
  const { setImages } = useContext(context);

  useEffect(() => {
    const existingImages =
      JSON.parse(localStorage.getItem("savedImages")) || [];
    setImages(existingImages);
  }, []);

  function helper(e) {
    saveImageToLocalStorage(e, setImages);
  }

  const fileInputRef = useRef(null);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  return (
    <div className="story-header">
      <div>
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => helper(e)}
        ></input>
        <div onClick={handleDivClick} className="addCircleParent">
          <img className="addCircle" src={addCircle} alt="add image" />
        </div>
      </div>
      <Stories></Stories>
    </div>
  );
};

const Stories = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { images } = useContext(context);
  const handleStoryClick = (index) => {
    setActiveIndex(index);
  };

  const handleNextStory = () => {
    if (activeIndex !== null && activeIndex < images.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      setActiveIndex(null);
    }
  };

  return (
    <div className="stories">
      {images.map((img, index) => (
        <Story key={index} img={img} onClick={() => handleStoryClick(index)} />
      ))}

      {activeIndex !== null && (
        <FullscreenStory
          images={images}
          activeIndex={activeIndex}
          onNext={handleNextStory}
          setActiveIndex={setActiveIndex}
        />
      )}
    </div>
  );
};

const Story = ({ img, onClick }) => {
  return (
    <div className="story" onClick={onClick}>
      <div className="story-image">
        <img src={img} alt="story" />
      </div>
    </div>
  );
};

const FullscreenStory = ({ images, activeIndex, onNext, setActiveIndex }) => {
  useEffect(() => {
    const timer = setTimeout(onNext, 3000);
    return () => clearTimeout(timer);
  }, [activeIndex, onNext]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        onNext();
      }
      if (e.key === "ArrowLeft") {
        if (activeIndex !== null && activeIndex > 0) {
          setActiveIndex((prevIndex) => prevIndex - 1);
        }
      }
      if (e.key === "Escape") {
        setActiveIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIndex, onNext]);

  return (
    <div className="fullscreen-overlay">
      <div className="progress-container">
        {images.map((_, index) => (
          <div
            key={index}
            className={`progress-bar ${index === activeIndex ? "active" : ""}`}
          ></div>
        ))}
      </div>
      <img src={images[activeIndex]} alt="fullscreen-story" />
    </div>
  );
};

export default App;
