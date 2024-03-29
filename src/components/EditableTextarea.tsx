import { FC } from 'react'
import TextareaAutosize from 'react-textarea-autosize'
import { Text } from '@react-pdf/renderer'
import compose from '../styles/compose'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  pdfMode?: boolean
  rows?: number
}

const EditableTextarea: FC<Props> = ({
  className,
  placeholder,
  value,
  onChange,
  pdfMode,
  rows,
}) => {
  return (
    <>
      {pdfMode ? (
        <Text style={compose('span ' + (className ? className : ''))}>{value}</Text>
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
