import styled from 'styled-components';

const CancelButtonStyle = styled.input`
  font-size: 1rem;
  width: fit-content;
  height: 40px;
  line-height: 40px;
  text-align: center;
  background-color: rgb(220, 220, 220);
  border-radius: 5px;
  border: none;
  padding-left: 20px;
  padding-right: 20px;

  &:hover {
    background-color: rgba(220, 220, 220, 0.8);
    cursor: pointer;
  }

  &:disabled {
    background-color: rgba(220, 220, 220, 0.3);
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    font-size: 0.9rem;
    height: 36px;
    line-height: 36px;
    border-radius: 3px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export default function CancelButton({
  text,
  onClick,
  style,
}: {
  text: string;
  onClick: React.MouseEventHandler;
  style?: any;
}) {
  return <CancelButtonStyle type="button" value={text} onClick={onClick} style={style} />;
}
