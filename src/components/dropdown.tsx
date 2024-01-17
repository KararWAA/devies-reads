import styled from "styled-components";

export type SortValue = "haveRead" | "currentlyReading" | "wantToRead" | "name";
type Props = {
  value: string;
  onChange: (value: string) => void;
  options: { text: string; value: string }[];
};
function Dropdown(props: Props) {
  return (
    <DropDownWrapper>
      <select value={props.value} onChange={(e) => props.onChange(e.target.value)}>
        {props.options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.text}
          </option>
        ))}
      </select>
    </DropDownWrapper>
  );
}

export default Dropdown;

const DropDownWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
