
import { useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";
import { DefaultHomeView } from "./leftside_viewmanager/DefaultHomeView";
import { MaterialSuggester } from "./leftside_viewmanager/MaterialSuggester";
import { ClientViewTypes } from "../enums/ClientViewTypes";

/**
 * Handles Display
 * @returns 
 */
export function LeftSideViewManager() {
    const { currentViewType } = useClientViewHandlerContext();

    switch (currentViewType) {
        case ClientViewTypes.Default:
            return <DefaultHomeView />
        case ClientViewTypes.MaterialSuggester:
            return <MaterialSuggester />
        case ClientViewTypes.UsedMachinesList:
            return <div/>

    }
}