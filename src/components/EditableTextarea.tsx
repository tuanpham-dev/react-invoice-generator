import React, { FC } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  printMode?: boolean
  rows?: number
}

const EditableTextarea: FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
  printMode,
  rows,
}) => {
  return (
    <>
      {printMode ? (
        <span className={'span ' + (className ? className : '')}>{value}</span>
      ) : (
        <TextareaAutosize
          minRows={rows || 1}
          className={'input ' + (className ? className : '')}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </>
  )
}

export default EditableTextarea
