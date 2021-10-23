import { CardName, Suit } from 'typedeck';

interface CardProps {
  cardName: CardName;
  suit: Suit;
  hidden?: never;
}

interface HiddenCardProps {
  cardName?: never;
  suit?: never;
  hidden: true;
}

const Card = ({ cardName, suit, hidden }: CardProps | HiddenCardProps) =>
  hidden ? (
    <img
      src="/cards/back.svg"
      alt="card"
      style={{
        height: '100%',
        boxShadow: '5px 5px 14px -7px #000000',
        borderRadius: '5px',
      }}
    />
  ) : (
    <img
      src={`/cards/${suit}/${cardName}.svg`}
      alt="card"
      style={{
        height: '100%',
        boxShadow: '5px 5px 14px -7px #000000',
        borderRadius: '5px',
      }}
    />
  );

export default Card;
