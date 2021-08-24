import React, { useRef } from "react";
import { storage } from "../../model/firebase-config";
import { updateUserProfileInfo } from "../../model/firebase-user";
import useTranslation from "next-translate/useTranslation";
import { useSnackbar } from "notistack";
import PrimaryButton from "./PrimaryButton";

const UploadButton = (props) => {
  const ref = useRef(null);
  const handleClick = () => {
    if (ref) {
      return ref.current?.click();
    }
  };
  let { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

  const handleUpload = async (event) => {
    const uploadedImage = event?.target.files[0];
    if (!uploadedImage) return;

    enqueueSnackbar("Uploading Profile Photo...", { variant: "default" });
    const storageRef = storage.ref("avatars");

    try {
      await storageRef.child(props.user_id).put(uploadedImage);
      storageRef
        .child(props.user_id)
        .getDownloadURL()
        .then((url) => {
          updateUserProfileInfo(props.user_id, { avatar_url: url });
        })
        .then(enqueueSnackbar("Profile Photo Updated!", { variant: "success", preventDuplicate: true }));
    } catch (error) {
      enqueueSnackbar(error.message, { variant: "error" });
    }
  };

  return (
    <div>
      <PrimaryButton onClick={() => handleClick()} title={t("form:upload")} width="200px" />
      <input type="file" ref={ref} accept=".png, .jpg, .jpeg, .heic" hidden onChange={handleUpload} />
    </div>
  );
};

export default UploadButton;
