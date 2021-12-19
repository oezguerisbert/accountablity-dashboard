import { Box, BoxProps, Input, MantineSize, Title } from "@mantine/core";
import { forwardRef, PropsWithoutRef } from "react";
import { useField, UseFieldConfig } from "react-final-form";

export interface LabeledTextFieldProps extends Omit<PropsWithoutRef<JSX.IntrinsicElements["input"]>, "size"> {
  name: string;
  label: string;
  type?: "text" | "password" | "email" | "number";
  outerProps?: BoxProps<"div">;
  labelProps?: BoxProps<"div">;
  fieldProps?: UseFieldConfig<string>;
  size?: MantineSize;
}

export const LabeledTextField = forwardRef<HTMLInputElement, LabeledTextFieldProps>(
  ({ name, label, outerProps, fieldProps, labelProps, size, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? (Number as any)
          : // Converting `""` to `null` ensures empty values will be set to null in the DB
            (v) => (v === "" ? null : v),
      ...fieldProps,
    });

    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError;

    return (
      <Box {...outerProps} sx={(theme) => ({ width: "max-content" })}>
        <Box {...labelProps}>
          <Title order={3}>{label}</Title>
          <Input sx={{ width: "max-content" }} size={size} {...input} disabled={submitting} {...props} ref={ref} />
        </Box>
        {touched && normalizedError && (
          <Box role="alert" style={{ color: "red" }}>
            {normalizedError}
          </Box>
        )}
      </Box>
    );
  }
);

export default LabeledTextField;
