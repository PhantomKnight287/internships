import clsx from "clsx";
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  useId,
} from "react";

interface Props
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  labelProps?: DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  >;
  label?: string;
  error?: ReactNode;
}

export default function Input(props: Props) {
  const id = useId();
  return (
    <div className="flex flex-col w-full justify-start ">
      <label
        {...props.labelProps}
        htmlFor={id}
        className={clsx(
          "block text-sm font-medium leading-6 text-gray-900",
          props.labelProps?.className
        )}
      >
        {props.label}
      </label>
      <div className="mt-2">
        <input
          {...props}
          id={id}
          className={clsx(
            "block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
            props.className
          )}
        />
        <div className="mt-1">
          {props.error && <p className="text-xs text-red-600">{props.error}</p>}
        </div>
      </div>
    </div>
  );
}
