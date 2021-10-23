import { Dialog, Classes } from '@blueprintjs/core';

const Help = ({
  isOpen,
  onClose,
}: {
  isOpen?: boolean;
  onClose: () => void;
}) => (
  <Dialog title="Rules" isOpen={isOpen} onClose={onClose}>
    <div className={Classes.DIALOG_BODY}>
      <p>
        <strong>How to play Snakes</strong>
      </p>
      <p>The aim of the game is...</p>
      <p>Scoring</p>
      <p>
        Skate ipsum dolor sit amet, transfer concave half-cab stalefish. Christ
        air hand rail pressure flip crooked grind. Frigid air crail slide
        concave shinner. G-turn crailtap Steve Alba downhill shoveit. Shinner
        stoked Wes Humpston lien air hardware. Freestyle bigspin nose blunt
        g-turn. Camel back ollie hole snake g-turn. Masonite Donger hardware
        impossible chicken wing. Slimeballs rail nose-bump tuna-flip skate key.
        Stalefish baseplate kickturn Bones Brigade casper slide.
      </p>
      <p>
        Chicken wing feeble Saran Wrap aerial hanger rip grip kingpin. Coping
        casper finger flip mongo fakie out gnarly 360 Tower Skate Park. Method
        air casper pop shove-it slap maxwell concave steps ollie. Pivot locals
        finger flip Rob Dyrdek kidney flypaper chicken wing shinner. Quarter
        pipe 50-50 tail pivot dude soul skate bluntslide. Powerslide freestyle
        kickturn launch ramp rip grip locals Kevin Staab crail slide.
      </p>
    </div>
  </Dialog>
);

export default Help;
