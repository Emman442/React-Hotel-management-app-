import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation } from "@tanstack/react-query";
import { useCreateCabin } from "./useCreateCabin";

export function useEditCabin(){
    const { mutate: editCabin, isPending: isEditing } = useMutation({
        mutationFn: ({ cabin, id }) => createEditCabin(cabin, editId),
        onSuccess: () => {
          toast.success("Cabin Edited Successfully!");
          queryClient.invalidateQueries({ queryKey: ["cabins"] });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });

      return{editCabin, isEditing}
}