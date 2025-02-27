import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "./CreateCabinForm";
import { useDeleteCabin } from "./useDeleteCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { useCreateCabin } from "./useCreateCabin";
import ConfirmDelete from "../../ui/ConfirmDelete"
import Modal from "../../ui/Modal";
const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { isPending, mutateAsync } = useDeleteCabin();
  const { id, name, image, maxCapacity, regularPrice, discount } = cabin;
  const { isCreating, mutate } = useCreateCabin();

  function handleDuplicate() {
    mutate({
      name: `Copy Of ${name}`,
      maxCapacity,
      regularPrice,
      image,
      discount,
    });
  }
  return (
    <TableRow role="row">
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits Up to {maxCapacity}</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <button onClick={() => handleDuplicate()}>
          <HiSquare2Stack />
        </button>

        <Modal>
          <Modal.Open opens="edit">
            <button
              disabled={isPending}
              onClick={() => setShowForm((show) => !show)}
            >
              <HiPencil />
            </button>
          </Modal.Open>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Open opens="delete">
            <button>
             
              <HiTrash />
            </button>
          </Modal.Open>
          <Modal.Window name="delete">
            <ConfirmDelete resourceName="cabins" disabled={isPending} onConfirm={()=>mutateAsync(id)}/>
          </Modal.Window>
        </Modal>
      </div>
    </TableRow>
  );
}
