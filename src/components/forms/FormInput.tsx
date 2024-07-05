import { Input } from "antd";

interface FormInputProps {
  required?: boolean;
  placeHolder: string;
  name: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  error: string | undefined;
  touched?: boolean;
  textArea?: boolean;
}

export default function FormInput({
  required,
  placeHolder,
  name,
  type,
  onChange,
  value,
  error,
  touched,
  textArea,
}: FormInputProps): JSX.Element {
  const { TextArea } = Input;

  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm flex items-center text-gray-600">
        <p>{placeHolder}</p>
        <p className="text-red-500">{required && "*"}</p>
      </label>
      {textArea ? (
        <TextArea
          name={name}
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
          className={`${
            touched && error && "border-red-500 ring-red-500"
          } w-full h-[100px] resize-none rounded-md border px-4 py-2 `}
        />
      ) : (
        <Input
          name={name}
          type={type || "text"}
          onChange={onChange}
          value={value}
          placeholder={placeHolder}
          className={`${
            touched && error && "border-red-500 ring-red-500"
          } w-full rounded-md border px-4 py-2 `}
        />
      )}
      {touched && error && (
        <span className="mt-1 text-xs text-red-500">{error}</span>
      )}
    </div>
  );
}
