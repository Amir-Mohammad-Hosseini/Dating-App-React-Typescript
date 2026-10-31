import type { PhotoItemType, PhotoSlotType } from "../components/ProfilePage/types";

const createFormDataFromPhotos = (photos: PhotoSlotType[]) => {
  const formData = new FormData();
  const newFiles: File[] = [];

  const activePhotos = photos.filter(
    (photo): photo is PhotoItemType => photo != null,
  );

  const layout = activePhotos.map((photo) => {
    if (photo.kind === "existing") {
      return { id: photo.id };
    }

    const uploadIndex = newFiles.push(photo.file) - 1;

    return { upload: uploadIndex };
  });

  formData.append("layout", JSON.stringify(layout));

  newFiles.forEach((file) => {
    formData.append("files", file);
  });

  return formData;
};

export default createFormDataFromPhotos;