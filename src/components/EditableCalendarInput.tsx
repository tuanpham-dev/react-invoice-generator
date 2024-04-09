import { FC } from 'react'
import { Text } from '@react-pdf/renderer'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import compose from '../styles/compose'

interface Props {
  className?: string
  value?: string
  selected?: Date
  onChange?: (date: Date | [Date, Date] | null) => void
  pdfMode?: boolean
}

const EditableCalendarInput: FC<Props> = ({ className, value, selected, onChange, pdfMode }) => {
  return (
    <>
      {pdfMode ? (
        <Text style={compose('span ' + (className ? className : ''))}>{value}</Text>
      ) : (
        <DatePicker
          className={'input ' + (className ? className : '')}
          selected={selected}
          onChange={onChange ? (date) => onChange(date) : () => null}
          dateFormat="MMM dd, yyyy"
        />
      )}
    </>
  )
}

export default EditableCalendarInput
