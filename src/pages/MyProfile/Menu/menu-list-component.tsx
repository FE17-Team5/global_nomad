import MenuComponent from "./menu-component";
import { profileMenuDataList } from "./profile-menu-data";

const MenuListComponent = ({
  selectedIndex,
  onClick,
}: {
  selectedIndex: number;
  onClick: (id: number) => void;
}) => {
  return (
    <div className="flex flex-col gap-2 rounded-2xl">
      {profileMenuDataList.map((data) => (
        <MenuComponent
          key={data.id}
          {...data}
          selectedIndex={selectedIndex}
          onClick={onClick}
        />
      ))}
    </div>
  );
};

export default MenuListComponent;
