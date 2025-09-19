import avatar from "../../assets/avatar.png";
import "./SideBar.css";

export default function SideBar() {
  return (
    <div className="sidebar">
      <img src={avatar} alt="Avatar Image" className="sidebar__avatar" />
      <p className="sidebar__username">Firstname Lastname</p>
    </div>
  );
}
