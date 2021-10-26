import { Colors } from '@blueprintjs/core';
import { RowCard, TARGET_ROW } from '../lib/Snakes';
import Card from './Card';

interface CardsProps {
  cards: RowCard[][];
  onCardClicked: (row: number, column: number) => void;
  targetRow: TARGET_ROW;
}

const Cards = ({ cards, onCardClicked, targetRow }: CardsProps) => (
  <>
    {cards.map((row, rowIndex) => (
      <div key={rowIndex} style={{ position: 'relative' }}>
        <span
          style={{
            position: 'absolute',
            top: 'calc(50% - 14px)',
            left: '-86px',
            fontSize: 22,
            color: targetRow === rowIndex ? Colors.GOLD5 : 'wheat',
            fontWeight: targetRow === rowIndex ? 'bold' : undefined,
          }}
        >
          Row {rowIndex + 1}
        </span>
        {row.map(([card, flipped], columnIndex) => (
          <Card
            key={columnIndex}
            cardName={card.cardName}
            suit={card.suit}
            onClick={() => onCardClicked(rowIndex, columnIndex)}
            hidden={!flipped}
          />
        ))}
        <span
          style={{
            position: 'absolute',
            top: 'calc(50% - 14px)',
            right: '-86px',
            fontSize: 22,
            color: targetRow === rowIndex ? Colors.GOLD5 : 'wheat',
            fontWeight: targetRow === rowIndex ? 'bold' : undefined,
          }}
        >
          Row {rowIndex + 1}
        </span>
      </div>
    ))}
  </>
);

export default Cards;
