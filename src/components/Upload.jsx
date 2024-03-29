import React, { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ClearIcon from "@mui/icons-material/Clear";
import DeleteIcon from "@mui/icons-material/Delete";
import styles from "../styles/Upload.module.css";
import ToastNotification from "./ToastNotification.jsx";

const Upload = () => {
  const [fetchedFiles, setFetchedFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastOperation, setToastOperation] = useState("");
  const hiddenFileInput = useRef(null);

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
    fetchFiles();
  }, [fetchFiles]);

  const formattedFiles = files.map((file) => {
    const splitPath = file.location.split("/");
    splitPath.shift();

    return {
      ...file,
      location: splitPath,
    };
  });

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const chosenFiles = Array.from(e.dataTransfer.files);

    // Check for duplicate files (Not working fix later)
    const filteredFiles = chosenFiles.filter((file) => {
      const existingFile = uploadedFiles.some(
        (uploadedFile) => uploadedFile.name === file.name
      );
      return !existingFile;
    });

    //Check for total file limit (6 files) (Change limit to 9)
    const filesLimit = 12;
    const remainingFiles = filesLimit - uploadedFiles.length;
    const filesToUpload =
      remainingFiles > filteredFiles.length
        ? filteredFiles
        : filteredFiles.slice(0, remainingFiles);

    const newUploadedFiles = filesToUpload.map((file) => ({
      mediaFile: file,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
  };

  const handleRemove = (index) => {
    setUploadedFiles((prevFiles) => {
      const updatedFiles = [...prevFiles];
      updatedFiles.splice(index, 1);
      return updatedFiles;
    });
  };

  const handleClickRef = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = (e) => {
    const chosenFiles = Array.from(e.target.files);

    const newUploadedFiles = chosenFiles.map((file) => ({
      mediaFile: file,
      name: file.name,
      type: file.type,
      size: file.size,
      preview: URL.createObjectURL(file),
    }));

    setUploadedFiles((prevFiles) => [...prevFiles, ...newUploadedFiles]);
  };

  const getAccessToken = () => {
    const cookies = document.cookie
      .split(";")
      .map((cookie) => cookie.split("="));
    const token = cookies.find((cookie) => cookie[0].trim() === "access_token");
    return token ? token[1] : null;
  };

  const uploadFileFunc = async (singleFile, access_token) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/media",
        singleFile,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.status === 201) {
        console.log("File uploaded successfully");
      } else {
        setToastOperation("error");
        setToastMessage("Files upload failed!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      }
    } catch (err) {
      setToastOperation("error");
      setToastMessage("Files upload failed!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
        setToastOperation("");
      }, 5000);
      console.error("Error uploading files", err);
    }
  };

  const handleUpload = async () => {
    const accessTokenCookie = getAccessToken();

    try {
      if (uploadedFiles.length > 1) {
        const uploadPromises = uploadedFiles.map((file) => {
          const modifiedFile = {
            media_name: file.name.split(".")[0],
            media_file: file.mediaFile,
          };

          return uploadFileFunc(modifiedFile, accessTokenCookie);
        });

        await Promise.all(uploadPromises);

        setToastOperation("success");
        setToastMessage("Files uploaded successfully");
        setShowToast(true);
        setUploadedFiles([]);
        fetchFiles();
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      } else if (uploadedFiles.length === 1) {
        const file = uploadedFiles[0];
        const formData = new FormData();
        formData.append("media_name", file.name.split(".")[0]);
        formData.append("media_file", file.mediaFile);

        await uploadFileFunc(formData, accessTokenCookie);

        setToastOperation("success");
        setToastMessage("Files uploaded successfully");
        setShowToast(true);
        setUploadedFiles([]);
        fetchFiles();
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      }
    } catch (err) {
      setToastOperation("error");
      setToastMessage("Files upload failed!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
        setToastOperation("");
      }, 5000);
      console.error("Error uploading files", err);
    }
  };

  const handleDeleteFile = async (mediaId) => {
    const cookies_access = getAccessToken();

    try {
      const response = await axios.delete(
        `http://localhost:8080/media/${mediaId}`,
        {
          headers: {
            Authorization: `Bearer ${cookies_access}`,
          },
        }
      );

      if (response.data.status === 200) {
        setToastOperation("success");
        setToastMessage("File deleted successfully!");
        setShowToast(true);
        fetchFiles();
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      } else {
        setToastOperation("error");
        setToastMessage("Error deleting file!");
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setToastMessage("");
          setToastOperation("");
        }, 5000);
      }
    } catch (err) {
      setToastOperation("error");
      setToastMessage("Error deleting file!");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        setToastMessage("");
        setToastOperation("");
      }, 5000);
      console.error("Error deleting file", err);
    }
  };

  return (
    <div className={styles.uploadContainer}>
      <div className={styles.searchBar}>
        <p>Search for media name</p>
        <span>
          <SearchIcon className={styles.searchIcon} />
        </span>
      </div>
      <div
        className={`${styles.dragDrop} ${
          dragging ? styles.dragDropActive : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.dragDropInner}>
          {uploadedFiles.length === 0 ? (
            <>
              <span>
                <UploadFileIcon className={styles.uploadIcon} />
              </span>
              <p className={styles.dragDropText}>
                Drag and drop media here or{" "}
                <span onClick={handleClickRef}>Choose files</span>
                <input
                  type="file"
                  ref={hiddenFileInput}
                  id="fileInput"
                  multiple
                  onChange={handleFileChange}
                />
              </p>
              <p className={styles.fileSize}>20MB max file size</p>
            </>
          ) : (
            <div className={styles.imageDroppedContainer}>
              <div
                className={`${styles.previewImgContainer} ${
                  uploadedFiles.length > 3 ? styles.previewImgContainerLg : ""
                }`}
              >
                {uploadedFiles.map((file, index) => (
                  <div key={index} className={styles.previewItem}>
                    <img
                      src={file.preview}
                      alt={`Preview ${file.name}`}
                      className={styles.previewImg}
                    />
                    <span onClick={() => handleRemove(index)}>
                      <ClearIcon className={styles.removeIcon} />
                    </span>
                  </div>
                ))}
              </div>
              <button className={styles.uploadBtn} onClick={handleUpload}>
                Upload
              </button>
            </div>
          )}
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
              <th className={styles.headerNames}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {fetchedFiles.map((file) => {
              const location = file.media_path.split("/");
              location.shift();
              const formattedDate = new Date(
                file.created_at
              ).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });

              // Call api to get file size here using name with extension.

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
                  <td className={styles.fileCreatedSize}>{formattedDate}</td>
                  <td className={styles.fileCreatedSize}>
                    {formattedFiles[0].fileSize}
                  </td>
                  <td className={styles.fileActions}>
                    <button
                      className={styles.fileDelBtn}
                      onClick={() => handleDeleteFile(file.media_id)}
                    >
                      <DeleteIcon className={styles.fileDelIcon} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showToast && (
        <ToastNotification message={toastMessage} operation={toastOperation} />
      )}
    </div>
  );
};

export default Upload;
