import React, { useState } from "react";

const PhotoPicker = ({
  onImageSelect,
  label,
  isMulti = false,
  maxSelections, // New prop for max selections when isMulti is true
}) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const MAX_FILE_SIZE_MB = 5; // 5 MB size limit

  // Handle file input change
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    if (files.length) {
      let newImages = [];
      let validFiles = [];

      // Filter files exceeding the size limit
      files.forEach((file) => {
        if (file.size <= MAX_FILE_SIZE_MB * 1024 * 1024) {
          validFiles.push(file);
        } else {
          alert(
            `${file.name} exceeds the 5 MB size limit. Please select a smaller file.`
          );
        }
      });

      if (validFiles.length) {
        if (isMulti) {
          // Check if adding new images exceeds maxSelections
          const totalAfterAdd = selectedImages.length + validFiles.length;
          if (maxSelections && totalAfterAdd > maxSelections) {
            const allowedFiles = validFiles.slice(
              0,
              maxSelections - selectedImages.length
            );
            newImages = [
              ...selectedImages,
              ...allowedFiles.map((file) => URL.createObjectURL(file)),
            ];
            alert(`Maximum ${maxSelections} selections allowed.`);
          } else {
            newImages = [
              ...selectedImages,
              ...validFiles.map((file) => URL.createObjectURL(file)),
            ];
          }
        } else {
          // Single select: take only the first valid file
          newImages = [URL.createObjectURL(validFiles[0])];
        }

        setSelectedImages(newImages);
        if (onImageSelect) {
          onImageSelect(isMulti ? validFiles : validFiles[0]); // Pass valid File object(s) to parent
        }
      }
    }
  };

  // Handle click on any box to trigger file input
  const handleClick = () => {
    if (isMulti && selectedImages.length >= maxSelections) {
      alert(`Maximum ${maxSelections} selections reached.`);
      return;
    }
    document.getElementById("photo-input").click();
  };

  // Render photo boxes based on isMulti and maxSelections
  const renderPhotoBoxes = () => {
    const boxes = [];
    const maxBoxes = isMulti && maxSelections ? maxSelections : 1;

    for (let i = 0; i < maxBoxes; i++) {
      const hasImage = i < selectedImages.length;
      boxes.push(
        <div
          key={i}
          className={`relative w-full ${isMulti ? "h-16" : "h-32"} `}
        >
          <label
            className={`
              w-full h-full 
              flex items-center justify-center 
              rounded-lg 
              border-2 border-dashed border-gray-300 
              cursor-pointer 
              overflow-hidden
              transition-all duration-200
              hover:border-gray-400
              ${hasImage ? "p-0 border-solid border-gray-200" : "p-4"}
            `}
            onClick={handleClick}
          >
            {hasImage ? (
              <img
                src={selectedImages[i]}
                alt={`Selected ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            )}
          </label>
        </div>
      );
    }
    return boxes;
  };

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-xs poppins-light">{label}</h3>
      <div
        className={`
          ${isMulti ? "grid grid-cols-3 gap-4" : "w-full"}
        `}
      >
        {/* Hidden file input */}
        <input
          id="photo-input"
          type="file"
          accept="image/*"
          multiple={isMulti} // Enable multiple file selection when isMulti
          onChange={handleImageChange}
          className="hidden"
        />
        {renderPhotoBoxes()}
      </div>
      {isMulti && maxSelections && (
        <p className="text-sm text-gray-500 mt-2">
          {`Selected ${selectedImages.length} of ${maxSelections} maximum`}
        </p>
      )}
    </div>
  );
};

export default PhotoPicker;
