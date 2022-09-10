import { Controller } from "react-hook-form";
import { TextField } from "@mui/material";
import { HTMLInputTypeAttribute } from "react";

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  multiline?: boolean;
  type?: HTMLInputTypeAttribute;
}

export const FormInputText = ({
  name,
  control,
  label,
  multiline,
  type,
}: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        type={type}
        helperText={error ? error.message : null}
        error={!!error}
        onChange={onChange}
        value={value}
        fullWidth
        label={label}
        variant="outlined"
        multiline={multiline}
      />
    )}
  />
);
