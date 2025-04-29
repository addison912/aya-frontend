import { domain } from "../config/constants";

export const parsePhotoUrl = (photo) => {
  return `${domain}/uploads/photos/${
    photo.category.toLowerCase() == "advertising"
      ? "Client-Work"
      : photo.category.replace(/\/?\s+/g, "_")
  }/${photo.gallery.replace(/\/?\s+/g, "_").replace(/[^\w\s]/gi, "")}`;
};

export const parseGalleryUrl = (gallery) => {
  return `${domain}/uploads/photos/${
    gallery.category.toLowerCase() == "advertising"
      ? "Client-Work"
      : gallery.category.replace(/\/?\s+/g, "_")
  }/${gallery.name.replace(/\/?\s+/g, "_").replace(/[^\w\s]/gi, "")}`;
};

export const convertToWebp = (url) => {
  return url.replace(/\.(jpg|png|jpeg)$/i, ".webp");
};
