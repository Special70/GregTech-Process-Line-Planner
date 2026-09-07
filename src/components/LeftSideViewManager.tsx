import { useState } from "react";
import { ClientViewTypes, useClientViewHandlerContext } from "../contexts/ClientViewHandlerContext";
import { MaterialSuggesterDataProvider } from "../contexts/MaterialSuggesterDataContext";
import { DefaultHomeView } from "./leftside_viewmanager/DefaultHomeView";
import { MaterialSuggester } from "./leftside_viewmanager/MaterialSuggester";

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

    }
}