# Important Information

> IconExporter mod was used to extract rendered icon and images of gtceu, kubejs and start mod assets and their metadata pairs.
> There was more information inside the exported metadata file but only the file name without the .png prefix and the ingame local
> name is retained. The key of each entry's key-value pair is labeled as "0" and "1" was used to reduce file size
> 
> Format:
> "0": file name without the .png to reduce json file size
> "1": local name of said item/fluid ingame. ex: "Block of Titanium"

> emi_categories.json is exported by creating a custom mod with the help of Claude to export recipe categories that are formed after the client bakes the recipes

> atlas.json contains the file name to image coordinate pointer. You can use this information to bridge local name and atlas img coordinate using img_to_name_pairs.json and atlas.json