import styled from 'styled-components';

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
export const Span = styled.span`
  font-size: 20px;
  font-weight: 500;

  color: #3a7999;
  margin-bottom: 10px;
`;
export const Form = styled.form`
  margin-bottom: 20px;
`;
export const Input = styled.input`
  margin-bottom: 10px;
  width: 97%;
  height: 30px;
  font-size: 20px;

  ::placeholder {
    font-size: 14px;
    font-style: italic;
  }
`;
export const Button = styled.button`
  display: block;
  width: 150px;
  height: 40px;

  border: none;
  background: #3a7999;
  color: #f2f2f2;
  padding: 10px 20px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 500ms ease;

  :hover {
    background: rgba(0, 0, 0, 0);
    color: #3a7999;
    box-shadow: inset 0 0 0 3px #3a7999;
    transform: scale(1.05);
  }
`;
