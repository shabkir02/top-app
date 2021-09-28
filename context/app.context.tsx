import { createContext, PropsWithChildren, useState } from 'react';
import { IMenuItem } from '../interfaces/menu.interface';
import { TopLevelCategory } from '../interfaces/page.interface';

export interface IAppContext {
	menu: Array<IMenuItem>;
	firstCategory: TopLevelCategory;
	setMenu?: (newMenu: Array<IMenuItem>) => void;
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: TopLevelCategory.Courses });

export const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>): JSX.Element => {
	const [menuState, setMenuState] = useState<Array<IMenuItem>>(menu);
	const setMenu = (newMenu: Array<IMenuItem>) => {
		setMenuState(newMenu);
	};

	return <AppContext.Provider value={{ menu: menuState, firstCategory, setMenu }}>
		{children}
	</AppContext.Provider>;
};