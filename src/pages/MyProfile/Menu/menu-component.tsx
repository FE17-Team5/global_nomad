import type { ProfileMenuDataListType } from "./profile-menu-data";

const MenuComponent = ({
  id,
  Icon,
  title,
  selectedIndex,
  onClick,
}: ProfileMenuDataListType & {
  selectedIndex: number;
  onClick: (id: number) => void;
}) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`flex px-5 py-3 items-center gap-2 rounded-2xl ty-16_M cursor-pointer hover:bg-primary-100 ${
        selectedIndex === id ? "text-gray-950 bg-primary-100" : "text-gray-600"
      } tracking-tighter tablet:rounded-[14px] mobile:text-gray-600 mobile:bg-white`}
    >
      <Icon
        className={`w-6 h-6  ${
          selectedIndex === id ? "text-primary-500" : "text-gray-600"
        } mobile:text-gray-600`}
      />
      {title}
    </div>
  );
};

export default MenuComponent;
