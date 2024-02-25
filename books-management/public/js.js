function createbook1() {
    let form=document.getElementById("create_form");
    let create=document.createElement('button');
    create.innerText="create";
    form.appendChild(create);

    form.style.visibility="visible";
    create.onclick=function() {
        createbook();
    };

}

let close=document.getElementById("close");
close.onclick=function() {
    let form=document.getElementById("create_form");
    form.style.visibility="hidden";
};

function createbook(){

    var url = "http://localhost:3300/books";

    var data = {
        id: document.getElementById('id1').value,
        title: document.getElementById('title1').value,
        author: document.getElementById('author1').value,
        genre: document.getElementById('genre1').value,
        publication_year: document.getElementById('publication_year1').value
    }
    console.log(data);
    fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
        })
        .then(data => {
            getAllBooks();
            document.getElementById("create_form").reset();
            alert("Book created successfully");
        })
}

function edits(eid,s,p,q,r){
  let i=eid;
    let update=document.createElement('button');
    update.innerText="update";

    let form=document.getElementById("create_form");
    form.appendChild(update);

    form.style.visibility="visible";
    document.getElementById('id1').value=eid;
    document.getElementById('title1').value=s;
    document.getElementById('author1').value=p,
    document.getElementById('genre1').value=q,
    document.getElementById('publication_year1').value=r;
    update.onclick=function() {
        updatebook(i);
    };

}
    function updatebook(id){

    var data = {
        title: document.getElementById('title1').value,
        author: document.getElementById('author1').value,
        genre: document.getElementById('genre1').value,
        publication_year: document.getElementById('publication_year1').value
    }

    fetch(`http://localhost:3300/books/${id}`,{
        method:"PUT",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(resp=>{console.log(resp);
                        getAllBooks();
                       alert("Book updated successfully");
                });
}

function getbookbyid(){
document.getElementById("booksTable").style.visibility="visible";


    var id=parseInt(document.getElementById("idxyz").value);
    fetch(`http://localhost:3300/books/${id}`,{method:"GET"})
    .then(response=>response.json())
    .then((book)=>{
    const tableBody = document.querySelector('#booksTable tbody');
    tableBody.style.opacity = 1;
    tableBody.innerHTML = '';
    console.log(book);
    console.log(book.id);

        const row = tableBody.insertRow();
        // console.log(book.id);
        // console.log(book.author);

        row.insertCell(0).textContent = book.id;
        row.insertCell(1).textContent = book.title;
        row.insertCell(2).textContent = book.author;
        row.insertCell(3).textContent = book.genre;
        row.insertCell(4).textContent = book.publication_year;
        let edit=document.createElement('button');
        edit.innerText='edit';
        edit.id=book.id;
        edit.style.height="40px";
        row.insertCell(5).appendChild(edit); 
        edit.onclick=function() {
            let a=edit.id;
            // console.log(a);
            edits(a,book.title,book.author,book.genre,book.publication_year);
        };

        let remove=document.createElement('button');
        remove.innerText='delete';
        remove.id=book.id;
        remove.style.backgroundColor="red";
        remove.style.height="40px";
        remove.onclick=function() {
            deletebook(remove.id);
        };
        row.insertCell(6).appendChild(remove); 
    })

}

function deletebook(id){
    fetch(`http://localhost:3300/books/${id}`,{
        method:"DELETE"
    })
    .then(response=>{
        getAllBooks();
        alert("Book deleted successfully")
    })
}

function getAllBooks() {
    fetch('http://localhost:3300/books')
        .then(response => response.json())
        .then(data => {displayBooks(data)})
        .catch(error => console.error('Error:', error));
}

function displayBooks(books) {
    document.getElementById("booksTable").style.visibility="visible";

    const tableBody = document.querySelector('#booksTable tbody');
    tableBody.style.opacity = 1;
    tableBody.innerHTML = '';
    console.log(books);
    books.forEach(book => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = book.id;
        row.insertCell(1).textContent = book.title;
        row.insertCell(2).textContent = book.author;
        row.insertCell(3).textContent = book.genre;
        row.insertCell(4).textContent = book.publication_year;
        let edit=document.createElement('button');
        edit.innerText='edit';
        edit.id=book.id;
        edit.style.height="40px";
        row.insertCell(5).appendChild(edit); 
        edit.onclick=function() {
            let a=edit.id;
            console.log(a);
            edits(a,book.title,book.author,book.genre,book.publication_year);
        };

        let remove=document.createElement('button');
        remove.innerText='delete';
        remove.id=book.id;
        remove.style.backgroundColor="red";
        remove.style.height="40px";
        remove.onclick=function() {
            deletebook(remove.id);
        };
        row.insertCell(6).appendChild(remove); 
    });
}
