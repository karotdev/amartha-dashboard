interface RoleOptionProps {
  checked: boolean;
  label: string;
  description: string;
  dataTestId?: string;
}

const RoleOption = ({
  checked,
  label,
  description,
  dataTestId,
}: RoleOptionProps) => {
  return (
    <div data-testid={dataTestId}>
      <input type="radio" checked={checked} />
      {label}
      {description}
    </div>
  );
};

export default RoleOption;
