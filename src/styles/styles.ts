import { CSSClasses } from '../data/types'

const colorDark = '#222'
const colorDark2 = '#666'
const colorGray = '#e3e3e3'
const colorWhite = '#fff'
const colorThemeDark = '#6539C0'
const colorThemeLight = '#EFEBF9'

const styles: CSSClasses = {
  dark: {
    color: colorDark,
  },

  white: {
    color: colorWhite,
  },

  'bg-dark': {
    backgroundColor: colorDark2,
  },

  'bg-gray': {
    backgroundColor: colorGray,
  },

  'bg-theme-dark': {
    backgroundColor: colorThemeDark,
  },

  'bg-theme-light': {
    backgroundColor: colorThemeLight,
  },

  'theme-dark': {
    color: colorThemeDark,
  },

  'theme-light': {
    color: colorThemeLight,
  },

  'rad-sm': {
    borderRadius: '4px',
  },

  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },

  'w-auto': {
    flex: 1,
    paddingRight: '8px',
  },

  'ml-30': {
    flex: 1,
  },

  'w-100': {
    width: '100%',
  },

  'w-75': {
    width: '75%',
  },

  'w-70': {
    width: '70%',
  },

  'w-50': {
    width: '50%',
  },

  'w-55': {
    width: '55%',
  },

  'w-45': {
    width: '45%',
  },

  'w-60': {
    width: '60%',
  },

  'w-40': {
    width: '40%',
  },

  'w-48': {
    width: '48%',
  },

  'w-30': {
    width: '30%',
  },

  'w-25': {
    width: '25%',
  },

  'w-17': {
    width: '17%',
  },

  'w-18': {
    width: '18%',
  },

  'w-10': {
    width: '10%',
  },

  'w-5': {
    width: '5%',
  },

  'bd-t': {
    borderTop: `1px solid ${colorThemeLight}`,
  },

  row: {
    border: `1px solid ${colorThemeLight}`,
    borderTop: `0px`,
  },

  'mt-40': {
    marginTop: '40px',
  },

  'mt-30': {
    marginTop: '30px',
  },

  'mt-20': {
    marginTop: '20px',
  },

  'mt-10': {
    marginTop: '10px',
  },

  'mb-5': {
    marginBottom: '5px',
  },

  'p-4-8': {
    padding: '4px 8px',
  },

  'p-5': {
    padding: '5px',
  },

  'pl-5': {
    paddingLeft: '5px',
  },

  'p-10': {
    padding: '10px',
  },

  'pt-10': {
    paddingTop: '10px',
  },

  'pt-20': {
    paddingTop: '20px',
  },

  'pt-30': {
    paddingTop: '30px',
  },

  'pb-10': {
    paddingBottom: '10px',
  },

  'pb-20': {
    paddingBottom: '20px',
  },

  'pb-30': {
    paddingBottom: '30px',
  },

  right: {
    textAlign: 'right',
  },

  bold: {
    fontWeight: 'bold',
  },

  'fs-14': {
    fontSize: '14px',
  },

  'fs-16': {
    fontSize: '16px',
  },

  'fs-20': {
    fontSize: '20px',
  },

  'fs-45': {
    fontSize: '45px',
  },

  page: {
    fontFamily: 'Outfit',
    fontSize: '13px',
    color: '#555',
    padding: '40px 35px',
  },

  span: {
    padding: '4px 12px 4px 0',
  },

  logo: {
    display: 'block',
  }
}

export default styles
