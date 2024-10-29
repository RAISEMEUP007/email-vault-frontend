import { library } from "@fortawesome/fontawesome-svg-core";
import { faEye, faEyeSlash, faSquare } from "@fortawesome/free-regular-svg-icons";
import { faSquareCheck, faCircleCheck, faCircleXmark, faInfoCircle, faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faEye);
library.add(faEyeSlash);
library.add(faSquareCheck);
library.add(faSquare);
library.add(faCircleCheck);
library.add(faCircleXmark);
library.add(faInfoCircle);
library.add(faCreditCard);

export { FontAwesomeIcon };