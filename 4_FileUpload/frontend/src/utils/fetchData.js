import axios from 'axios';
export const fetchFiles = async () => {
  try {
    const response = await axios.get('http://localhost:3000/uploadFile/files');
    return response.data.files;
  } catch (error) {
    console.error('Error fetching files:', error);
  }
};

export const uploadFile = async (fileUpload) => {
  try {
    const formData = new FormData(); // Create a FormData object
    // console.log(fileUpload);
    formData.append('file', fileUpload);
    const response = await axios.post('http://localhost:3000/uploadFile/upload', formData);
    return response.status
    // console.log(response.data.fileUrl);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
