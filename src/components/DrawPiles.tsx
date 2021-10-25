import { PlayingCard } from 'typedeck';
import Card from './Card';

const DrawPiles = ({
  showCard,
  onClickPile,
}: {
  showCard?: PlayingCard;
  onClickPile?: () => void;
}) => (
  <div>
    <Card hidden onClick={onClickPile} outlined={!onClickPile} />
    <Card
      cardName={showCard?.cardName}
      suit={showCard?.suit}
      hidden={!showCard}
      outlined
    />
  </div>
);

export default DrawPiles;
