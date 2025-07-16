// Task 1: Remove Specific Node - Remove the second <li> from a <ul> list
function removeSecondListItem() {
    const list = document.getElementById('my-list');
    if (!list) {
        console.error('Element with id "my-list" not found');
        return;
    }
    const secondItem = list.children[1];
    if (secondItem) {
        list.removeChild(secondItem);
        console.log('Second item removed');
    }
}

// Task 2: Update All Children - Add ✓ prefix to all paragraphs in features div
function updateAllChildren() {
    const featuresDiv = document.getElementById('features');
    if (!featuresDiv) {
        console.error('Element with id "features" not found');
        return;
    }
    const paragraphs = featuresDiv.getElementsByTagName('p');
    
    for (let i = 0; i < paragraphs.length; i++) {
        if (!paragraphs[i].textContent.startsWith('✓ ')) {
            paragraphs[i].textContent = '✓ ' + paragraphs[i].textContent;
        }
    }
    console.log('Paragraphs updated');
}

// Task 3: Build a "Leaderboard" - Create ordered list from array
function buildLeaderboard() {
    const names = ["Grace", "Arpit", "Lokendra", "Satyam"];
    const container = document.getElementById('leaderboard-container') || document.body;
    
    const ol = document.createElement('ol');
    ol.id = 'leaderboard';
    
    names.forEach((name, index) => {
        const li = document.createElement('li');
        li.textContent = name;
        ol.appendChild(li);
    });
    
    container.appendChild(ol);
    console.log('Leaderboard created');
}

// Task 4: Add Items to a List Programmatically
function addItemsToList() {
    const shoppingList = document.getElementById('shopping-list');
    if (!shoppingList) {
        console.error('Element with id "shopping-list" not found');
        return;
    }
    const items = ['Item A', 'Item B', 'Item C'];
    
    items.forEach(itemText => {
        const li = document.createElement('li');
        li.textContent = itemText;
        shoppingList.appendChild(li);
    });
    console.log('Shopping list items added');
}

// Task 5: Replace a Paragraph
function replaceParagraph() {
    const oldParagraph = document.getElementById('old-paragraph');
    if (!oldParagraph) {
        console.error('Element with id "old-paragraph" not found');
        return;
    }
    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'This paragraph was replaced!';
    newParagraph.id = 'old-paragraph';
    
    oldParagraph.parentNode.replaceChild(newParagraph, oldParagraph);
    console.log('Paragraph replaced');
}

// Execute functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, running all tasks...');
    
    // Run all functions (uncommented)
    removeSecondListItem();
    updateAllChildren();
    buildLeaderboard();
    addItemsToList();
    replaceParagraph();
});