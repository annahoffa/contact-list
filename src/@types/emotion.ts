import '@emotion/react'

import { Theme as ITheme } from '@mui/material'

declare module '@emotion/react' {
  export interface Theme extends ITheme {}
}
