import React, { useState } from "react";
import styled from "styled-components";
import { DebounceInput } from "react-debounce-input";

const App = () => {
  const [data, setData] = useState();
  return (
    <div>
      <SearchBox
        placeholder="Search for movie"
        onChange={async ({ target: { value: query } }) => {
          setData(false);
          if (query) {
            const omdb = `/.netlify/functions/omdb?query=${query}`;
            const data = await (await fetch(omdb)).json();
            setData(data);
          }
        }}
      />
      {data && data.Poster !== "N/A" && <img alt="" src={data.Poster} />}
      {data && (
        <Table>
          {Object.entries(data).map(([key, val]) => (
            <tr>
              <td>{key}</td>
              <td>{JSON.stringify(val)}</td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
};
const SearchBox = styled(DebounceInput)`
  font-size: 2rem;
  padding: 0.5rem 1rem;
  display: block;
  margin-bottom: 1rem;
`;
const Table = styled.table`
  margin-left: 1rem;
  font-size: 0.8rem;
  opacity: 0.5;
  display: inline-block;
  vertical-align: top;
  td {
    max-width: 300px;
  }
`;
export default App;
