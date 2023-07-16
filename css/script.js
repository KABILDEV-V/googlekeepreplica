
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const add1=document.getElementById('add');

const fetchTodos = async () => {
  try {
    const response = await fetch('/api/todos');
    if (response.ok) {
      const todos = await response.json();
      renderTodos(todos);
    } else {
      console.error('Error fetching todos:', response.status);
    }
  } catch (error) {
    console.error('Error fetching todos:', error);
  }
};


const searchTodos = async (searchTerm) => {
  try {
    const response = await fetch(`/api/todos?search=${encodeURIComponent(searchTerm)}`);
    const taggedElements=document.getElementsByTagName('li');
    if (response.ok) {
      const todos = await response.json();
      
      console.log(todos);
      for (let i = 0; i < todos.length; i++) {
  if (todos[i].title.includes(searchTerm)) {
    console.log(todos[i]);
  }
  else
  {
    taggedElements[5+i].style.display = 'none';
  
  }
}
      
    } else {
      console.error('Error searching todos:', response.status);
    }
  } catch (error) {
    console.error('Error searching todos:', error);
  }
};


searchButton.addEventListener('click', () => {
  const searchTerm = searchInput.value.trim();
  searchTodos(searchTerm);
});


    const todoForm = document.getElementById('todoForm');
    const titleInput1=document.getElementById('titleInput1');
const titleInput = document.getElementById('titleInput');
const todoList = document.getElementById('todoList');
titleInput1.addEventListener('click',()=>
{
  document.getElementById('note1').style.display="inline";
  document.getElementById('note1').style.height="90px";
})

const deleteTodo = (id) => {
  fetch(`/api/todos/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      const listItem = document.getElementById(id);
      if (listItem) {
        listItem.remove();
      }
    })
    .catch((error) => {
      console.error('Error deleting ToDo:', error);
    });
};

const updateTodo = (id, title) => {
  const todo = { title };

  fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())
    .then((data) => {
      const listItem = document.getElementById(data.id);
      if (listItem) {
        const words = data.title;
        console.log(words);
      const word1=words.split("\n");
      var str="";
      for(let j=1;j<word1.length;j++)
      {
        str+=word1[j];
        str+='\n';
      }
        listItem.childNodes[1].textContent = str;
      }
    })
    .catch((error) => {
      console.error('Error updating ToDo:', error);
    });
};


const createTodo = (title) => {
  const todo = { title };

  fetch('/api/todos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  })
    .then((response) => response.json())

    .catch((error) => {
      console.error('Error creating ToDo:', error);
    });
};


fetch('/api/todos')
  .then((response) => response.json())
  .then((data) => {
    var idlist=[]
    data.forEach((todo) => {
      const li = document.createElement('li');
      li.id="item"+String(todo.class);
      const h1=document.createElement('h1');
      const text=document.createElement('textarea');
      const words = todo.title;
      const word1=words.split("\n");
      
      h1.textContent=word1[0];
      let str="";
      for(let j=1;j<word1.length;j++)
      {
        str+=word1[j];
        str+='\n';
      }
      text.value=str;
      
      
      const form=document.createElement('form')
      form.action="/upload1";
      form.method="post";
      form.enctype="multipart/form-data";
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name='image';
        fileInput.accept="image/*";
        const la=document.createElement('label');
        la.textContent="id";

        const fileInput1 = document.createElement('input');
        fileInput1.type = 'text';
        console.log(todo.id);
        fileInput1.value=todo.id;
        fileInput1.name="id";

       
        const sub=document.createElement('button');
        sub.type='submit';
        sub.textContent="submit";
        form.appendChild(fileInput);
        form.appendChild(la);
        form.appendChild(fileInput1);
        form.appendChild(sub);
        
        const img= document.createElement('img');

        img.src="";
        img.alt=" ";
      const updateButton = document.createElement('button');
      updateButton.textContent = '';
      const itag=document.createElement('i');
      itag.className="fa-solid fa-pen-to-square fa-bounce";
      updateButton.appendChild(itag);
      updateButton.addEventListener('click', () => {
        var textarea1 = document.getElementsByTagName("textarea");
        var i= idlist.indexOf(todo.id);
        console.log(i)
        updatedTitle=word1[0]+'\n'+textarea1[i+1].value;
      console.log(updatedTitle);
        if (updatedTitle) {
          updateTodo(todo.id, updatedTitle);
        }
      });

      const deleteButton = document.createElement('button');

      deleteButton.textContent = '';
      const itag1=document.createElement('i');
      itag1.className="fa-solid fa-trash fa-bounce";
      deleteButton.appendChild(itag1);
      deleteButton.addEventListener('click', () => {
        deleteTodo(todo.id);
      });
      li.appendChild(h1);

      li.appendChild(text);
      li.appendChild(updateButton);
      li.appendChild(deleteButton);
      li.append(form);
      li.append(img);
      li.id = todo.id;
      todoList.appendChild(li);
      loadImage(todo.id,todo.class);
      idlist.push(todo.id);
    });
  })
  .catch((error) => {
    console.error('Error fetching ToDo items:', error);
  });


add1.addEventListener('click', () => {
  
  const title =titleInput1.value+'\n'+titleInput.value;
  createTodo(title);
});

 
      var listItems = document.querySelectorAll('li');
  
      listItems.forEach(function(item) {
        item.addEventListener('dragstart', dragStart);
        item.addEventListener('dragend', dragEnd);
      });
  
      document.addEventListener('dragover', dragOver);
      document.addEventListener('dragenter', dragEnter);
      document.addEventListener('dragleave', dragLeave);
      document.addEventListener('drop', dragDrop);
  
      function dragStart(event) {
        event.dataTransfer.setData('text/plain', event.target.id);
        event.currentTarget.style.opacity = '0.4';
      }
  
      function dragEnd(event) {
        event.currentTarget.style.opacity = '1';
      }
  
      function dragOver(event) {
        event.preventDefault();
      }
  
      function dragEnter(event) {
        event.preventDefault();
        if (event.target.tagName('li')) {
          event.target.style.backgroundColor = 'lightblue';
        }
      }
  
      function dragLeave(event) {
        event.preventDefault();
        if (event.target.tagName('list-item')) {
          event.target.style.backgroundColor = 'white';
        }
      }
  
      function dragDrop(event) {
        event.preventDefault();
        var data = event.dataTransfer.getData('text/plain');
        var element = document.getElementById(data);
        event.target.appendChild(element);
        event.target.style.backgroundColor = 'lightgray';
      }
      function loadImage(id,class1) {
      var imageElement = document.getElementsByTagName('img');
      var imageUrl = `/image/${id}`; 

      fetch(imageUrl)
        .then(response => {
          if (response.ok) {
            return response.blob();
          } else {
            throw new Error('Image not found.');
          }
        })
        .then(blob => {
          console.log(class1);
          imageElement[class1].src = URL.createObjectURL(blob);
        })
        .catch(error => {
          console.log("hi");
          console.error(error);
        });
    }

    

