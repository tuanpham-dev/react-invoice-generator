import React, { FC } from 'react'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  printMode?: boolean
}

const EditableInput: FC<Props> = ({ className, placeholder, value, onChange, printMode }) => {
  return (
    <>
      {printMode ? (
        <span className={'span ' + (className ? className : '')}>{value}</span>
      ) : (
        <input
          type="text"
          className={'input ' + (className ? className : '')}
          placeholder={placeholder || ''}
          value={value || ''}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        />
      )}
    </>
  )
}

export default EditableInput
