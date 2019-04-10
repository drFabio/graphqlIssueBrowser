import { IssueStatus } from '../types';

import styled, { StyledComponent } from 'styled-components';
import {
  space,
  color,
  fontSize,
  borders,
  width,
  WidthProps,
  SpaceProps,
  FontSizeProps,
  BorderProps,
  ColorProps,
} from 'styled-system';
import { Link as BaseLink } from 'react-router-dom';
export { GlobalStyle } from './GlobalStyle';

export const theme = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [0, '0.5rem', '1rem', '1.5rem', '3rem', '5rem'],
  colors: {
    text: '#717173',
    white: '#fff',
    primary: '#E30613',
    secondary: '#009FE3',
    highlight: '#FFFF00',
    error: '#ff0000',
    black: '#000',
    default: 'inherit',
    [IssueStatus.Closed]: '#cb2431',
    [IssueStatus.Open]: '#2cbe4e',
  },
  borderWidths: [1, 2, '0.5em', '1em', '1.5em'],
};
type SpaceColorProps = SpaceProps & ColorProps;
type BoxProps = WidthProps & FontSizeProps & SpaceColorProps;

export const Box = styled.div<BoxProps>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`;
/*
is not assignable to type 'IntrinsicAttributes &
Pick<Pick<Pick<
DetailedHTMLProps<
InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
*/
export const Input = styled.input<BoxProps>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
`;
Input.defaultProps = {
  fontSize: 2,
  p: 1,
};
export const BaseButton: StyledComponent<any, any> = styled.button<BoxProps>`
  ${space}
  ${width}
  ${fontSize}
  ${color}
  &:disabled {
    cursor: not-allowed;
  }
  & + ${() => BaseButton} {
    margin-left: ${({ theme: { space } }) => space[2]};
  }
`;

export const Button = styled(BaseButton)<BorderProps>`
  ${borders}
  &:hover:enabled {
    color: ${({ theme: { colors } }) => colors.white};
    background-color: ${({ theme: { colors } }) => colors.secondary};
  }
  &:disabled {
    color: ${({ theme: { colors } }) => colors.muted};
    border-color: ${({ theme: { colors } }) => colors.muted};
  }
`;
Button.defaultProps = {
  borderWidth: 1,
  pl: 1,
  pr: 1,
  color: 'white',
  borderStyle: 'solid',
  borderColor: 'primary',
  bg: 'primary',
};
export const Menu = styled.nav``;

export const MainContainer = styled.main<ColorProps & FontSizeProps>`
  ${color}
  ${fontSize}
  font-family: verdana, sans-serif;
  line-height: 1.5;
  height: 100%;
  width: 100%
  display: grid;
  grid-template-areas:
    "header header header "
    "left main right"
    "footer footer footer";
  grid-template-rows: auto 1fr 5vh;
  grid-template-columns: 1fr 8fr 1fr;
`;
MainContainer.defaultProps = {
  fontSize: 3,
  bg: 'white',
};

export const InnerContainer = styled.div<SpaceColorProps>`
  ${space}
  ${color}
    grid-area: main;
`;
InnerContainer.defaultProps = {
  pt: 3,
  pb: 3,
  pl: 5,
  pr: 5,
  color: 'text',
};

const getHilightProps = (props: { theme: any; highlighted: boolean }) => {
  if (props.highlighted) {
    return `
      font-weight: bold;
      background-color: ${props.theme.colors.highlight};
      color: ${props.theme.colors.black};
    `;
  }
  return '';
};
export const Hilightable = styled.span`
  ${getHilightProps}
`;
type TextProps = SpaceColorProps & FontSizeProps;

export const Header = styled.header<SpaceColorProps>`
  ${space}
  ${color}
    grid-area: header;
`;
Header.defaultProps = {
  pt: 1,
  pb: 1,
  pl: 4,
  pr: 4,
  bg: 'secondary',
  color: 'white',
};

export const Text = styled.span<TextProps>`
  ${space}
  ${fontSize}
  ${color}
`;
export const TextLine = styled.p<TextProps>`
  ${space}
  ${fontSize}
  ${color}
`;

export const TextHeader = styled.h3<TextProps>`
${space}
${fontSize}
${color}
`;
TextHeader.defaultProps = {
  fontSize: 4,
  mt: 3,
  pt: 2,
  pb: 2,
  mb: 3,
  color: 'primary',
};

export const Link = styled(BaseLink)<ColorProps & FontSizeProps>`
  ${color}
  ${fontSize}
  text-decoration: underline;
  & + & {
    margin-left: ${({ theme: { space } }) => space[1]};
  }
`;
Link.defaultProps = { color: 'default' };

export const Pre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const IssueItemContainer = styled(Box)`
  width: 100%;
  height: auto;
  overflow: hidden;
`;

export const StausBadge = styled(Text)`
  font-weight: bold;
`;

StausBadge.defaultProps = {
  color: 'white',
  p: 1,
};
