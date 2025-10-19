// Plan how you could move the bird!!?

1. Creat div and button on html file. Ex.
<div id="item"></div>
<button id="up">Up</button>
<button id="down">Down</button>
2. Give it a CSS position
   #item {
   position: absolute;
   top: 100px;
   }
3. Logic setup by get the element in JavaScript (using document.getElementById).
4. Use a function connected to a click event.
   button.addEventListener("click", function() {
   // code that moves the item
   });
