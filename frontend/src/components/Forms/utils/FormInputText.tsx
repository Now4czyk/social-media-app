import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { TextField } from "@mui/material";

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export const FormInputText = ({ name, control, label }: FormInputProps) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { onChange, value }, fieldState: { error } }) => (
      <TextField
        helperText={error ? error.message : null}
        error={!!error}
        onChange={onChange}
        value={value}
        fullWidth
        label={label}
        variant="outlined"
      />
    )}
  />
);
