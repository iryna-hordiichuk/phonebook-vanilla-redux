import {useSelector, useDispatch} from 'react-redux';
import { Container } from 'components/Container';
import { FilterInput, FilterLabel } from './Filter.styled';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import { selectFilter } from '../../redux/selectors';
import {setFilter} from "../../redux/actions";

export const Filter = ({icon: Icon = null }) => {
  const idForFilter = nanoid();
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

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
        value={filter}
        onChange={e => dispatch(setFilter(e.target.value))}
        id={idForFilter}
      />
    </Container>
  );
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};