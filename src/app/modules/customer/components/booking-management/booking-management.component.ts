import {Component, OnInit, Renderer2} from '@angular/core';
import {Autoplay, Pagination, Swiper, SwiperOptions} from "swiper";
import {MatDialog} from "@angular/material/dialog";
import {BookingFormComponent} from "./booking-form/booking-form.component";

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
  selector: 'customer-booking-management',
  templateUrl: './booking-management.component.html',
  styleUrls: ['./booking-management.component.css']
})
export class BookingManagementComponent implements OnInit {

 public swiperConfig: SwiperOptions = {
   cssMode: true,
   direction: "vertical",
   slidesPerView: 3,
   loop: true,
   loopFillGroupWithBlank: true,
   autoplay: {
     delay: 2500,
     disableOnInteraction: false,
     pauseOnMouseEnter: true,
   },
 }

  constructor(private renderer: Renderer2, private _bookingDialog: MatDialog) { }

  ngOnInit(): void {
    Swiper.use([Autoplay]);
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
          this.renderer.setStyle(cardStructure[key], "max-height", maxHeight);
          this.renderer.setStyle(cardStructure[key], "opacity", opacity);
          break;
        case "header":
        case "image":
        case "content":
        case "actions":
          if(cardStructure[key] !== undefined) {
            this.renderer.setStyle(cardStructure[key], "opacity", opacity);
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
     flipCardInner: <HTMLElement>elements.find((item: EventTarget) => (<HTMLElement>item).classList.contains("flip-card-inner")),
     flipCardFront: undefined,
     flipCardBack: undefined,
   };
   const isFlipped: boolean = animationElements.flipCardInner!.classList.contains("flipped");

   // Only perform animations if card is not currently flipped
   if((!isFlipped && isFlipToBack) || (isFlipped && !isFlipToBack)) {

     if(isFlipToBack) {
       this.renderer.addClass(animationElements.flipCardInner, "flipped");
     } else {
       this.renderer.removeClass(animationElements.flipCardInner, "flipped");
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

  public openBooking() {
    const dialogRef = this._bookingDialog.open(BookingFormComponent, {
      disableClose: true,
      hasBackdrop: true,
      data: {name: "test", animal: "test"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("result");
    });
  }
}
