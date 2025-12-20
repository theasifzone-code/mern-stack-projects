import React, { useEffect, useState } from 'react'
import FileUpload from '../components/FileUpload'
import AllFile from '../components/AllFile'
import { fetchFiles } from "../utils/fetchData";
const Home = () => {
  const [files, setFiles] = useState([]);

  const getFirst = async () => {
    const getall = await fetchFiles();
    // console.log(getall)
    setFiles(getall);
  }

  useEffect(() => {
    getFirst()
  }, [])
  return (
    <div>
      <FileUpload refetch={getFirst}/>
      <AllFile files={files} />
    </div>
  )
}

export default Home
