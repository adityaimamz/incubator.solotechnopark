import slugify from "slugify";

export default function generateSlug(title) {
  const options = {
    replacement: "-", // Karakter pengganti untuk spasi
    lower: true, // Mengubah huruf kapital menjadi kecil
    strict: true, // Hanya menyimpan karakter URL yang valid
  };

  const slug = slugify(title, options);
  return slug;
}
