import { Overlay } from "./styles";
import ReactDOM from "react-dom";

export default function Loarder(){
  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}
