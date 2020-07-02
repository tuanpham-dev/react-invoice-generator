import React, { FC, useState } from 'react'

export interface SelectOption {
  value: string
  text: string
}

interface Props {
  className?: string
  options?: SelectOption[]
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  printMode?: boolean
}

const EditableSelect: FC<Props> = ({
  className,
  options,
  placeholder,
  value,
  onChange,
  printMode,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false)

  return (
    <>
      {printMode ? (
        <span className={'span ' + (className ? className : '')}>{value}</span>
      ) : (
        <>
          {isEditing ? (
            <select
              className={'select ' + (className ? className : '')}
              value={value}
              onChange={onChange ? (e) => onChange(e.target.value) : undefined}
              onBlur={() => setIsEditing(false)}
              autoFocus={true}
            >
              {options?.map((option) => (
                <option key={option.text} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          ) : (
            <input
              readOnly={true}
              type="text"
              className={'input ' + (className ? className : '')}
              value={value || ''}
              placeholder={placeholder || ''}
              onFocus={() => setIsEditing(true)}
            />
          )}
        </>
      )}
    </>
  )
}

export default EditableSelect
