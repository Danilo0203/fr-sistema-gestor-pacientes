import { Icon } from "@iconify/react/dist/iconify.js";
import { Input, Select, SelectItem } from "@nextui-org/react";

export const Encabezado = (
  filterValue,
  onClear,
  onSearchChange,
  usuarios,
  onRowsPerPageChange,
) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex w-full flex-col gap-3">
          <Input
            label="Buscar por nombre de usuario"
            isClearable
            classNames={{
              base: "w-full sm:max-w-[44%]",
              inputWrapper: "border-1",
            }}
            placeholder="usuario..."
            size="md"
            value={filterValue}
            variant="bordered"
            onClear={onClear}
            key="outside"
            labelPlacement="outside"
            onValueChange={onSearchChange}
            startContent={<Icon icon="mdi:account-search" width={20} />}
          />

          <span className="text-small">
            Total de usuarios {usuarios.length}
          </span>
        </div>

        <Select
          label="Filas por página"
          className="max-w-xs"
          onChange={onRowsPerPageChange}
        >
          <SelectItem key="5" value="5">
            5
          </SelectItem>
          <SelectItem key="10" value="10">
            10
          </SelectItem>
          <SelectItem key="15" value="15">
            15
          </SelectItem>
        </Select>
      </div>
    </div>
  );
};
