import supabase from "./supabase"

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if(error){
    console.error("Cabins Could not be loaded")
    throw new Error("Cabins Could not be loaded")
  }

  return data
}


export async function deleteCabin(id){
  const {data, error } = await supabase.from("cabins").delete().eq("id", id);
  if(error){
    console.error("Cabin Could not be deleted", error)
    throw new Error("Cabin Could not be deleted")
  }

  return data;
}


export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(import.meta.env.VITE_SUPABASE_URL);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabin.image
    : `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from("cabins");

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin was not created"
    );
  }

  return data;
}
