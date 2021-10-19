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
        maxHeight: '150px',
        marginLeft: '8px',
        marginRight: '8px',
        boxShadow: '5px 5px 5px black',
        borderRadius: '5px',
      }}
    />
  ) : (
    <img
      src={`/cards/${suit}/${cardName}.svg`}
      alt="card"
      style={{ maxHeight: '110px' }}
    />
  );

export default Card;
