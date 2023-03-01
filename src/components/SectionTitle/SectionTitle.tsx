import Typography, { TypographyProps } from '../Typography/Typography';
import classes from './SectionTitle.module.scss';

interface SectionTitleProps extends TypographyProps {
  border?: 'light' | 'regular' | 'bold';
}

const SectionTitle: React.FC<SectionTitleProps> = ({ border = 'regular', variant = 'h3', alignment, ...rest }) => {
  return (
    <div className={classes.section_title} data-border={border} data-alignment={alignment}>
      <Typography alignment={alignment} variant={variant} {...rest} />
    </div>
  );
};
export default SectionTitle;