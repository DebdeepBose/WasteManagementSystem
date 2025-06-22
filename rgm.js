const form = document.getElementById("itemForm");
const input = document.getElementById("itemInput");
const pendingList = document.getElementById("pendingList");
const recycleList = document.getElementById("recycleList");
const reuseList = document.getElementById("reuseList");
const disposeList = document.getElementById("disposeList");
const aiBox = document.getElementById("aiSuggestionBox");
const aiMsg = document.getElementById("aiMessage");
const confirmBtn = document.getElementById("confirmBtn");
const cancelBtn = document.getElementById("cancelBtn");

let selectedItemCard = null;

const suggestionLibrary = {
  "plastic": "Recycle",
  "plastic bottle": "Recycle",
  "glass bottle": "Recycle",
  "cardboard box": "Recycle",
  "tin can": "Recycle",
  "aluminum can": "Recycle",
  "newspaper": "Recycle",
  "paper": "Recycle",
  "milk carton": "Recycle",
  "juice box": "Recycle",
  "magazine": "Recycle",
  "metal lid": "Recycle",
  "glass container": "Recycle",
  "envelope": "Recycle",
  "junk mail": "Recycle",
  "brochure": "Recycle",
  "plastic container": "Recycle",
  "plastic jug": "Recycle",
  "plastic cup": "Recycle",
  "paper bag": "Recycle",
  "wrapping paper (non-metallic)": "Recycle",
  "aluminum foil (clean)": "Recycle",
  "poster board": "Recycle",
  "shoebox": "Recycle",
  "cereal box": "Recycle",
  "egg carton (paper)": "Recycle",
  "hardcover book": "Recycle",
  "toilet paper roll": "Recycle",
  "soda can": "Recycle",
  "paperboard packaging": "Recycle",
  "glass cup (non-broken)": "Recycle",
  "glass jar": "Reuse",
  "plastic container": "Reuse",
  "shopping bag": "Reuse",
  "mason jar": "Reuse",
  "tote bag": "Reuse",
  "old t-shirt": "Reuse",
  "shoebox": "Reuse",
  "coffee tin": "Reuse",
  "fabric scraps": "Reuse",
  "toothbrush (for cleaning)": "Reuse",
  "plastic bag": "Reuse",
  "gift bag": "Reuse",
  "ice cream tub": "Reuse",
  "empty candle jar": "Reuse",
  "tin can (as pen holder)": "Reuse",
  "old socks (as rags)": "Reuse",
  "glass bowl": "Reuse",
  "cardboard roll": "Reuse",
  "old towel": "Reuse",
  "old mug": "Reuse",
  "old jar lids (for crafts)": "Reuse",
  "glass bottle (as vase)": "Reuse",
  "plastic spoon (for gardening)": "Reuse",
  "old calendar": "Reuse",
  "gift box": "Reuse",
  "egg carton (for seedlings)": "Reuse",
  "cloth bag": "Reuse",
  "worn out jeans": "Reuse",
  "plastic tub": "Reuse",
  "old notebook": "Reuse",
  "banana peel": "Dispose",
  "used tissue": "Dispose",
  "diaper": "Dispose",
  "styrofoam": "Dispose",
  "broken mirror": "Dispose",
  "used battery": "Dispose",
  "ceramics": "Dispose",
  "greasy pizza box": "Dispose",
  "toothpaste tube": "Dispose",
  "light bulb": "Dispose",
  "broken glass": "Dispose",
  "dirty aluminum foil": "Dispose",
  "chewing gum": "Dispose",
  "used cotton balls": "Dispose",
  "dust cloth": "Dispose",
  "chip bag": "Dispose",
  "candy wrapper": "Dispose",
  "plastic straw": "Dispose",
  "disposable razor": "Dispose",
  "face mask": "Dispose",
  "napkin (used)": "Dispose",
  "vacuum bag": "Dispose",
  "plastic fork": "Dispose",
  "used makeup wipes": "Dispose",
  "foam plate": "Dispose",
  "broken ceramic plate": "Dispose",
  "plastic packaging": "Dispose",
  "coffee filter": "Dispose",
  "tea bag": "Dispose",
  "expired medication": "Dispose"
};


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const item = input.value.trim();
  if (item === "") return;

  createPendingItem(item);
  input.value = "";
});

function createPendingItem(itemName) {
  const itemCard = document.createElement("div");
  itemCard.className = "item-card";
  itemCard.innerHTML = `
    <p>${itemName}</p>
    <div class="btn-group">
      <button class="recycle-btn">Recycle</button>
      <button class="reuse-btn">Reuse</button>
      <button class="dispose-btn">Dispose</button>
    </div>
  `;

  const recycleBtn = itemCard.querySelector(".recycle-btn");
  const reuseBtn = itemCard.querySelector(".reuse-btn");
  const disposeBtn = itemCard.querySelector(".dispose-btn");

  [recycleBtn, reuseBtn, disposeBtn].forEach((btn) => {
    btn.addEventListener("click", () => {
      selectedItemCard = { name: itemName, element: itemCard, list: null };

      if (btn.classList.contains("recycle-btn"))
        selectedItemCard.list = recycleList;
      if (btn.classList.contains("reuse-btn"))
        selectedItemCard.list = reuseList;
      if (btn.classList.contains("dispose-btn"))
        selectedItemCard.list = disposeList;

      showSuggestion(itemName);
    });
  });

  pendingList.appendChild(itemCard);
}

function moveToCategory(name, list) {
  const li = document.createElement("li");
  li.classList.add("category-item");
  li.innerHTML = `
    <span>${name}</span>
    <button class="delete-btn" title="Remove">✖</button>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    li.remove();
  });

  list.appendChild(li);
}

function showSuggestion(itemName) {
  aiBox.classList.remove("hidden");
  aiMsg.textContent = "Checking suggestion...";

  const suggestion = getLocalSuggestion(itemName);
  aiMsg.textContent = suggestion
    ? `Suggested action: "${suggestion}"`
    : `No suggestion found. Choose manually.`;

  confirmBtn.disabled = false;
}

function getLocalSuggestion(item) {
  return suggestionLibrary[item.toLowerCase()];
}

confirmBtn.addEventListener("click", () => {
  if (selectedItemCard) {
    moveToCategory(selectedItemCard.name, selectedItemCard.list);
    selectedItemCard.element.remove();
    selectedItemCard = null;
  }
  aiBox.classList.add("hidden");
});

cancelBtn.addEventListener("click", () => {
  aiBox.classList.add("hidden");
  selectedItemCard = null;
});
