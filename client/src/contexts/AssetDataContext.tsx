/**
 * Handles access towards image atlas of Star Technology modpack items exported from IconExporter and the jsons that contains
 * the file name, image atlas coordinates and ingame name of the items/fluids.
 */

import { createContext, useContext, useEffect, useState } from 'react';

type AtlasEntry = { sheet: number; x: number; y: number };
type AtlasManifest = Record<string, AtlasEntry>;
type NamePair = { "0": string; "1": string };

interface AssetDataContextProps {
    atlasData: AtlasManifest | null;
    emiCategoriesData: string[] | null;
    imageToNamePairsData: NamePair[] | null;
}

const AssetDataContext = createContext<AssetDataContextProps | undefined>(undefined);


export const AssetDataContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [atlasData, setAtlasData] = useState<AtlasManifest | null>(null);
    const [emiCategoriesData, setEMICategoriesData] = useState<string[] | null>(null);
    const [imageToNamePairsData, setImageToNamePairsData] = useState<NamePair[] | null>(null);

    useEffect(()=>{
        fetch(`${import.meta.env.BASE_URL}assets/data/atlas.json`).then(res => res.json()).then(data => setAtlasData(data));
        fetch(`${import.meta.env.BASE_URL}assets/data/emi_categories.json`).then(res => res.json()).then(data => setEMICategoriesData(data));
        fetch(`${import.meta.env.BASE_URL}assets/data/img_to_name_pairs.json`).then(res => res.json()).then(data => setImageToNamePairsData(data));
    }, [])

    return (
        <AssetDataContext.Provider
            value={{ atlasData, emiCategoriesData, imageToNamePairsData}}>
            {children}
        </AssetDataContext.Provider>
    )
}

export function useAssetDataContext() {
    const context = useContext(AssetDataContext);
    if (!context) {
        throw new Error("useAssetDataContext must be used within a AssetDataContextProvider");
    }
    return context;
}
