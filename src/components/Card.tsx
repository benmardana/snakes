import { CardName, Suit } from 'typedeck';

interface CardProps {
  cardName: CardName;
  suit: Suit;
  hidden?: boolean;
  onClick?: () => void;
}

const Card = ({ cardName, suit, hidden, onClick }: CardProps) =>
  hidden ? (
    <button
      type="button"
      onClick={() => onClick?.()}
      style={{
        background: 'none',
        color: 'inherit',
        border: 'none',
        font: 'inherit',
        cursor: 'pointer',
        outline: 'inherit',
      }}
    >
      <span>
        <img
          src="/cards/back.svg"
          alt="card"
          style={{
            boxShadow: '5px 5px 14px -7px #000000',
            borderRadius: '0.1em',
          }}
        />
      </span>
    </button>
  ) : (
    <img
      src={`/cards/${suit}/${cardName}.svg`}
      alt="card"
      style={{
        boxShadow: '5px 5px 14px -7px #000000',
        borderRadius: '0.1em',
      }}
    />
  );

export default Card;
