const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

/**
 *
 * @param {*} file
 * @returns
 */
const handleUpload = async (file) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    folder: "sts_neppsoca-sms",
    width: 1200,
    crop: "scale",
  });
  return res;
};

/**
 *
 * @param {*} req
 * @returns
 */
exports.handleFileFormatAndUpload = async (req) => {
  const b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const result = await handleUpload(dataURI);
  return result;
};

/**
 *
 * @param {*} req
 * @returns
 */
exports.deleteOldImage = async (public_id) => {
  await cloudinary.uploader.destroy(public_id);
  // return result;
};

// module.exports = cloudinary;
