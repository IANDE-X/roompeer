import React, { useRef, useState } from "react";
import styled from "styled-components";
import { storage } from "../../model/firebase-config";
import { ref, getDownloadURL, uploadBytesResumable } from "@firebase/storage";
import { updateUserProfileInfo } from "../../model/firebase-user";
import { LinearProgress } from "@material-ui/core";
import useTranslation from "next-translate/useTranslation";
import { useSnackbar } from "notistack";
import PrimaryButton from "./PrimaryButton";

const UploadButton = (props) => {
  const imgRef = useRef(null);
  const handleClick = () => {
    if (imgRef) {
      return imgRef.current?.click();
    }
  };
  let { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();
  const [uploadProgress, setUploadProgess] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (event) => {
    const uploadedImage = event?.target.files[0];
    if (!uploadedImage) return;

    setUploading(true);
    const userAvatarRef = ref(storage, `avatars/${props.user_id}`);
    const uploadTask = uploadBytesResumable(userAvatarRef, uploadedImage);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgess(progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
        }
      },
      (error) => {
        setUploading(false);
        switch (error.code) {
          case "storage/unauthorized":
            break;
          case "storage/canceled":
            break;
          case "storage/unknown":
            break;
        }
      },
      () => {
        setUploading(false);
        enqueueSnackbar(t("notifaction:photo_uploaded"), { variant: "success" });
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          updateUserProfileInfo(props.user_id, { avatar_url: downloadURL });
        });
      }
    );
  };

  return (
    <div>
      <PrimaryButton onClick={() => handleClick()} title={t("form:upload")} width="200px" />
      <input type="file" ref={imgRef} accept=".png, .jpg, .jpeg, .heic" hidden onChange={handleUpload} />
      {uploading ? (
        <ContentWrapper>
          <LinearProgress value={uploadProgress} variant="determinate" />
          <p>Uploading ...</p>
        </ContentWrapper>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UploadButton;

const ContentWrapper = styled.div`
  padding: 10px;
  display: grid;
`;
