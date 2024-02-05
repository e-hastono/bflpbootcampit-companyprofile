let todoList = [];

const setToLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todoList));
}

const deleteTodo = (dataKey) => {
  todoList = todoList.filter(todo => todo.id != dataKey);
  setToLocalStorage();

  document.getElementById(`todo-${dataKey}`).remove();
}

const handleCheckTodo = (checkbox, dataKey, todoDate, todoTime) => {
  const tagToChange = document.getElementById(`todo-name-${dataKey}`);
  const statusToChange = document.getElementById(`todo-status-${dataKey}`)

  if (checkbox.checked == true) {
    tagToChange.classList.add('text-decoration-line-through');
  } else {
    tagToChange.classList.remove('text-decoration-line-through');
  }

  statusToChange.innerHTML = getTodoStatus(checkbox.checked == true, todoDate, todoTime)
}

const getTodoStatus = (isComplete, todoDate, todoTime) => {
  let todoStatus = '<span class="badge bg-success">Completed<span>'

  if (!isComplete) {
    if (new Date() <= new Date(`${todoDate} ${todoTime}`)) {
      todoStatus = '<span class="badge bg-secondary">On Progress</span>'
    } else {
      todoStatus = '<span class="badge bg-danger">Overdue</span>'
    }
  }

  return todoStatus
}

(function ($) {

  "use strict";

  var searchPopup = function () {
    // open search box
    $('#header-nav').on('click', '.search-button', function (e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $('#header-nav').on('click', '.btn-close-search', function (e) {
      $('.search-popup').toggleClass('is-visible');
    });

    $(".search-popup-trigger").on("click", function (b) {
      b.preventDefault();
      $(".search-popup").addClass("is-visible"),
        setTimeout(function () {
          $(".search-popup").find("#search-popup").focus()
        }, 350)
    }),
      $(".search-popup").on("click", function (b) {
        ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function (b) {
        "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
  }

  var initProductQty = function () {

    $('.product-qty').each(function () {

      var $el_product = $(this);
      var quantity = 0;

      $el_product.find('.quantity-right-plus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        $el_product.find('#quantity').val(quantity + 1);
      });

      $el_product.find('.quantity-left-minus').click(function (e) {
        e.preventDefault();
        var quantity = parseInt($el_product.find('#quantity').val());
        if (quantity > 0) {
          $el_product.find('#quantity').val(quantity - 1);
        }
      });

    });

  }

  $(document).ready(function () {

    searchPopup();
    initProductQty();

    var swiper = new Swiper(".main-swiper", {
      autoplay: {
        delay: 3000
      },
      speed: 500,
      loop: true,
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
      },
    });

    var swiper = new Swiper(".service-swiper", {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        el: "#our-services .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
    });

    var swiper = new Swiper(".product-watch-swiper", {
      slidesPerView: 4,
      spaceBetween: 10,
      pagination: {
        el: "#smart-watches .swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        980: {
          slidesPerView: 4,
          spaceBetween: 20,
        }
      },
    });

    var swiper = new Swiper(".testimonial-swiper", {
      loop: true,
      navigation: {
        nextEl: ".swiper-arrow-next",
        prevEl: ".swiper-arrow-prev",
      },
    });

    const todoForm = document.getElementById("todoForm");

    const todoListGroup = document.getElementById("todo-list-group");

    const renderTodo = (todo) => {
      const li = document.createElement('li');
      li.setAttribute('id', `todo-${todo.id}`);
      li.setAttribute('class', 'list-group-item d-flex w-100 justify-content-between align-items-center');
      li.setAttribute('data-key', todo.id);

      // get status

      const todoStatus = getTodoStatus(todo.completed, todo.date, todo.time)

      li.innerHTML = `
        <input type="checkbox" class="form-check-input" ${todo.completed ? 'checked' : ''} onchange="handleCheckTodo(this, ${todo.id}, '${todo.date}', '${todo.time}')">
        <h4 id="todo-name-${todo.id}">${todo.name}<h4>
        <h5>Due: ${todo.date} ${todo.time}</h5>
        <h6 id="todo-status-${todo.id}">${todoStatus}</h6> 
        <button class="btn btn-danger" onclick="deleteTodo(${todo.id})">X</button>
      `;

      todoListGroup.append(li);
    }

    const getFromLocalStorage = () => {
      const localStorageTodoList = localStorage.getItem('todos');

      if (localStorageTodoList) todoList = JSON.parse(localStorageTodoList);

      todoList.forEach(todo => {
        renderTodo(todo);
      });
    }

    getFromLocalStorage();

    todoForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const newTodoName = event.target[0].value;
      const newTodoDate = event.target[1].value;
      const newTodoTime = event.target[2].value;

      const todoObj = {
        id: Date.now(),
        name: newTodoName,
        date: newTodoDate,
        time: newTodoTime,
        completed: false,
      };

      todoList.push(todoObj);

      localStorage.setItem('todos', JSON.stringify(todoList));

      renderTodo(todoObj)

      todoForm.reset()
    });

  }); // End of a document ready

})(jQuery);