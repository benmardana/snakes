import { RowCard } from '../lib/Snakes';
import Card from './Card';

interface CardsProps {
  cards: RowCard[][];
  onCardClicked: (row: number, column: number) => void;
}

const Cards = ({ cards, onCardClicked }: CardsProps) => (
  <>
    {cards.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map(([card, flipped], columnIndex) => (
          <Card
            key={columnIndex}
            cardName={card.cardName}
            suit={card.suit}
            onClick={() => onCardClicked(rowIndex, columnIndex)}
            hidden={!flipped}
          />
        ))}
      </div>
    ))}
  </>
);

export default Cards;
