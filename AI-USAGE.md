# How I Used AI

Note: Will not link commit links involved because the usage is minimal and spotaneous, which made me forget and is a hassle to track them all down.

- Vibecoded:
    - A python script that utilizes the exported metadata and icon images of selected ingame items in the Star Technology modpack by turning the icons into webp atlas sheets for efficient utilization of 17,000+ 64x64 png icons along with generaeting a json file that links the icon's original file name with the name of the atlas sheet along with the sheet coordinates
    - Code that extracts the recipe type names in the client's loaded EMI recipes for a custom forge mod to use
    - Functions that the website would use
        - React Component that utilizes the json files to properly render the target icon from the atlas sheet
        - Function that would apply custom color styling based on the position of the custom symbol (�) to make the name display and the hover text name of the selected material not look stupid
    - Code for exporting the graph's data into text and back into a Record object for react flow to read and render
- Asked for second opinions on situations that made me narrow minded to help me realize I was doing a certain something wrong which saved me from potential wasted hours
- Attempted to try certain code architectures only for me to manually make it myself
- Attempted to ask for help on writing auto deploy for github actions
- Asked for help on how to make my edges appear above my nodes and it told me to set the z value of the nodes to `-1`
- Asked to why the buttons are sometimes unreliable and it turns out I need to give certain components the `nodrag` class name.


# Where the AI got it wrong

- Because the way I made my prompt in helping me create a material suggester, It created an architecture that I didn't want and ended up manually doing the rest of the real work myself.
- Claude kind of failed to write the correct way of making the github actions for web deployment so I utilized my old workflow file and adjusted the values


# Who wrote what

