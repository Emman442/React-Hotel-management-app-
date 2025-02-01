import React, { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

export default function AddCabin() {
  return (
    <Modal>
        <Modal.Open opens="cabin-form">
            <Button>Open New Cabin</Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
            <CreateCabinForm/>
        </Modal.Window>
    </Modal>
  );
}
// export default function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add New Cabin
//       </Button>
//       {isOpenModal && (
//         <Modal onClose={()=>setIsOpenModal(false)}>
//           <CreateCabinForm onClose={()=>setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }
