import { currentUser } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" });

export const ourFileRouter = {
    pdfUploader: f({
        pdf: {
            maxFileSize: "32MB",
            maxFileCount: 1,
        },
    })
        .middleware(async ({  }) => {
            const user = await currentUser();
            if (!user) throw new UploadThingError("Unauthorized");
            return { userId: user.id };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Upload complete for userId:", metadata.userId);
            console.log("file url", file.ufsUrl);
            return { uploadedBy: metadata.userId , file: file.ufsUrl };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
