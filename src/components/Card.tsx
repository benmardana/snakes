import { CardName, Suit } from 'typedeck';

interface CardProps {
  cardName?: CardName;
  suit?: Suit;
  hidden?: boolean;
  onClick?: () => void;
  outlined?: boolean;
}

const Card = ({ cardName, suit, hidden, onClick, outlined }: CardProps) =>
  hidden ? (
    <button
      type="button"
      onClick={() => onClick?.()}
      style={{
        background: 'none',
        color: 'inherit',
        border: outlined ? '2px dashed yellow' : 'none',
        borderRadius: outlined ? '5%' : undefined,
        font: 'inherit',
        cursor: outlined ? 'auto' : 'pointer',
        outline: 'inherit',
        boxSizing: 'content-box',
      }}
    >
      <span style={{ visibility: outlined ? 'hidden' : 'visible' }}>
        <img
          src="/cards/back.svg"
          alt="card"
          style={{
            boxShadow: outlined ? undefined : '5px 5px 14px -7px #000000',
            borderRadius: '5%',
            boxSizing: 'content-box',
          }}
        />
      </span>
    </button>
  ) : (
    <img
      src={`/cards/${suit}/${cardName}.svg`}
      alt="card"
      style={{
        border: outlined ? '2px dashed yellow' : 'none',
        boxShadow: outlined ? undefined : '5px 5px 14px -7px #000000',
        borderRadius: '5%',
        boxSizing: 'content-box',
      }}
    />
  );

export default Card;
