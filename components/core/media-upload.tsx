// MediaUploader.tsx
import Image from "next/image";
import React, { useState } from "react";

interface MediaUploaderProps {
  onFileSelected?: (file: File) => void;
  width: number;
    height: number;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({ onFileSelected, width, height }) => {
  const [mediaSource, setMediaSource] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<"image" | "video" | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log(width, height)
    if (file) {
      const fileType = file.type.split("/")[0];
      if (fileType === "image" || fileType === "video") {
        const src = URL.createObjectURL(file);
        setMediaSource(src);
        setMediaType(fileType);
      } else {
        alert("Please upload an image or video format.");
      }

      if (onFileSelected) {
        onFileSelected(file);
      }
    }
  };

  return (
    <div
      className="media-uploader relative w-full border rounded-md border-dashed border-gray-300 flex items-center justify-center cursor-pointer"
      onClick={() => document.getElementById("media-input")?.click()}
    >
      <div className={`aspect-[${width}/${height}] w-full flex items-center justify-center`}>
        {mediaType === "image" && mediaSource && (
          <Image
            src={mediaSource}
            alt="Uploaded Content"
            className="max-w-full max-h-full block object-scale-down"
            fill={true}
          />
        )}
        {mediaType === "video" && mediaSource && (
          <video
            controls
            autoPlay
            loop
            muted
            className="max-w-full max-h-full block"
          >
            <source src={mediaSource} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
        {!mediaSource && <p className="">Click or hover here to upload media.</p>}
        <input
          id="media-input"
          type="file"
          accept="image/*,video/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="absolute inset-0 bg-black rounded-md bg-opacity-50 flex items-center justify-center text-white opacity-0 hover:opacity-100">
          Click to change media {width}x{height}
        </div>
      </div>
    </div>
  );
};

export default MediaUploader;
