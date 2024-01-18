import React, { useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "../styles/Upload.module.css";

const Upload = () => {
  const files = [
    {
      fileName: "Image name",
      fileType: "image/jpeg",
      location: "../assets/upload/media/mediaName.jpeg",
      dateAdded: "Jan 18,2024",
      fileSize: "20MB",
      imageFile: "https://via.assets.so/img.jpg?w=50&h=50&tc=blue&bg=#f2f2f2",
    },
    {
      fileName: "Image name",
      fileType: "image/jpeg",
      location: "../assets/upload/media/mediaName.jpeg",
      dateAdded: "Jan 18,2024",
      fileSize: "20MB",
      imageFile: "https://via.assets.so/img.jpg?w=50&h=50&tc=blue&bg=#f2f2f2",
    },
    {
      fileName: "Image name",
      fileType: "image/jpeg",
      location: "../assets/upload/media/mediaName.jpeg",
      dateAdded: "Jan 18,2024",
      fileSize: "20MB",
      imageFile: "https://via.assets.so/img.jpg?w=50&h=50&tc=blue&bg=#f2f2f2",
    },
    {
      fileName: "Image name",
      fileType: "image/jpeg",
      location: "../assets/upload/media/mediaName.jpeg",
      dateAdded: "Jan 18,2024",
      fileSize: "20MB",
      imageFile: "https://via.assets.so/img.jpg?w=50&h=50&tc=blue&bg=#f2f2f2",
    },
  ];

  const formattedFiles = files.map((file) => {
    const splitPath = file.location.split("/");
    splitPath.shift();
    splitPath.pop();

    return {
      ...file,
      location: splitPath,
    };
  });

  useEffect(() => {
    console.log(formattedFiles[0].location[0]);
  }, [formattedFiles]);

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.searchBar}>
        <p>Search for media name</p>
        <span>
          <SearchIcon className={styles.searchIcon} />
        </span>
      </div>
      <div className={styles.dragDrop}>
        <div className={styles.dragDropInner}>
          <span>
            <UploadFileIcon className={styles.uploadIcon} />
          </span>
          <p className={styles.dragDropText}>
            Drag and drop media here or <span>choose files</span>
          </p>
          <p className={styles.fileSize}>20MB max file size</p>
        </div>
      </div>
      <div className={styles.mediaTableContainer}>
        <table className={styles.mediaTable}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" className={styles.selectAll} />
              </th>
              <th className={styles.headerNames}>File name</th>
              <th className={styles.headerNames}>File type</th>
              <th className={styles.headerNames}>Location</th>
              <th className={styles.headerNames}>Date added</th>
              <th className={styles.headerNames}>File size</th>
            </tr>
          </thead>
          <tbody>
            {formattedFiles.map((file, index) => (
              <tr key={index}>
                <td>
                  <input type="checkbox" />
                </td>
                <td className={styles.imageFileName}>
                  <img src={file.imageFile} alt="imagePlace" />
                  <span>{file.fileName}</span>
                </td>
                <td className={styles.fileType}>{file.fileType}</td>
                <td className={styles.fileLocation}>
                  <span className={styles.firstText}>{file.location[0]}</span>{" "}
                  <span>
                    <KeyboardArrowRightIcon className={styles.rightArrowIcon} />
                  </span>
                  <span className={styles.ellipseText}>
                    {file.location[1].length > 3 ? "..." : file.location[1]}
                  </span>
                  <span>
                    <KeyboardArrowRightIcon className={styles.rightArrowIcon} />
                  </span>{" "}
                  <span className={styles.lastText}>{file.location[2]}</span>
                </td>
                <td className={styles.fileCreatedSize}>{file.dateAdded}</td>
                <td className={styles.fileCreatedSize}>{file.fileSize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Upload;
