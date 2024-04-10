// ================
// GLOBAL VARIABLES
// ================

// JSON Data Structure (more likely use case for a database of levels)
// TO-DO: Refactor into TypeScript interfaces
let levelsData = [
    { name: "Stereo Madness", creator: "RobTop", difficulty: "Easy", songID: 1, percent: 100 },
    { name: "Dry Out", creator: "RobTop", difficulty: "Hard", songID: 4, percent: 100 },
    { name: "Back On Track", creator: "RobTop", difficulty: "Normal", songID: 2, percent: 100 },
    { name: "Blast Processing", creator: "RobTop", difficulty: "Harder", songID: 4, percent: 75 },
    { name: "ISpyWithMyLittleEye", creator: "Voxicat", difficulty: "Easy Demon", songID: 7, percent: 30 },
    { name: "Dash", creator: "RobTop", difficulty: "Insane", songID: 5, percent: 50 },
    { name: "Clubstep", creator: "RobTop", difficulty: "Easy Demon", songID: 6, percent: 40 },
    { name: "Nine Circles", creator: "Zobros", difficulty: "Hard Demon", songID: 9, percent: 10 },
    { name: "Verity", creator: "Serponge", difficulty: "Medium Demon", songID: 8, percent: 20 },
    { name: "Bloodbath", creator: "Riot", difficulty: "Extreme Demon", songID: 11, percent: 1 },
    { name: "Supersonic", creator: "ZenthicAlpha", difficulty: "Insane Demon", songID: 10, percent: 5 }
];

const DIFFICULTY_ORDER = ["NA", "Auto", "Easy", "Normal", "Hard", "Harder", "Insane", "Easy Demon", "Medium Demon", "Hard Demon", "Insane Demon", "Extreme Demon"]

const DEFAULT_LEVEL = { name: "Unnamed 0", creator: "-", difficulty: "NA", songID: 1, percent: 0 };

let selectedIndex = -1; // for tracking which item the form is updating

const modalContainer = document.getElementById("modal-container");
modalContainer.onclick = (e) => {
    if (e.target == modalContainer) {
        closeModal();
        selectedIndex = -1;
    }
}

// =========
// FUNCTIONS
// =========

const displayModal = (inputLevel) => {
    // Open modal
    modalContainer.style.display = "block";
    // Set values of fields
    document.getElementById("name").value = inputLevel.name;
    document.getElementById("creator").value = inputLevel.creator;
    document.getElementById("difficulty").value = inputLevel.difficulty;
    document.getElementById("songID").value = inputLevel.songID;
    document.getElementById("percent").value = inputLevel.percent;
}

const closeModal = () => {
    modalContainer.style.display = "none";
    selectedIndex = -1;
}

const insertLevel = (targetIndex) => {
    let i;
    for (i = levelsData.length - 1; i >= targetIndex; i--) {
        // shift every item after target index one item right
        levelsData[i + 1] = levels[i];
    }
    // insert
    levelsData[targetIndex] = newLevel;
}

const createLevel = () => {
    levelsData = [...levelsData, DEFAULT_LEVEL];
}

const updateLevel = (newLevel, targetIndex) => {
    levelsData = levelsData.map((level, index) => {
        if (index == targetIndex) {
            return newLevel;
        } else {
            return level;
        }
    })
    selectedIndex = -1;
}

const deleteLevel = (targetIndex) => {
    // // JavaScript built-in:
    // levelsData = levelsData.filter((level, index) => index !== targetIndex);

    // classic for-loop approach: 
    // shift every element after target index one item left
    for (let i = targetIndex; i < levelsData.length; i++) {
        levelsData[i] = levelsData[i + 1];
    }
    levelsData.pop(); // throw out duplicated last item 
    displayLevels(levelsData);
}

const handleSubmit = (e) => {
    // TO-DO: Add data validation for all fields.
    const newLevel = {
        name: document.getElementById("name").value,
        creator: document.getElementById("creator").value,
        difficulty: document.getElementById("difficulty").value,
        songID: document.getElementById("songID").value,
        percent: document.getElementById("percent").value
    }
    updateLevel(newLevel, selectedIndex);
    closeModal(); // keep this here so selectedIndex resets AFTER updating
    displayLevels(levelsData);
}   

const createDetailsContainer = (inputLevel) => {
    const detailsDiv = document.createElement("div");
    detailsDiv.classList.add("details");

    // Create difficulty container
    const difficultyDiv = document.createElement("div");
    difficultyDiv.classList.add("details-difficulty");

    // Create image for difficulty container
    let difficultyFile = `./assets/${inputLevel.difficulty.toLowerCase().replace(" ", "-")}.png`;
    const difficultyImg = document.createElement("img");
    difficultyImg.setAttribute("src", difficultyFile);
    difficultyImg.setAttribute("alt", inputLevel.difficulty);
    difficultyImg.classList.add("details-difficulty-img");
    difficultyDiv.appendChild(difficultyImg);

    // Create text for difficulty container
    const difficultyText = document.createElement("p");
    difficultyText.innerHTML = inputLevel.difficulty;
    difficultyText.classList.add("details-difficulty-text");
    difficultyDiv.appendChild(difficultyText);

    // Append difficulty container to detailsDiv
    detailsDiv.appendChild(difficultyDiv);

    // Create level text container
    const levelTextDiv = document.createElement("div");
    levelTextDiv.classList.add("details-text");

    // Create name text for level text container
    const levelTextName = document.createElement("h3");
    levelTextName.innerHTML = inputLevel.name;
    levelTextName.classList.add("details-text-name");
    levelTextDiv.appendChild(levelTextName);

    // Create creator text for level text container
    const levelTextCreator = document.createElement("p");
    levelTextCreator.innerHTML = `By ${inputLevel.creator}`;
    levelTextCreator.classList.add("details-text-creator");
    levelTextDiv.appendChild(levelTextCreator);

    // Append level text to detailsDiv
    detailsDiv.appendChild(levelTextDiv);

    return detailsDiv;
}

const createPercentContainer = (inputLevel) => {
    const percentDiv = document.createElement("div");
    percentDiv.classList.add("percent-container");

    // Create progress bar for percent container
    const percentBar = document.createElement("div");
    percentBar.classList.add("percent-bar");
    percentBar.style.width = `${inputLevel.percent}%`;
    percentDiv.appendChild(percentBar);

    // Create percent value for percent container
    const percentValue = document.createElement("p");
    percentValue.classList.add("percent-value");
    percentValue.innerHTML = `${inputLevel.percent}%`;
    percentDiv.appendChild(percentValue);

    return percentDiv;
}

const createButtonsContainer = (inputLevel, index) => {
    const btnsDiv = document.createElement('div');
    btnsDiv.classList.add('level-btn-container');

    // Create update button
    const updateBtn = document.createElement('button');
    updateBtn.setAttribute('type', 'button');
    updateBtn.addEventListener("click", () => {
        selectedIndex = index;
        displayModal(inputLevel); // send current data to update form
    });
    updateBtn.classList.add('update-btn');
    updateBtn.innerHTML = 'Update';
    btnsDiv.appendChild(updateBtn);

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('type', 'button');
    deleteBtn.addEventListener("click", () => {
        deleteLevel(index);
    });
    deleteBtn.classList.add('delete-btn');
    deleteBtn.innerHTML = 'Delete';
    btnsDiv.appendChild(deleteBtn);

    return btnsDiv;
}

const createLevelContainer = (inputLevel, index) => {
    const levelDiv = document.createElement("div");
    levelDiv.classList.add("level-container");

    // Create details container
    const detailsDiv = createDetailsContainer(inputLevel);
    levelDiv.appendChild(detailsDiv);

    // Create percent container
    const percentDiv = createPercentContainer(inputLevel);
    levelDiv.appendChild(percentDiv);

    // Create buttons container
    const btnsDiv = createButtonsContainer(inputLevel, index);
    levelDiv.appendChild(btnsDiv);

    return levelDiv;
}

function displayLevels(inputData) {
    displayLevelsBySearch("", inputData);
}

function displayLevelsBySearch(searchKey, inputData) {
    const levelsList = document.getElementById("levels-list");
    levelsList.innerHTML = ''; // reset existing HTML to re-render w/ new data

    // Create level cards in between
    inputData.forEach((level, index) => {
        const keyFound = level.name.toLowerCase().includes(searchKey.toLowerCase());
        if (!searchKey || keyFound) {
            const levelDiv = createLevelContainer(level, index);
            levelsList.appendChild(levelDiv);
        }
    });
}

const handleSearch = (e) => {
    const searchKey = document.getElementById(`searchInput`).value;
    displayLevelsBySearch(searchKey, levelsData);
}

const handleAdd = () => {
    createLevel();
    displayLevels(levelsData);
}

const selectionSort = (inputArr) => {
    let sortedArr = [...inputArr] // create copy
    for (let i = 0; i < sortedArr.length - 1; i++) {
        let minIndex = i;
        let minDiff = DIFFICULTY_ORDER.indexOf(sortedArr[minIndex].difficulty);
        for (let j = i + 1; j < sortedArr.length; j++) {
            let jDiff = DIFFICULTY_ORDER.indexOf(sortedArr[j].difficulty)
            if (jDiff < minDiff) {
                minIndex = j; // find and save minimum
            }
        }
        if (minIndex !== i) {
            // swap min and current index
            [sortedArr[minIndex], sortedArr[i]] = [sortedArr[i], sortedArr[minIndex]];
        }
    }
    return sortedArr;
}

const handleSort = () => {
    const isChecked = document.getElementById("sortCheckbox").checked;
    if (isChecked) {
        displayLevels(selectionSort(levelsData));
    } else {
        displayLevels(levelsData);
    }
}

displayLevels(levelsData);

// prevent submission when updating level
document.getElementById("modal-form").addEventListener("submit", (event) => {
    event.preventDefault();
    handleSubmit();
});
