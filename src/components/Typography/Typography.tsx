import classes from './Typography.module.scss';

interface TypographyProps {
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'disclaimer';
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  alignment?: 'left' | 'center' | 'right';
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  content: string;
}

const Typography: React.FC<TypographyProps> = (
  {
    content,
    variant = 'p',
    component = 'p',
    weight = 'regular',
    alignment = 'left'
  }) => {
  const Tag = component;
  return (
    <Tag className={classes.typography} data-weight={weight} data-variant={variant}
         data-alignment={alignment}>{content}</Tag>
  );
};
export default Typography;