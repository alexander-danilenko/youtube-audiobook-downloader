'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { TableCell, TextField, Box, Menu, MenuItem } from '@mui/material';
import { BookDto } from '../application/dto/book-dto';
import { CellPosition } from '../hooks/use-book-table';

interface EditableCellProps {
  value: string | number | undefined;
  rowIndex: number;
  columnKey: keyof BookDto;
  isSelected: boolean;
  isEditing: boolean;
  widthPercent?: number;
  onSelect: (rowIndex: number, columnKey: keyof BookDto, isMultiSelect: boolean) => void;
  onEdit: (position: CellPosition | null) => void;
  onUpdate: (rowIndex: number, columnKey: keyof BookDto, value: string | number | undefined) => void;
  onUpdateSelected: (value: string | number | undefined) => void;
  onMoveToNextCell: (rowIndex: number, columnKey: keyof BookDto, direction: 'tab' | 'enter' | 'shift-tab' | 'shift-enter') => CellPosition | null;
}

export function EditableCell({
  value,
  rowIndex,
  columnKey,
  isSelected,
  isEditing,
  widthPercent,
  onSelect,
  onEdit,
  onUpdate,
  onUpdateSelected,
  onMoveToNextCell,
}: EditableCellProps) {
  const [localValue, setLocalValue] = useState<string>(value?.toString() || '');
  const textFieldRef = useRef<HTMLInputElement>(null);
  const [contextMenu, setContextMenu] = useState<{
    mouseX: number;
    mouseY: number;
  } | null>(null);

  // Sync value prop to local state when it changes externally
  // This is necessary to update local state when value prop changes from parent
  useEffect(() => {
    const stringValue = value?.toString() || '';
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalValue(stringValue);
  }, [value]);

  useEffect(() => {
    if (isEditing && textFieldRef.current) {
      textFieldRef.current.focus();
      textFieldRef.current.select();
    }
  }, [isEditing]);

  const handleClick = (e: React.MouseEvent): void => {
    const isMultiSelect = e.ctrlKey || e.metaKey;
    onSelect(rowIndex, columnKey, isMultiSelect);
    if (!isMultiSelect) {
      onEdit({ rowIndex, columnKey });
    }
  };

  const handleDoubleClick = (): void => {
    onEdit({ rowIndex, columnKey });
  };

  const handleContextMenu = (e: React.MouseEvent): void => {
    // Only show context menu for text fields (not numbers or URL)
    if (columnKey === 'seriesNumber' || columnKey === 'year' || columnKey === 'url') {
      return;
    }
    e.preventDefault();
    setContextMenu(
      contextMenu === null
        ? {
            mouseX: e.clientX + 2,
            mouseY: e.clientY - 6,
          }
        : null,
    );
  };

  const handleCloseContextMenu = (): void => {
    setContextMenu(null);
  };

  const transformText = (transformType: 'uppercase' | 'lowercase' | 'titleCase' | 'sentenceCase'): void => {
    const currentValue = value?.toString() || '';
    let transformedValue: string;

    switch (transformType) {
      case 'uppercase':
        transformedValue = currentValue.toUpperCase();
        break;
      case 'lowercase':
        transformedValue = currentValue.toLowerCase();
        break;
      case 'titleCase':
        transformedValue = currentValue
          .toLowerCase()
          .split(' ')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');
        break;
      case 'sentenceCase':
        transformedValue = currentValue.charAt(0).toUpperCase() + currentValue.slice(1).toLowerCase();
        break;
    }

    if (isSelected) {
      // Apply to all selected cells
      onUpdateSelected(parseValue(transformedValue, columnKey));
    } else {
      // Apply to current cell only
      onUpdate(rowIndex, columnKey, parseValue(transformedValue, columnKey));
    }

    handleCloseContextMenu();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const nextCell = onMoveToNextCell(rowIndex, columnKey, 'enter');
      if (nextCell) {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(nextCell);
      } else {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(null);
      }
    } else if (e.key === 'Enter' && e.shiftKey) {
      e.preventDefault();
      const nextCell = onMoveToNextCell(rowIndex, columnKey, 'shift-enter');
      if (nextCell) {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(nextCell);
      } else {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(null);
      }
    } else if (e.key === 'Tab' && !e.shiftKey) {
      e.preventDefault();
      const nextCell = onMoveToNextCell(rowIndex, columnKey, 'tab');
      if (nextCell) {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(nextCell);
      } else {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(null);
      }
    } else if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      const nextCell = onMoveToNextCell(rowIndex, columnKey, 'shift-tab');
      if (nextCell) {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(nextCell);
      } else {
        onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
        onEdit(null);
      }
    } else if (e.key === 'Escape') {
      setLocalValue(value?.toString() || '');
      onEdit(null);
    }
  };

  const handleBlur = (): void => {
    onUpdate(rowIndex, columnKey, parseValue(localValue, columnKey));
    onEdit(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const newValue = e.target.value;
    setLocalValue(newValue);
    if (isSelected) {
      onUpdateSelected(parseValue(newValue, columnKey));
    }
  };

  const parseValue = (val: string, key: keyof BookDto): string | number | undefined => {
    if (key === 'seriesNumber') {
      const num = parseInt(val, 10);
      return isNaN(num) ? 1 : num;
    }
    if (key === 'year') {
      const num = parseInt(val, 10);
      return isNaN(num) ? undefined : num;
    }
    return val;
  };

  const displayValue = value?.toString() || '';

  return (
    <TableCell
      sx={{
        width: widthPercent ? `${widthPercent}%` : undefined,
        minWidth: '50px',
        maxWidth: widthPercent ? `${widthPercent}%` : undefined,
        cursor: 'pointer',
        overflow: 'hidden',
        bgcolor: isEditing ? 'background.paper' : isSelected ? 'action.selected' : 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
        '&:focus-within': {
          outline: isEditing ? '2px solid' : 'none',
          outlineColor: isEditing ? 'primary.main' : 'transparent',
        },
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onContextMenu={handleContextMenu}
    >
      {isEditing ? (
        <TextField
          inputRef={textFieldRef}
          type={columnKey === 'seriesNumber' || columnKey === 'year' ? 'number' : 'text'}
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          size="small"
          variant="standard"
          sx={{
            width: '100%',
            '& .MuiInputBase-root': {
              padding: '0 2px',
              minHeight: 'unset',
            },
            '& .MuiInputBase-input': {
              padding: '2px 0',
              fontSize: '0.875rem',
            },
          }}
        />
      ) : (
        <Box
          sx={{
            display: 'block',
            minHeight: '1.25rem',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
          title={displayValue}
        >
          {displayValue}
        </Box>
      )}
      <Menu
        open={contextMenu !== null}
        onClose={handleCloseContextMenu}
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined
        }
      >
        <MenuItem onClick={() => transformText('uppercase')}>UPPERCASE</MenuItem>
        <MenuItem onClick={() => transformText('lowercase')}>lowercase</MenuItem>
        <MenuItem onClick={() => transformText('sentenceCase')}>Sentence case</MenuItem>
        <MenuItem onClick={() => transformText('titleCase')}>Name Case</MenuItem>
      </Menu>
    </TableCell>
  );
}

