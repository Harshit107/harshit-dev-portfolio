import 'styled-components';
import type { ThemeColors } from '../theme/theme';

declare module 'styled-components' {
  export interface DefaultTheme extends ThemeColors {}
}
