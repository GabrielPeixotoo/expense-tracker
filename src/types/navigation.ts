
import { BottomTabsParamList, RootStackParamList } from "./routes";
declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList, BottomTabsParamList { }
    }
}