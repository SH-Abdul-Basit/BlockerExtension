const root = document.getElementById("root");

const passwordBt = document.getElementById("password");

const startTimeInput = document.getElementById("startTime");

const endTimeInput = document.getElementById("endTime");

const saveScheduleBt = document.getElementById("saveSchedule");

const importSettingsButton = document.getElementById("importSettingsButton");

const jsonImportFile = document.getElementById("jsonImport");

saveScheduleBt.addEventListener("click", async () => {
    // Doing this way there is a path
    // in which the schdule is not set if the password is not varified
    if (await passwordExists()) {
        if (await passwordVarify()) {
            setSchedule();
        }
    } else {
        setSchedule();
    }
});


// let blockedWords = JSON.parse(localStorage.getItem("blockedWords"));

const removeBlockedWord = async (elt) => {
    elt.remove();
    let { blockedWords } = await browser.storage.local.get("blockedWords");
    
    blockedWords = blockedWords.filter(eltWord => {
        return eltWord.word !== elt.innerHTML;
    });
    // localStorage.setItem("blockedWords", JSON.stringify(blockedWords));
    browser.storage.local.set({ blockedWords });
};

// Set the current blocked words display in the setting div
const setWordDivs = async () => {
    const { blockedWords } = await browser.storage.local.get("blockedWords");

    for (let word of blockedWords) {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'chip';
        wordDiv.textContent = word.word;
        // wordDiv.setAttribute('title', 'Click to remove');
        // wordDiv.setAttribute('role', 'button');
        // wordDiv.tabIndex = 0;

        // Removes the word if the user enters a specific word
        const tryRemove = async () => {
            if (await passwordExists()) {
                if (await passwordVarify()) {
                     removeBlockedWord(wordDiv);
                }
            } else {
                removeBlockedWord(wordDiv);
            }
        };

        wordDiv.addEventListener('click', tryRemove);
        wordDiv.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                tryRemove();
            }
        });

        root.append(wordDiv);
    }
};


setWordDivs();

passwordBt.addEventListener("click", async () => {
    if (await passwordExists()) {
        if (await passwordVarify()) {
            const newPassword = prompt("Enter new password: ");
            if (newPassword && newPassword.length > 0) {
                browser.storage.local.set({ password: newPassword });
            }
        }
    } else {
        const newPassword = prompt("Enter password: ");
        if (newPassword && newPassword.length > 0) {
            browser.storage.local.set({ password: newPassword });
        }
    }
});

importSettingsButton.addEventListener("click", () => {
    console.log("Import JSON");
    jsonImportFile.click();
});

/*
Not currently (2026) supported in 
async function openFile() {
  try {
    // Opens the file picker and returns an array of file handles
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'Images',
        accept: { 'image/*': ['.png', '.jpg', '.jpeg'] }
      }],
      excludeAcceptAllOption: true,
      multiple: false
    });
    
    const file = await fileHandle.getFile();
    console.log('File selected:', file.name);
  } catch (err) {
    console.error('User cancelled or error occurred:', err);
  }
}

document.getElementById('pickerBtn').addEventListener('click', openFile);
*/

jsonImportFile.addEventListener('change', (e) => {
  const selectedFile = e.target.files[0];
  //console.log('Selected file:', selectedFile.result);
  const reader = new FileReader();

  console.log(reader);
  reader.onload = (e) => {
    try {
        const settingsData = JSON.parse(e.target.result); // Parse text into JS object
        // console.log(e.target.result);
        browser.storage.local.set(settingsData);
    } catch(err) {
        console.log(err);
    }
  };

  reader.readAsText(selectedFile);
});

const passwordVarify = async () => {
     const { password } = await browser.storage.local.get("password");
     const enterdPassword = prompt("Enter password: ");
     if (enterdPassword === password) {
        return true;
     } else {
        alert("Incorrect password!");
        return false;
     }
};

const passwordExists = async () => {
    const { password } = await browser.storage.local.get("password");
    // lenght > 0 means the user as not yet set the password
    return password && password.length > 0;
};

const setSchedule = () => {
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;
    browser.storage.local.set({ startTime, endTime });
};