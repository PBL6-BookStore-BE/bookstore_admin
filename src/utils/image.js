export const urlToObject= async(url_image)=> {
    const response = await fetch(url_image);
    // here image is url/location of image
    const blob = await response.blob();
    const file = new File([blob], `image-${Math.floor(Math.random() * 100)}.jpg`, {type: "image/jpeg"});
    return file;
}