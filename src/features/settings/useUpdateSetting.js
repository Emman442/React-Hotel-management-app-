import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting as updateSettingApi} from "../../services/apiSettings";


export function useUpdateSetting(){
    const queryClient = useQueryClient();
    const { mutate: updateSetting, isPending: isUpdating } = useMutation({
        mutationFn: updateSettingApi,
        onSuccess: () => {
          toast.success("Setting Edited Successfully!");
          queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err) => {
          toast.error(err.message);
        },
      });

      return{isUpdating, updateSetting}
}