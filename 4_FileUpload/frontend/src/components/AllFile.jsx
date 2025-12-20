import React, { useEffect, useState } from 'react'
import { RxCross2 } from "react-icons/rx";
const AllFile = ({files}) => {
    const [show, setShow] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);

    // show image
    const handleShow = (imgUrl) => {
        setShow(true);
        setSelectedFile(imgUrl)
    }

    // remove image
    const hanleReset = () => {
        setShow(false);
        setSelectedFile(null);
    }

    return (
        <div>
            {
                files.length > 0 ?
                    files.map((file, index) => (
                        <button key={file._id} onClick={() => handleShow(file.fileUrl)} className='bg-black text-white my-2 mx-3 px-3 py-2 border border-rounded'>
                            image {index + 1}
                        </button>
                    )) : <h1>No Files</h1>
            }
            {show &&
                <div className='flex justify-center '>
                    <img src={selectedFile} alt="" className='w-1/3 ' />
                    <RxCross2 onClick={() => hanleReset()} className='font-extrabold text-3xl relative top-0 left-0  bg-red-500' />
                </div>
            }
        </div>
    )
}

export default AllFile
