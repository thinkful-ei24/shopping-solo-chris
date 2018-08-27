'use strict';


const STORE = {
  items: [{name: 'apple', checked: false, hidden: false},
          {name: 'banana', checked: false, hidden: false}],
  filterSearch: " ",
  displayAll: true,
};
 

function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element" data-item-index="${itemIndex}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>

        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
        <form class="js-update-item">
   <label for="shopping-list-update"></label>
   <input type="text" name="shopping-list-update" class="js-shopping-update" placeholder="e.g., broccoli">
   <button type="button" class="js-update"> Update</button>
   </form>
      </div>
    </li>`;
}

function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}


function renderShoppingList() {
  // render the shopping list in the DOM
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE.items);

  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.items.unshift({name: itemName, checked: false});
}

function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE.items[itemIndex].checked = !STORE.items[itemIndex].checked;
}


function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}
function removeItemFromList(itemIndex) {
  STORE.items.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {
  $('.js-shopping-list').on('click', `.js-item-delete`, event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    removeItemFromList(itemIndex);
    renderShoppingList();
});


}

function filterByChecked(){
  if(!STORE.displayAll){
    $('.shopping-list').find('li').find('.shopping-item__checked').closest('li').fadeOut('fast');
  } else {
    $('.js-shopping-list').find('li').show();
  }
}

function handleFilterByChecked() {
  $('#filter').on('change', event => {
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    if($(this).prop('checked')){
      STORE.displayAll = true;
    } else {
      STORE.displayAll = false;
    }
    filterByChecked();
});
}

function filterBySearch() {
  const newSearch = $('.js-shopping-search').val();
  for(let i = 0; i < STORE.items.length; i++){
    if(STORE.items[i].name === newSearch){
      console.log('hello');
      
    } else { 
      console.log('no');
      
    }   
  } 
  renderShoppingList();
}


function handleFilterBySearch() {
  $(".js-search").on('click', event => {
    event.preventDefault();
    const newSearch = $('.js-shopping-search').val();
    filterBySearch();
    $('.js-shopping-search').val('');
  });

}

function generateEditField() {
  $('.js-shopping-list').on('click', `.js-update`, function(event) {
    event.preventDefault();
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    const newItemName = $(this).siblings('.js-shopping-update').val();
    
    STORE.items[itemIndex].name = newItemName;
    renderShoppingList();
 });
}

function HandleEditTitle() {
  $('.js-shopping-list').on('click', `.js-item-edit`, event => {
    
    renderShoppingList();
});
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  HandleEditTitle();
  generateEditField();
  handleFilterByChecked();
  handleFilterBySearch();
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);