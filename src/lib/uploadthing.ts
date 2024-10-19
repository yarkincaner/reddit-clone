import type { OurFileRouter } from '@/app/api/uploadthing/core'
import { genUploader } from 'uploadthing/client'

export const { uploadFiles } = genUploader<OurFileRouter>({
  package: '@uploadthing/react'
})
