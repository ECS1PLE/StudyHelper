"use client";

import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";

interface InputProps {
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  label?: string;
  isPassword?: boolean;
  defaultValue?: string;
  className?: string;
  type?: "text" | "email" | "password";
  showError?: boolean;
}

export interface InputHandle {
  validate: () => boolean;
  getValue: () => string;
}

const Input = forwardRef<InputHandle, InputProps>(
  (
    {
      icon,
      label,
      isPassword = false,
      defaultValue = "",
      type = "text",
      className,
      showError = false,
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);
    const [value, setValue] = useState(defaultValue);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current && inputRef.current.value) {
        setValue(inputRef.current.value);
      }
    }, []);

    const validate = (): boolean => {
      if (!value.trim()) {
        setError("Поле не должно быть пустым");
        return false;
      }

      if (type === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          setError("Введите корректный email");
          setValue("");
          return false;
        }
      }

      setError("");
      return true;
    };

    useImperativeHandle(ref, () => ({
      validate,
      getValue: () => value,
    }));

    return (
      <div className={`relative w-[321px] ${className}`}>

        <div
          className={`relative flex items-center w-full h-[52px] border border-gray rounded-2xl bg-transparent 
          `}
        >
          {(icon || label) && (
            <div
              className={`absolute flex items-center gap-[6px] left-[14px] transition-all duration-300 pointer-events-none
                ${
                  focused || value
                    ? "top-[-10px] scale-90 text-neutral-500"
                    : "top-[15px] text-neutral-500"
                }`}
            >
              {icon &&
                React.cloneElement(icon, {
                  className:
                    "stroke-current w-[18px] h-[18px] transition-all duration-300",
                })}
              {label && (
                <span className="font-[Geologica] text-sm transition-all duration-300">
                  {label}
                </span>
              )}
            </div>
          )}

          <input
            ref={inputRef}
            className="peer w-full h-full pl-[20px] pr-[12px] bg-transparent outline-none 
              text-sm font-normal font-[Geologica] text-neutral-200 autofill:shadow-[inset_0_0_0px_1000px_none]
              autofill:caret-neutral-200 autofill:text-neutral-200"
            type={isPassword ? "password" : type}
            defaultValue={defaultValue}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;