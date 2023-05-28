import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faSpinner,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

import {
  faCircleCheck,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faChevronCircleLeft,
  faChevronCircleRight,
  faSquareFacebook,
  faCircleCheck,
  faCircleXmark,
  faSpinner,
  faChevronLeft
);

export { FontAwesomeIcon };
