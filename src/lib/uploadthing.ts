import type { OurFileRouter } from '@/app/api/uploadthing/core'
import imageCompression from 'browser-image-compression'
import { genUploader } from 'uploadthing/client'

export const { uploadFiles } = genUploader<OurFileRouter>({
  package: '@uploadthing/react'
})

export const resizeImage = async (file: File) => {
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  try {
    const compressedFile = await imageCompression(file, options)
    return compressedFile
  } catch (error) {
    console.error('Resizing image error:', error)
  }
}
