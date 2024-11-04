import React, { useState } from 'react'
import { Button, Input } from 'antd'
import { storage } from 'config/firebase'
import { ref } from 'firebase/storage'

export default function About() {
    const [file, setFile] = useState({})

    const handleUpload = () => {
        if (!file?.size) {
            return window.notify("file is empty", "error")
        }
        let fileExt = file.name.split(".").pop()
        let randomId = window.getRandomId()
        let fileName = `${randomId}.${fileExt}`

        let imageRef = ref(storage, `images/${fileName}`)

        // console.log(imageRef._location.path)
    }

    return (
        <div className='container'>
            <div className="row mt-5">
                <div className="col">
                    <input type="file" className='form-control' onChange={e => { setFile(e.target.files[0]) }} />
                </div>
            </div>
            <div className="row mt-2">
                <div className="col-6 offset-3">
                    <Button type='primary' block onClick={handleUpload}>upload</Button>
                </div>
            </div>
        </div>
    )
}
