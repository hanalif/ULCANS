import { SubMenuCategory } from "./sub-menu-category.model";

export interface MenuCategory{
  id: string,
  mainTitle: string,
  mainRouterLink: string,
  iconName: string,
  subCategories: SubMenuCategory[]
}
