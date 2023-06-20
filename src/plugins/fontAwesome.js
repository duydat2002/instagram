import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faChevronCircleLeft,
  faChevronCircleRight,
  faSpinner,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faEllipsis,
  faXmark,
  faArrowLeft,
  faPlus,
  faHeart,
  faComment,
} from "@fortawesome/free-solid-svg-icons";

import { faSquareFacebook } from "@fortawesome/free-brands-svg-icons";

import {
  faCircleCheck,
  faCircleXmark,
  faHeart as farHeart,
  faComment as farComment,
  faBookmark,
} from "@fortawesome/free-regular-svg-icons";

library.add(
  faChevronCircleLeft,
  faChevronCircleRight,
  faSquareFacebook,
  faCircleCheck,
  faCircleXmark,
  faSpinner,
  faChevronLeft,
  faChevronRight,
  faChevronDown,
  faChevronUp,
  faEllipsis,
  faXmark,
  faArrowLeft,
  faPlus,
  faHeart,
  farHeart,
  faComment,
  farComment,
  faBookmark
);

export { FontAwesomeIcon };
