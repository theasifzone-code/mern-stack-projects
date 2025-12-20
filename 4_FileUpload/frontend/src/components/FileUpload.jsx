import { useState } from "react";
import { uploadFile } from "../utils/fetchData";
import { ToastContainer, toast } from 'react-toastify';
const FileUpload = ({ refetch }) => {
  const [fileUpload, setFileUpload] = useState()
  const [btn, setBtn] = useState("upload")



  // btn text change
  const uploadHandle = async () => {
    setBtn("Uploading")
    const upload = await uploadFile(fileUpload);
    if (upload) {
      setBtn("Uploaded")
      refetch()
    }
    else {
      setBtn("Failed")
    }
    toast.success('File uploaded successfully', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(() => {
      setBtn("upload")
    }, 2000);
    setFileUpload("")
    document.getElementById("file").value = "";
  }

  return (
    <div className='flex flex-col justify-center bg-amber-100 my-5 gap-4 py-5'>
      <ToastContainer />
      <h1 className='font-extrabold text-2xl text-center'>File Upload</h1>
      <form className='flex justify-center py-3'  >
        <input id="file" type="file" onChange={(e) => setFileUpload(e.target.files[0])} className='text-center bg-gray-100 py-2 px-2 font-bold cursor-pointer hover:underline' />
        <button onClick={() => uploadHandle()} type="button" className='bg-black text-white py-2 px-3 cursor-pointer font-bold '>{btn}</button>
      </form>
    </div>
  )
}

export default FileUpload
