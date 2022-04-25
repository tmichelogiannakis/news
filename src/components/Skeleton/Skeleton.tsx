import styled, { DefaultTheme, keyframes, ThemeProps } from 'styled-components';

const skeletonKeyframes = (
  theme: ThemeProps<DefaultTheme>['theme']
) => keyframes`
  0% {
    background:${theme.colors.gray[100]};
  }
  100% {
    background: ${theme.colors.gray[400]};  
  }
`;

type SkeletonProps = {
  height?: string;
  width?: string;
  margin?: string;
};

const Skeleton = styled.div<SkeletonProps>`
  height: ${props => props.height || '1rem'};
  width: ${props => props.width || '100%'};
  margin: ${props => props.margin || 0};
  animation: 1s linear 0s infinite alternate none running
    ${props => skeletonKeyframes(props.theme)};
  border-radius: ${props => props.theme.radii.base};
`;

export default Skeleton;
