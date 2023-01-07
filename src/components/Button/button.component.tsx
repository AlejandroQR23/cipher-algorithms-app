import './button.styles.scss';

interface ButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: ButtonProps) => {
  return (
    <button className="button" type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
