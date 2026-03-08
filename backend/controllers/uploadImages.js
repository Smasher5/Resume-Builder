import fs from 'fs'
import path from 'path'
import Resume from '../models/resumeModel.js'
import upload from '../middleware/uploadMiddleware.js'

export const uploadResumeImages = async (req, res) => {
    try {
        // 1. Handle the upload first
        upload.fields([{ name: 'thumbnail' }, { name: "profileImage" }])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "File upload failed", error: err.message })
            }

            // FIX: The route is router.put('/:id/...') so we must use req.params.id
            const resumeId = req.params.id; 

            // FIX: Ensure uploadFolder is consistent
            const uploadFolder = path.join(process.cwd(), "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

            if (!resume) {
                return res.status(404).json({ message: "Resume not found or unauthorized" });
            }

            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0];

            // Handle Thumbnail Update
            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnailName = path.basename(resume.thumbnailLink);
                    const oldThumbnailPath = path.join(uploadFolder, oldThumbnailName); // FIX: Used correct variable uploadFolder

                    // Check if file exists before deleting to prevent crashes
                    if (fs.existsSync(oldThumbnailPath)) {
                        fs.unlinkSync(oldThumbnailPath); // FIX: Fixed typo oldTHumbnail -> oldThumbnailPath
                    }
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            // Handle Profile Image Update
            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfileName = path.basename(resume.profileInfo.profilePreviewUrl);
                    const oldProfilePath = path.join(uploadFolder, oldProfileName);

                    if (fs.existsSync(oldProfilePath)) {
                        fs.unlinkSync(oldProfilePath);
                    }
                }
                // Ensure profileInfo object exists
                if (!resume.profileInfo) resume.profileInfo = {};
                
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
            }

            await resume.save();

            res.status(200).json({
                message: "Image uploaded successfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo?.profilePreviewUrl
            });
        })
    } catch (error) {
        console.error('Error uploading images: ', error);
        res.status(500).json({
            message: "Failed to upload images",
            error: error.message
        });
    }
}