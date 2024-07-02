const inputs = document.querySelectorAll(".date-input");

inputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.type = "date";
  });

  input.addEventListener("blur", function () {
    if (this.value === "") {
      this.type = "text";
    }
  });
});

// scripts.js
document.addEventListener("DOMContentLoaded", function () {
  const kanbanColumns = document.querySelectorAll(".kanban-column");

  kanbanColumns.forEach((column) => {
    new Sortable(column, {
      group: "kanban",
      animation: 150,
      handle: ".kanban-task",
      draggable: ".kanban-task",
      onEnd: function (evt) {
        const item = evt.item;
        const from = evt.from;
        const to = evt.to;

        console.log(
          `Moved "${item.textContent.trim()}" from ${from.id} to ${to.id}`
        );
      },
    });
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const addButtonElements = document.querySelectorAll(".add-button");
  const kanbanTaskElements = document.querySelectorAll(".kanban-task");
  const overlay = document.getElementById("overlay");
  const closeButton = document.getElementById("closeButton");
  const cancelButton = document.getElementById("cancelButton");
  const contactEmails = document.querySelectorAll("contact-email");

  addButtonElements.forEach((button) => {
    button.addEventListener("click", function () {
      overlay.style.display = "flex";
    });
  });
  kanbanTaskElements.forEach((button) => {
    button.addEventListener("click", function () {
      overlay.style.display = "flex";
    });
  });
  closeButton.addEventListener("click", function () {
    overlay.style.display = "none";
  });

  cancelButton.addEventListener("click", function () {
    overlay.style.display = "none";
  });

  overlay.addEventListener("click", function (event) {
    if (event.target === overlay) {
      overlay.style.display = "none";
    }
  });
});
document.addEventListener("DOMContentLoaded", function () {
  const kanbanBoard = document.querySelector(".kanban-board");
  let isDraggingBoard = false;
  let isDraggingCard = false;
  let startX;
  let scrollLeft;

  kanbanBoard.addEventListener("mousedown", function (e) {
    if (e.target.classList.contains("kanban-task")) {
      isDraggingCard = true;
    } else {
      isDraggingBoard = true;
      startX = e.pageX - kanbanBoard.offsetLeft;
      scrollLeft = kanbanBoard.scrollLeft;
    }
  });

  kanbanBoard.addEventListener("mousemove", function (e) {
    if (isDraggingCard) return;
    if (!isDraggingBoard) return;

    e.preventDefault();
    const x = e.pageX - kanbanBoard.offsetLeft;
    const walk = (x - startX) * 3; // Adjust the scrolling speed here
    kanbanBoard.scrollLeft = scrollLeft - walk;
  });

  document.addEventListener("mouseup", function () {
    isDraggingBoard = false;
    isDraggingCard = false;
  });

  kanbanBoard.addEventListener("mouseleave", function () {
    isDraggingBoard = false;
    isDraggingCard = false;
  });
  const kanbanTasks = document.querySelectorAll(".kanban-task");

  kanbanTasks.forEach((task) => {
    task.addEventListener("mousedown", function (e) {
      e.stopPropagation();
    });
  });
});
