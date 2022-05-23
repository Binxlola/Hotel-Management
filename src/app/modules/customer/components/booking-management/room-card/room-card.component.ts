import {Component, Input, OnInit, Renderer2} from '@angular/core';
import {Required} from "../../../../../decorators/required-input.decorator";
import {Room} from "../../../../../shared/interfaces";

export interface MatCardSections {
  wrapper: HTMLElement | undefined,
  header: HTMLElement | undefined,
  image: HTMLElement | undefined,
  content: HTMLElement | undefined,
  actions: HTMLElement | undefined,
}
export interface AnimationElements {
  flipCardInner: HTMLElement | undefined,
  flipCardFront: MatCardSections | undefined,
  flipCardBack: MatCardSections | undefined,
}

@Component({
  selector: 'room-card',
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {

  @Input() @Required
  room!: Room;
  @Input() @Required
  bookingFunction!: ((room: Room) => void);

  constructor(private _renderer: Renderer2) { }

  ngOnInit(): void {
  }

  /**
   * Used to build a MatCardsSection for a room booking card
   * @param card The card to be used in the structure build
   * @param isFront A boolean denoting if the card provided is the front card
   * @private
   */
  private getCardStructure(card: HTMLElement, isFront: boolean): MatCardSections {
    const cardChildren = card.children;
    return {
      wrapper: card,
      header: <HTMLElement>cardChildren[0],
      image: isFront ? <HTMLElement>cardChildren[1] : undefined,
      content: <HTMLElement>cardChildren[isFront ? 2 : 1],
      actions: <HTMLElement>cardChildren[isFront ? 3 : 2],
    };
  }

  /**
   * Handles the animations for room booking card, handles both the flip and the flip back
   * @param cardStructure The MatCardSections of the card being flipped (front or back)
   * @param opacity The opacity level to be set on the elements
   * @param maxHeight The max-height value to be set on the card wrapper
   * @private This should only be called from within a component as this is where animation logic is defined
   */
  private animateCard(cardStructure: MatCardSections, opacity: number, maxHeight: string): void {
    for(let key in cardStructure) {

      switch (key) {
        case "wrapper":
          this._renderer.setStyle(cardStructure[key], "max-height", maxHeight);
          this._renderer.setStyle(cardStructure[key], "opacity", opacity);
          break;
        case "header":
        case "image":
        case "content":
        case "actions":
          if(cardStructure[key] !== undefined) {
            this._renderer.setStyle(cardStructure[key], "opacity", opacity);
          }
          break;
      }
    }
  }

  /**
   * The wrapper method for handling a room booking card flip, will determine if a flip is allowed.
   * Calling the appropriate structure build method, and animate method.
   * @param e The event which should be a MouseEvent
   * @param isFlipToBack A boolean denoting if the flip is flipping to back card
   */
  public flipCard(e: MouseEvent, isFlipToBack: boolean) {
    const elements: EventTarget[] = e.composedPath();
    const animationElements: AnimationElements = {
      flipCardInner: <HTMLElement>elements.find((item: EventTarget) => (<HTMLElement>item).classList.contains("card-inner")),
      flipCardFront: undefined,
      flipCardBack: undefined,
    };
    const isFlipped: boolean = animationElements.flipCardInner!.classList.contains("flipped");

    // Only perform animations if card is not currently flipped
    if((!isFlipped && isFlipToBack) || (isFlipped && !isFlipToBack)) {

      if(isFlipToBack) {
        this._renderer.addClass(animationElements.flipCardInner, "flipped");
      } else {
        this._renderer.removeClass(animationElements.flipCardInner, "flipped");
      }

      // Set card structures structure
      const cardFront: HTMLElement = <HTMLElement>animationElements.flipCardInner!.children[0];
      const cardBack: HTMLElement = <HTMLElement>animationElements.flipCardInner!.children[1];
      animationElements.flipCardFront = this.getCardStructure(cardFront, true);
      animationElements.flipCardBack = this.getCardStructure(cardBack, false);

      // perform animations on font and back card
      this.animateCard(animationElements.flipCardFront, isFlipToBack ? 0 : 1, isFlipToBack ? "0px" : "100vh");
      this.animateCard(animationElements.flipCardBack, isFlipToBack ? 1 : 0, isFlipToBack ? "100vh" : "0px");
    }
  }

}
