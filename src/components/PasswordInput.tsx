import React, { useState } from "react";

import "@/assets/styles/style-components/PasswordInput.scss";
import "@/assets/styles/style-components/Modal.scss";

import EyeIconOpen from "@/assets/images/icon-eye-open.svg";
import EyeIconClosed from "@/assets/images/icon-eye-closed.svg";

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  id,
  label,
  placeholder = "",
  value,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="modal__block-input">
      <label htmlFor={id} className="modal__label">
        {label}
      </label>
      <div className="password__block">
        <input
          type={showPassword ? "text" : "password"}
          id={id}
          className="modal__input"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="current-password"
        />
        {!showPassword ? (
          <EyeIconOpen
            className="password__block-toggle"
            onClick={togglePasswordVisibility}
          />
        ) : (
          <EyeIconClosed
            className="password__block-toggle"
            onClick={togglePasswordVisibility}
          />
        )}
      </div>
    </div>
  );
};

export default PasswordInput;
