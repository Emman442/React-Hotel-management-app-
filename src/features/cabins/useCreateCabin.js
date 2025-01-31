import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin(){
    const queryClient = useQueryClient();
    const { mutate, isPending: isCreating } = useMutation({
      mutationFn: (cabin) => createEditCabin(cabin),
      onSuccess: () => {
        toast.success("Cabin Created Successfully!");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });

    return {mutate, isCreating}
}