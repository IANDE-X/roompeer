import React, { useRef } from "react";
import { firebaseInstance, updateUserProfileInfo } from "../../model/firebase-config";
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
    if (!firebaseInstance) return;

    const uploadedImage = event?.target.files[0];
    console.log(uploadedImage);
    if (!uploadedImage) return;

    const storage = firebaseInstance.storage();
    const storageRef = storage.ref("avatars");

    try {
      await storageRef.child(props.user_id).put(uploadedImage);
      storageRef
        .child(props.user_id)
        .getDownloadURL()
        .then((url) => {
          updateUserProfileInfo(props.user_id, { avatar_url: url });
        })
        .then(enqueueSnackbar("Profile Updated", { variant: "success" }));
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
