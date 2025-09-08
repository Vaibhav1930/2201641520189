import React from 'react'
import { TextField, IconButton, InputAdornment, Tooltip } from '@mui/material'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'

export default function CopyField({ label, value }: { label: string; value: string }) {
  const copy = () => navigator.clipboard.writeText(value)
  return (
    <TextField label={label} value={value} fullWidth InputProps={{ readOnly: true, endAdornment: (
      <InputAdornment position="end">
        <Tooltip title="Copy">
          <IconButton onClick={copy} aria-label="copy"><ContentCopyIcon/></IconButton>
        </Tooltip>
      </InputAdornment>
    ) }} />
  )
}