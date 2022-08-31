import React, { FC } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface Props {
  className?: string
  value?: string
  selected?: Date
  onChange?: (date: Date | [Date, Date] | null) => void
  pdfMode?: boolean
}

const EditableCalendarInput: FC<Props> = ({ className, value, selected, onChange, pdfMode }) => {
  return (
    <DatePicker
      className={'input ' + (className ? className : '')}
      selected={selected}
      onChange={onChange ? (date) => onChange(date) : (date) => null}
      dateFormat="MMM dd, yyyy"
    />
  )
}

export default EditableCalendarInput
