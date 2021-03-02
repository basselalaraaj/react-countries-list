import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { Country as CountryI } from '../../models/country';

interface Props {
  country: CountryI;
}

const StyledCountry = styled.span`
  cursor: pointer;
`;

export const Country = ({ country }: Props): JSX.Element | null => {
  const [expand, setExpand] = useState(false);

  const toggleExpand = () => setExpand(!expand);

  return (
    <>
      <td onClick={toggleExpand}>
        <StyledCountry>{country.name}</StyledCountry>
        {expand && (
          <>
            <div>Capital: {country.capital}</div>
            <div>Languages: {country.languages.map(({ name }) => name).join(', ')}</div>
            <div>Currencies: {country.currencies.map(({ name }) => name).join(', ')}</div>
          </>
        )}
      </td>
      <td>{country.alpha2Code}</td>
      <td>{country.population}</td>
    </>
  );
};
