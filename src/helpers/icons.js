import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faAt,
  faKey,
  faEdit,
  faTrash,
  faSpinner,
  faSignInAlt,
  faChalkboardTeacher,
  faCodeBranch,
  faComments,
  faAngleRight,
  faExclamationCircle,
  faSignOutAlt,
  faCaretSquareRight,
  faCalendarAlt,
  faPlusSquare,
  faFilter,
  faLocationArrow
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
  return library.add(
    faAt,
    faKey,
    faTrash,
    faEdit,
    faSpinner,
    faSignInAlt,
    faChalkboardTeacher,
    faCodeBranch,
    faComments,
    faAngleRight,
    faExclamationCircle,
    faSignOutAlt,
    faCaretSquareRight,
    faCalendarAlt,
    faPlusSquare,
    faFilter,
    faLocationArrow
  );
};

export default Icons;
