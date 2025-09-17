import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// doc : https://docs.uploadthing.com/getting-started/appdir
export const ourFileRouter = {
  avatar: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    try {
      return { ufsUrl: file.ufsUrl, key: file.key };
    } catch (err) {
      throw err;
    }
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
