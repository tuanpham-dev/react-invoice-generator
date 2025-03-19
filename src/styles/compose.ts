import ReactPDF from '@react-pdf/renderer'
import styles from './styles'

const compose = (classes: string): ReactPDF.Styles => {
  const css: ReactPDF.Styles = {
    //@ts-ignore
    '@import':
      'url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..90)',
  }

  const classesArray: string[] = classes.replace(/\s+/g, ' ').split(' ')

  classesArray.forEach((className) => {
    if (typeof styles[className] !== undefined) {
      Object.assign(css, styles[className])
    }
  })

  return css
}

export default compose
