import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import styles from "../styles/Upload.module.css";

const Upload = () => {
  const [fetchedFiles, setFetchedFiles] = useState([]);

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

  const fetchFiles = useCallback(async () => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    const access_token = token ? token[1] : null;

    try {
      const response = await axios.get("http://localhost:8080/media", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.data.status === 200) {
        setFetchedFiles(response.data.data);
        // Handle to show empty message here
      } else if (response.data.status === 404) {
        setFetchedFiles([]);
        // Handle to show empty message here
      } else {
        console.error("Error fetching files", response);
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setFetchedFiles([]);
        // Handle to show empty message here
      } else {
        console.error("Error fetching files", err);
      }
    }
  }, []);

  useEffect(() => {
    // const handleFetch = async () => {
    //   await fetchFiles();
    //   if (fetchedFiles.length > 0) {
    //     const updatedFiles = fetchedFiles.map((file) => {
    //       const path = file.media_path.split("/");
    //       path.shift();

    //       return {
    //         ...file,
    //         media_path: path,
    //       };
    //     });

    //     setFetchedFiles(updatedFiles);

    //     console.log(updatedFiles);
    //   }
    // };

    fetchFiles();

    // if (fetchedFiles.length > 0) {
    //   console.log(fetchedFiles);
    // }
  }, [fetchFiles]);

  const formattedFiles = files.map((file) => {
    const splitPath = file.location.split("/");
    splitPath.shift();

    return {
      ...file,
      location: splitPath,
    };
  });

  // useEffect(() => {
  //   if (formattedFiles.length > 0 && formattedFiles[0].location) {
  //     console.log(formattedFiles[0].location[0]);
  //   }
  // }, [formattedFiles]);

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
            {fetchedFiles.map((file) => {
              const location = file.media_path.split("/");
              location.shift();

              return (
                <tr key={file.media_id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td className={styles.imageFileName}>
                    <img
                      src={`http://localhost:8080/file/${encodeURIComponent(
                        location[3]
                      )}`}
                      alt={file.media_name}
                    />
                    <span>{file.media_name}</span>
                  </td>
                  <td className={styles.fileType}>{file.media_type}</td>
                  <td className={styles.fileLocation}>
                    <span className={styles.firstText}>{location[0]}</span>
                    {""}
                    <span>
                      <KeyboardArrowRightIcon
                        className={styles.rightArrowIcon}
                      />
                    </span>
                    <span className={styles.ellipseText}>
                      {location[1].length > 3 ? "..." : location[1]}
                    </span>
                    <span>
                      <KeyboardArrowRightIcon
                        className={styles.rightArrowIcon}
                      />
                    </span>
                    {""}
                    <span className={styles.lastText}>{location[2]}</span>
                  </td>
                  <td className={styles.fileCreatedSize}>
                    {formattedFiles[0].dateAdded}
                  </td>
                  <td className={styles.fileCreatedSize}>
                    {formattedFiles[0].fileSize}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Upload;
