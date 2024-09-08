'use client'
import React, { useRef, useEffect } from "react";
import { FileUploaderRegular, UploadCtxProvider } from '@uploadcare/react-uploader';
import '@uploadcare/react-uploader/core.css';
import { useRouter } from 'next/navigation'

type Props = {
    onUpload: (e: string) => any
}

function App({ onUpload }: Props) {
    const uploaderRef = useRef<InstanceType<UploadCtxProvider> | null>(null);
    const router = useRouter()

    useEffect(() => {
        const handleUpload = async (e: any) => {
            console.log(e.detail);
            const file = await onUpload(e.detail.cdnUrl)
            if (file) {
                router.refresh()
            }
        }
        uploaderRef.current && uploaderRef.current.addEventListener('file-upload-success', handleUpload)
    }, [])

    return (
        <div>
            <FileUploaderRegular
                sourceList="local, url, camera, dropbox"
                classNameUploader="uc-purple"
                pubkey="d9bd63ef68127d3b529c"
                apiRef={uploaderRef}
            />
        </div>
    );
}

export default App;