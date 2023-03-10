import { Container } from 'components/Container';
import { FilterInput, FilterLabel } from './Filter.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

export const Filter = ({ value, onChange, icon: Icon = null }) => {
  const idForFilter = nanoid();

  return (
    <Container
      as="div"
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <FilterLabel htmlFor={idForFilter}>{<Icon size={16} />} Find contacts by name</FilterLabel>
      <FilterInput
        type="text"
        value={value}
        onChange={onChange}
        id={idForFilter}
      />
    </Container>
  );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};