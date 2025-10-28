import { HiPencil, HiSquare2Stack, HiTrash } from 'react-icons/hi2';

import type { Cabin } from './types';
import CreateCabinForm from './CreateCabinForm';

import Modal from '@/ui/Modal';
import Table from '@/ui/Table';
import Menus from '@/ui/Menus';
import ConfirmDelete from '@/ui/ConfirmDelete';
import { formatCurrency } from '@/utils/helpers';

import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';

type CabinRowProps = {
  cabin: Cabin;
};
export default function CabinRow({ cabin }: CabinRowProps) {
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;

  const { isDeleting, deleteCabinMutation } = useDeleteCabin();
  const { createCabinMutation } = useCreateCabin();

  function handleDuplicateCabin() {
    createCabinMutation({
      name: `${name} (Copy)`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    });
  }

  return (
    <Table.Row>
      <img src={image} alt={name} className="w-16 object-cover object-center" />
      <div className="font-sono text-base font-semibold text-gray-600">
        {name}
      </div>
      <div className="">Fits up to {maxCapacity} guests</div>
      <div className="font-sono font-semibold">
        {formatCurrency(regularPrice)}
      </div>
      {discount ? (
        <div className="font-sono font-medium text-green-700">
          {formatCurrency(discount)}
        </div>
      ) : (
        <span>&mdash;</span>
      )}

      <div className="flex items-center gap-2">
        <Modal>
          <Menus.List id={`cabin-menu-${id}`}>
            <Menus.Button
              icon={<HiSquare2Stack />}
              onClick={handleDuplicateCabin}
            >
              Duplicate
            </Menus.Button>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              disabled={isDeleting}
              onConfirm={() => deleteCabinMutation(id)}
            />
          </Modal.Window>
        </Modal>

        <Menus.Toggle id={`cabin-menu-${id}`} />
      </div>
    </Table.Row>
  );
}
