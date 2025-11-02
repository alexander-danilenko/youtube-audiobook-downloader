'use client';

import React, { useState, useCallback } from 'react';
import { TextField } from '@mui/material';

interface EditableCellProps {
  value: string | number | undefined;
  onChange: (value: string | number | undefined) => void;
  label?: string;
  type?: string;
}

export const EditableCell: React.FC<EditableCellProps> = ({ value, onChange, label, type = 'text' }) => {
  const [localValue, setLocalValue] = useState<string | number | undefined>(value);

  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value);
  }, []);

  const handleBlur = useCallback(() => {
    onChange(localValue);
  }, [localValue, onChange]);

  return (
    <TextField
      value={localValue || ''}
      onChange={handleChange}
      onBlur={handleBlur}
      label={label}
      type={type}
      variant="outlined"
      size="small"
      fullWidth
    />
  );
};
