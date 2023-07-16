
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const add=document.getElementById('add');



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

// Function to search todos by title
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

// Event listener for search button click
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
// Function to update 
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
     let str="";
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

// Function to create a 
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
     .then((data) => {
      const idlist=[]
    data.forEach((todo1) => {
      idlist.push(todo1.id);
    });
    const todo=data[data.length-1];
      console.log("hi");
      const li = document.createElement('li');
      li.id="item";
      const h1=document.createElement('h1');
      const text=document.createElement('textarea');

      const words = todo.title;
      console.log(words);
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
      form.action="/upload";
      form.method="post";
      form.className="form1";
      form.enctype="multipart/form-data";
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name='image';
        fileInput.accept="image/*";


        const fileInput1 = document.createElement('input');
        fileInput1.type = 'text';
        fileInput1.style.display="none";
        console.log(todo.id);
        fileInput1.value=todo.id;
        fileInput1.name="id";

        // body: JSON.stringify({ id: 123 })
        const sub=document.createElement('button');
        sub.type='submit';
        sub.textContent="submit";
        form.appendChild(fileInput);
     
        form.appendChild(fileInput1);
        form.appendChild(sub);
       
        const img= document.createElement('img');
        img.src="";
        img.alt="Uploaded Image";
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Update';
      updateButton.addEventListener('click', () => {
        const textarea1 = document.getElementsByTagName("textarea");
        const i= idlist.indexOf(todo.id);
        console.log(textarea1[i+1].value)
        const updatedTitle=word1[0]+'\n'+textarea1[i].value;
      
        if (updatedTitle) {
          updateTodo(todo.id, updatedTitle);
        }
      });

      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
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
      todoList.appendChild(li);
      titleInput.value = '';
      titleInput1.value=''
    })
    .catch((error) => {
      console.error('Error creating ToDo:', error);
    });
};


fetch('/api/todos')
  .then((response) => response.json())
  .then((data) => {
    const idlist=[]
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
      form.action="/upload";
      form.method="post";
      form.enctype="multipart/form-data";
      const labelfile=document.createElement('label');
      labelfile.setAttribute('for', 'file1');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.name='image';
        fileInput.id="file1";
        const itag2=document.createElement('i');
      itag2.className="fa-regular fa-image";
      
        fileInput.accept="image/*";
        labelfile.appendChild(itag2);

        const fileInput1 = document.createElement('input');
        fileInput1.type = 'text';
        fileInput1.style.display="none";
        console.log(todo.id);
        fileInput1.value=todo.id;
        fileInput1.name="id";
        // body: JSON.stringify({ id: 123 })
        const sub=document.createElement('button');
        sub.type='submit';
        const itag3=document.createElement('i');
      itag3.className="fa-solid fa-cloud-arrow-up";
        sub.textContent="";
        sub.appendChild(itag3);
        form.appendChild(labelfile);
        form.appendChild(fileInput);
     
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
        const textarea1 = document.getElementsByTagName("textarea");
        const i= idlist.indexOf(todo.id);
        console.log(i)
       const updatedTitle=word1[0]+'\n'+textarea1[i+1].value;
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


add.addEventListener('click', () => {
  
  const title =titleInput1.value+'\n'+titleInput.value;
  createTodo(title);
});

 
      const listItems = document.querySelectorAll('li');
  
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
        const data = event.dataTransfer.getData('text/plain');
        const element = document.getElementById(data);
        event.target.appendChild(element);
        event.target.style.backgroundColor = 'lightgray';
      }
      function loadImage(id,class1) {
      const imageElement = document.getElementsByTagName('img');
      const imageUrl = `/image/${id}`; // URL to retrieve the image, modify if needed

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

    

