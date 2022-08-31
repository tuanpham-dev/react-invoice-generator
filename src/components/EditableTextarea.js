import React from 'react'
import TextareaAutosize from 'react-textarea-autosize'

const EditableTextarea = ({
  className,
  placeholder='',
  value='',
  onChange,
  pdfMode,
  rows=1,
}) => {
  return (
    <TextareaAutosize
      minRows={rows || 1}
      className={'input ' + (className ? className : '')}
      placeholder={placeholder || ''}
      value={value || ''}
      onChange={onChange ? (e) => onChange(e.target.value) : undefined}
    />
  )
}

export default EditableTextarea
