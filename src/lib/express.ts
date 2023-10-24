/**
 * @file Express middleware and methods module.
 * @description some express middleware and methods module.
 * @license MIT
 * @author InkSha<git@inksha.com>
 * @created 2023-10-23
 * @updated 2023-10-23
 * @version 1.0.0
 */

import type { Router, RequestHandler } from 'express'
import express from 'express'
import multer from 'multer'
import { Image } from './image'
import { createStream } from './file'

export const expressConfig = {
  uploadImage: '/upload/img',
  getImage: '/get/img',
  UploadFilesFields: 'UploadFiles',
  imageHandle: new Image(),
  domain: 'localhost',
}

export const ImageRouter: Router = express.Router()

export const uploadFileMiddleware: RequestHandler = (
  Request,
  Response,
  next,
) => {
  const upload = multer({
    storage: multer.memoryStorage(),
    dest: '/assets/tmp/',
  }).array(expressConfig.UploadFilesFields, 10)

  upload(Request, Response, (err) => {
    if (err) Response.send(new Error(err))
    else {
      Request.body[expressConfig.UploadFilesFields] = Request.body.filename
      next()
    }
  })
}

export const uploadImage: RequestHandler = (Request, Response): void => {
  const files = Request.files as Express.Multer.File[]
  const filesArr: { src: string }[] = []
  for (const file of files)
    filesArr.push({
      src:
        expressConfig.getImage +
        '?path=' +
        expressConfig.imageHandle.imageCompression(file.buffer),
    })
  Response.send(filesArr.map((url) => expressConfig.domain + url))
}

export const getImage: RequestHandler = (Request, Response) => {
  Response.set('content-type', 'image/jpeg')
  const path = Request.query?.path
  const responseData: Uint8Array[] = []
  if (path) {
    createStream(expressConfig.imageHandle.saveBaseUrl + path)
      .on('data', (chunk) => {
        responseData.push(chunk as Buffer)
      })
      .on('end', () => {
        Response.write(Buffer.concat(responseData))
        Response.end()
      })
  } else {
    Response.end()
  }
}
